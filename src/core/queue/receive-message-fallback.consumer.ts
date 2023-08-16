import { Processor, Process } from "@nestjs/bull"
import { ChatbotService } from "../../chatbot"
import { WhatsappWebhookProducer } from "./whatsapp-message.producer"
import { FallbackJobType } from "../../types"

@Processor("receive-message-fallback")
export class ReceivedMessageFallbackConsumer {
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly webhookService: WhatsappWebhookProducer,
  ) {}

  @Process("invalid-received-whatsapp-message")
  async processInvalidReceivedWhatsappMessageFallback(job: FallbackJobType) {
    const clientResponse =
      await this.chatbotService.buildClientFallbackResponse(job.data)
    await this.webhookService.replyMessage(clientResponse)
  }
}
