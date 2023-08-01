import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { WhatsappWebhookConfigInterface } from "./config"

@Injectable()
export class WhatsappWebhookService {
  constructor(private readonly configService: ConfigService) {}

  receive_message(): string {
    const host =
      this.configService.get<WhatsappWebhookConfigInterface>("whatsapp-webhook")
    console.log(host)
    // TODO: Add to queue
    // TODO: Confirm message received
    return "Hello World!"
  }
}
