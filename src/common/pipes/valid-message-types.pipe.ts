import {
  PipeTransform,
  Injectable,
  applyDecorators,
  UsePipes,
} from "@nestjs/common"
import { ParameterType } from "../../../types"
import { InvalidSendedMessageTypeException } from "../exceptions/invalid-sended-message.exception"
import { FallbackExceptionTypeEnum, MessageTypeEnum } from "../../core"

@Injectable()
export class ValidateMessageTypePipe implements PipeTransform {
  constructor(private readonly allowedTypes: ParameterType[]) {}

  async transform(data: {
    messages: Array<{ type: MessageTypeEnum.TEXT; from: string }>
  }) {
    const [firstMessage] = data.messages

    if (!this.allowedTypes.includes(firstMessage.type)) {
      throw new InvalidSendedMessageTypeException({
        message: "Unsupported message type",
        from: firstMessage.from,
        messageType: firstMessage.type,
        exceptionType: FallbackExceptionTypeEnum.INVALID_WHATSAPP_MESSAGE_TYPE,
      })
    }

    return data
  }
}

export function SupportedMessageTypes(...allowedTypes: ParameterType[]) {
  return applyDecorators(UsePipes(new ValidateMessageTypePipe(allowedTypes)))
}
