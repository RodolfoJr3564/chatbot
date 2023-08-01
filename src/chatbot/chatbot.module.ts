import { Module } from "@nestjs/common"
import { ChatbotService } from "./chatbot.service"
import { ConfigModule } from "@nestjs/config"
import { chatbotConfig } from "./config"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [chatbotConfig],
    }),
  ],
  providers: [ChatbotService],
})
export class ChatbotModule {}
