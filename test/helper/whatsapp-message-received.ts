import { MessageTypeEnum } from "../../src/core/message-type.enum"
import { ReceivedWhatsappMessageType } from "../../types/messages/received-whatsapp-message.type"

export const whatsappMessageReceived: (
  data?: Partial<ReceivedWhatsappMessageType>,
) => ReceivedWhatsappMessageType = (data = {}) => ({
  messaging_product: "whatsapp",
  metadata: {
    display_phone_number: "15550272790",
    phone_number_id: "112831885206437",
  },
  contacts: [
    {
      profile: {
        name: "Rodolfo",
      },
      wa_id: "554796834984",
    },
  ],
  messages: [
    {
      from: "554796834984",
      id: "wamid.HBgMNTU0Nzk2ODM0OTg0FQIAEhgWM0VCMDlCQUM5NkVDRjI0RUJBNkFDMAA=",
      timestamp: "1690810992",
      text: {
        body: "text",
      },
      type: MessageTypeEnum.TEXT,
    },
  ],
  ...data,
})
