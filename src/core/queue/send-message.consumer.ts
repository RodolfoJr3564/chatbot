import { Processor, Process } from "@nestjs/bull"
import { WhatsappAdapterService } from "../../whatsapp-adapter"
import { SendWhatsappTextMessageJob } from "types/jobs/send-whatsapp-message-job.type"

@Processor("send-messages")
export class SendMessageConsumer {
  constructor(
    private readonly whatsappAdapterService: WhatsappAdapterService,
  ) {}

  @Process("send-whatsapp-message")
  async processWhatsappMessage(job: SendWhatsappTextMessageJob) {
    await this.whatsappAdapterService.sendTextMessage(job.data)
  }
}
