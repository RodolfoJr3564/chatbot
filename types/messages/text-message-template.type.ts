import { MessageComponent } from "./message-component.type"

export type MessageType =
  | "text"
  | "image"
  | "audio"
  | "document"
  | "template"
  | "hsm"

export interface MessageTemplate {
  namespace: string
  name: string
  language?: {
    policy: "pt_BR"
    code?: string
  }
  components?: MessageComponent[]
}
export interface TextMessageTemplate {
  to: string
  type: MessageType
  template: MessageTemplate
}
