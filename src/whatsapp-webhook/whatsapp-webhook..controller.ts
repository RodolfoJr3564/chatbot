import { Controller, Post, UseGuards } from "@nestjs/common"
import { WhatsappWebhookService } from "./whatsapp-webhook.service"
import { ApiTokenGuard } from "../common"

@Controller("webhooks")
@UseGuards(ApiTokenGuard)
export class WhatsappWebhookController {
  constructor(
    private readonly whatsappWebhookService: WhatsappWebhookService,
  ) {}

  @Post("messages")
  messages(data): string {
    console.log(data)
    return "" // this.whatsappWebhookService.receive_message()
  }
}
