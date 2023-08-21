export interface ReceivedWhatsappMessageContactsParameters {
  profile: { name: string }
  wa_id: string
}

export interface ReceivedWhatsappMessageMessagesParameters {
  from: string
  id: string
  timestamp: string
  text: { body: string }
  type: string
}

export interface ReceivedWhatsappMessageType {
  contacts: ReceivedWhatsappMessageContactsParameters[]
  messages: ReceivedWhatsappMessageMessagesParameters[]
}
