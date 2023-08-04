import { Injectable } from "@nestjs/common"
import { InjectQueue } from "@nestjs/bull"
import { Queue } from "bull"
import { ReceivedWhatsappMessage, SendWhatsappTextMessage } from "../../types"

@Injectable()
export class WhatsappWebhookService {
  constructor(
    @InjectQueue("receive-message")
    private readonly receiveMessageQueue: Queue,
    @InjectQueue("send-messages")
    private readonly sendMessageQueue: Queue,
  ) {}

  async receiveMessage(data: ReceivedWhatsappMessage) {
    await this.receiveMessageQueue.add("receive-whatsapp-message", data)
  }

  async replyMessage(data: SendWhatsappTextMessage) {
    await this.sendMessageQueue.add("send-whatsapp-message", data)
  }
}
