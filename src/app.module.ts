import { Module } from "@nestjs/common"
import { WhatsappWebhookModule } from "./whatsapp-webhook/whatsapp-webhook.module"

@Module({
  imports: [WhatsappWebhookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
