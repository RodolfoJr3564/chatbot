import { Injectable } from "@nestjs/common"
import { InjectQueue } from "@nestjs/bull"
import { Queue } from "bull"
import {
  ReceivedWhatsappMessageType,
  SendWhatsappTextMessage,
} from "../../../types"

@Injectable()
export class WhatsappWebhookProducer {
  constructor(
    @InjectQueue("receive-message")
    private readonly receiveMessageQueue: Queue,
    @InjectQueue("send-messages")
    private readonly sendMessageQueue: Queue,
  ) {}

  async receiveMessage(data: ReceivedWhatsappMessageType) {
    await this.receiveMessageQueue.add("receive-whatsapp-message", data)
  }

  async replyMessage(data: SendWhatsappTextMessage) {
    await this.sendMessageQueue.add("send-whatsapp-message", data)
  }
}
