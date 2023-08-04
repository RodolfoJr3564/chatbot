import { Controller, Post, UseGuards } from "@nestjs/common"
import { WhatsappWebhookService } from "./webhook.service"
import { WebhookApiTokenGuard } from "../../common"

@Controller("webhooks")
@UseGuards(WebhookApiTokenGuard)
export class WhatsappWebhookController {
  constructor(
    private readonly whatsappWebhookService: WhatsappWebhookService,
  ) {}

  @Post("messages")
  async messages(data) {
    await this.whatsappWebhookService.receiveMessage(data)
  }
}
