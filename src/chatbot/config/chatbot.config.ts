import { registerAs } from "@nestjs/config"
import { ChatbotConfigInterface } from "./chatbot-config.interface"

export const chatbotConfig = registerAs<ChatbotConfigInterface>(
  "chatbot",
  () => ({
    receivedMessageQueue: {
      name: "RECEIVED_MESSAGE_QUEUE",
      host: process.env.RECEIVED_MESSAGE_QUEUE_HOST,
      port: process.env.RECEIVED_MESSAGE_QUEUE_PORT,
      rateLimiter: 1,
    },
  }),
)
