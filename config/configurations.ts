import { ConfigurationsInterface } from "./configurations.interface"

type configCallbackType = () => ConfigurationsInterface

export const configurations: configCallbackType = () => ({
  host: process.env.CHATBOT_HOST,
  port: process.env.CHATBOT_PORT,
  whatsappAdapter: {
    webhookApiToken: process.env.WHATSAPP_WEBHOOK_API_TOKEN,
    host: process.env.WHATSAPP_CLIENT_HOST || process.env.HOST,
    clientToken: process.env.WHATSAPP_CLIENT_TOKEN,
  },
  redis: {
    host: process.env.REDIS_HOST || process.env.HOST,
    port: process.env.REDIS_PORT,
  },
})
