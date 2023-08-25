import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import {
  WhatsappWebhookController,
  WhatsappWebhookProducer,
} from "../../../src/core"
import { whatsappMessageReceived } from "../../helper/whatsapp-message-received"
import {
  WebhookApiTokenGuard,
  CustomExceptionFilter,
} from "../../../src/common"

describe("Webhook integration", () => {
  let app: INestApplication

  describe("Receive whatsapp message", () => {
    const mockGuard = {
      canActivate: jest.fn(() => true),
    }

    const mockFilter = {
      catch: jest.fn(),
    }

    const producerMock = {
      receiveMessage: jest.fn(),
    }

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        controllers: [WhatsappWebhookController],
        providers: [WhatsappWebhookProducer],
      })
        .overrideProvider(WhatsappWebhookProducer)
        .useValue(producerMock)
        .overrideGuard(WebhookApiTokenGuard)
        .useValue(mockGuard)
        .overrideFilter(CustomExceptionFilter)
        .useValue(mockFilter)
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
    })
  })
})
