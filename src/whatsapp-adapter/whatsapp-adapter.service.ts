import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ConfigurationsInterface } from "config/configurations.interface"
import { SendWhatsappTextMessage } from "types"
import { TextMessageBuilder } from "./message-builder/message.builder"
import { ReceivedWhatsappMessage, TextMessage } from "../types"

@Injectable()
export class WhatsappAdapterService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async handleReceivedMessage({ messages }: ReceivedWhatsappMessage) {
    const [firstMessage] = messages

    return {
      clientId: firstMessage.from,
      message: firstMessage[firstMessage.type].body,
    }
  }

  async sendTextMessage(data: SendWhatsappTextMessage) {
    const message = new TextMessageBuilder(data.clientId)
      .body(data.message)
      .toObject()
    await this.sendToClient(message)
  }

  async sendToClient(message: TextMessage) {
    const { host, clientToken } =
      this.configService.get<ConfigurationsInterface["whatsappAdapter"]>(
        "whatsappAdapter",
      )

    const headers = {
      Authorization: `Bearer ${clientToken}`,
      "Content-Type": "application/json",
    }

    this.httpService.post(host + "/v1/messages", message, { headers })
  }
}
