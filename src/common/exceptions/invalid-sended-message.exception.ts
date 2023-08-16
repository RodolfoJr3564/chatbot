import {
  BadRequestException,
  HttpExceptionOptions,
  HttpStatus,
} from "@nestjs/common"
import { FallbackExceptionTypeEnum, MessageTypeEnum } from "core"
import { FallbackType } from "../../types"

export class InvalidSendedMessageTypeException extends BadRequestException {
  readonly from: string
  readonly exceptionType: FallbackExceptionTypeEnum
  readonly messageType: MessageTypeEnum

  constructor(
    {
      from,
      exceptionType,
      messageType,
      ...rest
    }: FallbackType & Record<string, any>,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super({ ...rest, status: HttpStatus.OK }, descriptionOrOptions)
    this.from = from
    this.exceptionType = exceptionType
    this.messageType = messageType
  }
}
