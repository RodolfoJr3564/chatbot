import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
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
    console.log(apiToken)
    console.log(webhookApiToken)

    // if (!requestToken) {
    //   throw new BadRequestException("No token provided")
    // }

    // if (requestToken !== whatsappBusinessAPIToken) {
    //   throw new UnauthorizedException("Invalid token")
    // }

    return true
  }
}
