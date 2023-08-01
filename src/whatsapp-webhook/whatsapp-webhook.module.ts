import { Module } from "@nestjs/common"
import { WhatsappWebhookController } from "./whatsapp-webhook..controller"
import { WhatsappWebhookService } from "./whatsapp-webhook.service"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { whatsappWebhookConfig } from "./config"
import { BullModule } from "@nestjs/bull"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [whatsappWebhookConfig],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>("RECEIVED_MESSAGE_QUEUE_HOST"),
          port: configService.get<number>("RECEIVED_MESSAGE_QUEUE_PORT"),
          limiter: configService.get<string>("RECEIVED_MESSAGE_QUEUE_HOST"),
        },
      }),
    }),
  ],
  controllers: [WhatsappWebhookController],
  providers: [WhatsappWebhookService],
})
export class WhatsappWebhookModule {}
