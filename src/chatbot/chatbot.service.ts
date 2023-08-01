import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class ChatbotService {
  constructor(private readonly configService: ConfigService) {}

  send_message(): string {
    return "Hello World!"
  }

  handle_response(): string {
    return "Hello World!"
  }
}
