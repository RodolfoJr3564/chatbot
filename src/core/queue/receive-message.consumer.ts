import { Processor, Process } from "@nestjs/bull"
import { ChatbotService } from "../../chatbot"
import { WhatsappWebhookService } from "../webhook/webhook.service"
import { WhatsappAdapterService } from "whatsapp-adapter"
import { ReceivedWhatsappMessageJob } from "../../types"

@Processor("receive-message")
export class ReceivedMessageConsumer {
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly webhookService: WhatsappWebhookService,
    private readonly whatsappAdapterService: WhatsappAdapterService,
  ) {}

  @Process("receive-whatsapp-message")
  async processWhatsappMessage(job: ReceivedWhatsappMessageJob) {
    const receivedMessage =
      await this.whatsappAdapterService.handleReceivedMessage(job.data)

    const clientResponse = await this.chatbotService.buildClientResponse(
      receivedMessage,
    )
    await this.webhookService.replyMessage(clientResponse)
  }
}
