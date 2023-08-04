import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { WhatsappAdapterService } from "./whatsapp-adapter.service"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [],
  providers: [WhatsappAdapterService],
  exports: [WhatsappAdapterService],
})
export class WhatsappAdapterModule {}
