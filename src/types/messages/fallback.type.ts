import { FallbackExceptionTypeEnum, MessageTypeEnum } from "../../core"

export interface FallbackType {
  from: string
  exceptionType: FallbackExceptionTypeEnum
  messageType: MessageTypeEnum
}
