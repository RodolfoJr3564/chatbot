import { FallbackExceptionTypeEnum, MessageTypeEnum } from "../../src/core"

export interface FallbackType {
  from: string
  exceptionType: FallbackExceptionTypeEnum
  messageType: MessageTypeEnum
}
