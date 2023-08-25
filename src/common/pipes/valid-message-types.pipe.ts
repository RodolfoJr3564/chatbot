import {
  PipeTransform,
  Injectable,
  applyDecorators,
  UsePipes,
} from "@nestjs/common"
import { InvalidSendedMessageTypeException } from "../exceptions/invalid-sended-message.exception"
import { FallbackExceptionTypeEnum } from "../../core/fallback/fallback-exception-type.enum"
import { MessageTypeEnum } from "../../core/message-type.enum"

@Injectable()
export class ValidateMessageTypePipe implements PipeTransform {
  constructor(private readonly allowedTypes: MessageTypeEnum[]) {}

  async transform(data: {
    messages: Array<{ type: MessageTypeEnum; from: string }>
  }) {
    const messages = data?.messages || []
    const [firstMessage] = messages

    if (!firstMessage || !this.allowedTypes.includes(firstMessage?.type)) {
      throw new InvalidSendedMessageTypeException({
        message: "Unsupported message type",
        from: firstMessage?.from,
        messageType: firstMessage?.type,
        exceptionType: FallbackExceptionTypeEnum.INVALID_WHATSAPP_MESSAGE_TYPE,
      })
    }

    return data
  }
}

export function SupportedMessageTypes(...allowedTypes: MessageTypeEnum[]) {
  return applyDecorators(UsePipes(new ValidateMessageTypePipe(allowedTypes)))
}
