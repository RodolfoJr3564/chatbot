import { Body, Controller, Post, UseFilters, UseGuards } from "@nestjs/common"
import { WhatsappWebhookProducer } from "./queue/whatsapp-message.producer"
import { WebhookApiTokenGuard } from "../common/guards/api-token.guard"
import { CustomExceptionFilter } from "../common/filters/http-exception.filter"
import { SupportedMessageTypes } from "../common/pipes/valid-message-types.pipe"
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
