import { Job } from "bull"

export interface SendWhatsappTextMessage {
  clientId: string
  message: string
  variables?: Record<string, string>
}

export type SendWhatsappTextMessageJob = Job<SendWhatsappTextMessage>
