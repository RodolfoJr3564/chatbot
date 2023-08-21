import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import { WhatsappWebhookProducer } from "../../../src/core"
import { whatsappMessageReceived } from "../../helper/whatsapp-message-received"
import { AppModule } from "../../../src/app.module"
import {
  WebhookApiTokenGuard,
  CustomExceptionFilter,
} from "../../../src/common"

describe("Webhook integration", () => {
  let app: INestApplication
  const RECEIVE_MESSAGE_QUEUE = "receive-message"

  const mockGuard = {
    canActivate: jest.fn(() => true),
  }

  const mockFilter = {
    catch: jest.fn(),
  }

  const mockQueue = {
    add: jest.fn(),
  }

  const producerMock = {
    receiveMessage: jest.fn(
      jest.fn(data => mockQueue.add(RECEIVE_MESSAGE_QUEUE, data)),
    ),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(WhatsappWebhookProducer)
      .useValue(producerMock)
      .overrideGuard(WebhookApiTokenGuard)
      .useValue(mockGuard)
      .overrideFilter(CustomExceptionFilter)
      .useValue(mockFilter)
      .overrideProvider("receive-message-queue")
      .useValue(mockQueue)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    // Clear all mocks before each test to ensure clean results
    jest.clearAllMocks()
  })

  afterEach(async () => {
    await app.close()
  })

  it("should process a message correctly", async () => {
    const sampleMessage = whatsappMessageReceived()

    await request(app.getHttpServer())
      .post("/webhooks/messages")
      .send(sampleMessage)
      .expect(201)

    expect(producerMock.receiveMessage).toHaveBeenCalledTimes(1)
    expect(producerMock.receiveMessage).toHaveBeenCalledWith(sampleMessage)
    expect(mockQueue.add).toHaveBeenCalledWith(
      RECEIVE_MESSAGE_QUEUE,
      sampleMessage,
    )
  })
})
