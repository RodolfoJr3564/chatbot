import { Test, TestingModule } from "@nestjs/testing"
import { WhatsappWebhookProducer } from "../../../src/core"
import { whatsappMessageReceived } from "../../helper/whatsapp-message-received"
import { MockBullModule } from "../../mock"
import { Queue } from "bull"

describe("WhatsappWebhookProducer", () => {
  let producer: WhatsappWebhookProducer
  let mockReceiveMessageQueue: jest.Mocked<Queue>
  let mockSendMessageQueue: jest.Mocked<Queue>

  beforeEach(async () => {
    const mockedReceiveMessageQueue = {
      name: "BullQueue_receive-message",
      useFactory: {
        add: jest.fn(),
      },
    }

    const mockedSendMessageQueue = {
      name: "BullQueue_send-messages",
      useFactory: {
        add: jest.fn(),
      },
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockBullModule.forRootAsync(
          mockedReceiveMessageQueue,
          mockedSendMessageQueue,
        ),
      ],
      providers: [WhatsappWebhookProducer],
    }).compile()

    producer = module.get<WhatsappWebhookProducer>(WhatsappWebhookProducer)
    mockReceiveMessageQueue = module.get(mockedReceiveMessageQueue.name)
    mockSendMessageQueue = module.get(mockedSendMessageQueue.name)
  })

  it("should add message to receiveMessageQueue", async () => {
    const sampleMessage = whatsappMessageReceived()

    await producer.receiveMessage(sampleMessage)

    expect(mockReceiveMessageQueue.add).toHaveBeenCalledTimes(1)
    expect(mockReceiveMessageQueue.add).toHaveBeenCalledWith(
      "receive-whatsapp-message",
      sampleMessage,
    )
  })

  it("should add reply message to sendMessageQueue", async () => {
    const replyMessage = {
      clientId: "123456789",
      message: "Hello, World!",
    }

    await producer.replyMessage(replyMessage)

    expect(mockSendMessageQueue.add).toHaveBeenCalledTimes(1)
    expect(mockSendMessageQueue.add).toHaveBeenCalledWith(
      "send-whatsapp-message",
      replyMessage,
    )
  })
})
