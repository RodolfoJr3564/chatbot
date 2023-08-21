import { Injectable } from "@nestjs/common"
import { FallbackType, SendWhatsappTextMessage } from "../../types"

@Injectable()
export class ChatbotService {
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
