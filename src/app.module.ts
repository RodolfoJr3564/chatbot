import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import {
  WhatsappWebhookController,
  WhatsappWebhookProducer,
  QueuesModule,
  SendMessageConsumer,
  ReceivedMessageConsumer,
  ReceivedMessageFallbackProducer,
  ReceivedMessageFallbackConsumer,
} from "./core"
import { ChatbotModule } from "./chatbot"
import { configurations } from "./config"
import { WhatsappAdapterModule } from "./whatsapp-adapter"

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
    WhatsappWebhookProducer,
    SendMessageConsumer,
    ReceivedMessageConsumer,
    ReceivedMessageFallbackProducer,
    ReceivedMessageFallbackConsumer,
  ],
})
export class AppModule {}
