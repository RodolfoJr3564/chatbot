import { MessageType } from "./text-message-template.type"

export type MessageObjectTypeParameter = "header" | "body" | "footer"

export type MessageObject = {
  [K in MessageObjectTypeParameter]?: string
}

export type MessageObjectType = {
  [K in MessageType]?: MessageObject
}

export type MessageTypeData = { [K in MessageType]?: MessageObject }

export type GenericMessage = {
  to: string
  type: MessageType
} & MessageTypeData

export type TextMessage = GenericMessage
