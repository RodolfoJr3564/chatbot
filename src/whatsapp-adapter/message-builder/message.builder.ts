import { MessageType } from "../../../types"
import { MessageObjectType, TextMessage } from "../../../types/messages"

interface MessageBuilder {
  toObject: () => TextMessage
}

export class TextMessageBuilder implements MessageBuilder {
  private readonly _to: string
  private readonly _type: MessageType
  private _message: MessageObjectType["text"]

  constructor(clientId: string) {
    this._to = clientId
    this._type = "text"
  }

  body(body: string): TextMessageBuilder {
    this._message = { ...this._message, body }
    return this
  }

  header(header: string): TextMessageBuilder {
    this._message = { ...this._message, header }
    return this
  }

  footer(footer: string): TextMessageBuilder {
    this._message = { ...this._message, footer }
    return this
  }

  toObject(): TextMessage {
    return {
      to: this._to,
      type: this._type,
      text: this._message,
    }
  }
}
