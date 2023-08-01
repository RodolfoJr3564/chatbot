import { registerAs } from "@nestjs/config"
import { WhatsappWebhookConfigInterface } from "./whatsapp-webhook-config.interface"

export const whatsappWebhookConfig = registerAs<WhatsappWebhookConfigInterface>(
  "whatsapp-webhook",
  () => ({
    whatsappBusinessAPIToken: process.env.WHATSAPP_BUSINESS_API_TOKEN,
    host: process.env.HOST,
  }),
)
