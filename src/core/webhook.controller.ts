import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common"
import { WhatsappWebhookProducer } from "./queue"
import {
  WebhookApiTokenGuard,
  SupportedMessageTypes,
  CustomExceptionFilter,
} from "../common"
import { MessageTypeEnum } from "../core/message-type.enum"

@Controller("webhooks")
@UseGuards(WebhookApiTokenGuard)
@UseFilters(CustomExceptionFilter)
export class WhatsappWebhookController {
  constructor(
    private readonly whatsappWebhookProducer: WhatsappWebhookProducer,
  ) {}

  @Post("messages")
  @SupportedMessageTypes(MessageTypeEnum.TEXT)
  async messages(@Body() data) {
    await this.whatsappWebhookProducer.receiveMessage(data)
  }
}
