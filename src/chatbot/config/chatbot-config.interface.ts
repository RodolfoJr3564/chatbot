export interface ChatbotConfigInterface {
  receivedMessageQueue: {
    name: string
    host: string
    port: string
    rateLimiter: number
  }
}
