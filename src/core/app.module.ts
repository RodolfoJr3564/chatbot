import { Module } from "@nestjs/common"
import { WhatsappWebhookController } from "./webhook/webhook.controller"
import { WhatsappWebhookService } from "./webhook/webhook.service"
import { ConfigModule } from "@nestjs/config"
import { QueuesModule } from "./queue"
import { ChatbotModule } from "../chatbot"
import { SendMessageConsumer } from "./queue/send-message.consumer"
import { ReceivedMessageConsumer } from "./queue/receive-message.consumer"
import { configurations } from "../config"
import { WhatsappAdapterModule } from "whatsapp-adapter/whatsapp-adapter.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
    }),
    ChatbotModule,
    WhatsappAdapterModule,
    ConfigModule,
    QueuesModule,
  ],
  controllers: [WhatsappWebhookController],
  providers: [
    WhatsappWebhookService,
    SendMessageConsumer,
    ReceivedMessageConsumer,
  ],
})
export class AppModule {}
