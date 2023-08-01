import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { WhatsappWebhookConfigInterface } from "../../whatsapp-webhook"

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    return this.validateRequest(request)
  }

  validateRequest(req): boolean {
    const { access_token: apiToken } = req.headers
    const { whatsappBusinessAPIToken } =
      this.configService.get<WhatsappWebhookConfigInterface>("whatsapp-webhook")
    console.log(apiToken)
    console.log(whatsappBusinessAPIToken)

    // if (!requestToken) {
    //   throw new BadRequestException("No token provided")
    // }

    // if (requestToken !== whatsappBusinessAPIToken) {
    //   throw new UnauthorizedException("Invalid token")
    // }

    return true
  }
}
