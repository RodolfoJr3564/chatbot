import { Injectable } from "@nestjs/common"
import { Queue } from "bull"
import { InjectQueue } from "@nestjs/bull"
import { FallbackType, SendWhatsappTextMessage } from "../types"

@Injectable()
export class ChatbotService {
  // constructor(
  //   @InjectQueue("send-messages")
  //   private readonly sendMessageQueue: Queue,
  // ) {}

  // async replyMessage(data) {
  //   // const clientData = await this.requestClientData(data)
  //   // const clientResponse = await this.buildClientResponse({ isApproved: true })
  //   await this.sendMessageQueue.add("send-whatsapp-message", {

  //   })
  // }

  // async requestClientData(data): Promise<string> {
  //   // TODO: Busca nas apis internas informações do cliente
  //   // TODO: Trata dados e retorna
  //   return "Hello World!"
  // }

  async buildClientResponse(data: {
    clientId: string
    message: string
  }): Promise<SendWhatsappTextMessage> {
    // TODO: Le o template de resposta do cliente me Markdown
    // TODO: Monta mensagem

    return data
  }

  async buildClientFallbackResponse(
    data: FallbackType,
  ): Promise<SendWhatsappTextMessage> {
    // TODO: Le o template de resposta do cliente me Markdown
    // TODO: Monta mensagem
    return {
      clientId: data.from,
      message: "Tipo de mensagem inválida",
    }
  }
}
