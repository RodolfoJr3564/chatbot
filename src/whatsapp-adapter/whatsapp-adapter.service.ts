import { HttpService } from "@nestjs/axios"
import { BadRequestException, Injectable } from "@nestjs/common"
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

  async handleReceivedMessage(data: ReceivedWhatsappMessage) {
    // TODO: Verifica o tipo de mensagem recebida
    // TODO: Trata mensagem recebida ou sobe um erro que envia um feedback para o usuário

    const type = data.messages[0].type as "text"

    if (type !== "text") {
      throw new BadRequestException("Tipo de mensagem não suportado")
    }

    const {
      [type]: { body },
      from,
    } = data.messages[0]

    return {
      clientId: from,
      message: body,
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
