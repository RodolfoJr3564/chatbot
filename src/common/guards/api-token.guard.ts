import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class WebhookApiTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    return this.validateRequest(request)
  }

  validateRequest(req): boolean {
    const { access_token: apiToken } = req.headers
    const webhookApiToken = this.configService.get<string>(
      "whatsappAdapter.webhookApiToken",
    )

    if (!apiToken) {
      throw new BadRequestException("No token provided")
    }

    if (apiToken !== webhookApiToken) {
      throw new UnauthorizedException("Invalid token")
    }
    return true
  }
}
