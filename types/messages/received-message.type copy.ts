interface ReceivedMessageEntryChanges {
  field: string
  value: {
    messaging_product: "whatsapp"
    metadata: {
      display_phone_number: "15550272790"
      phone_number_id: "112831885206437"
    }
    contacts: [
      {
        profile: {
          name: "Rodolfo"
        }
        wa_id: "554796834984"
      },
    ]
    messages: [
      {
        from: "554796834984"
        id: "wamid.HBgMNTU0Nzk2ODM0OTg0FQIAEhgWM0VCMDlCQUM5NkVDRjI0RUJBNkFDMAA="
        timestamp: "1690810992"
        text: {
          body: "aaaa"
        }
        type: "text"
      },
    ]
  }
}

interface ReceivedMessageEntry {
  id: string
  changes: [
    {
      value: {
        messaging_product: "whatsapp"
        metadata: {
          display_phone_number: "15550272790"
          phone_number_id: "112831885206437"
        }
        contacts: [
          {
            profile: {
              name: "Rodolfo"
            }
            wa_id: "554796834984"
          },
        ]
        messages: [
          {
            from: "554796834984"
            id: "wamid.HBgMNTU0Nzk2ODM0OTg0FQIAEhgWM0VCMDlCQUM5NkVDRjI0RUJBNkFDMAA="
            timestamp: "1690810992"
            text: {
              body: "aaaa"
            }
            type: "text"
          },
        ]
      }
      field: "messages"
    },
  ]
}
export interface ReceivedMessage {
  object: string
  entry: [
    {
      id: "101069009730680"
      changes: [
        {
          value: {
            messaging_product: "whatsapp"
            metadata: {
              display_phone_number: "15550272790"
              phone_number_id: "112831885206437"
            }
            contacts: [
              {
                profile: {
                  name: "Rodolfo"
                }
                wa_id: "554796834984"
              },
            ]
            messages: [
              {
                from: "554796834984"
                id: "wamid.HBgMNTU0Nzk2ODM0OTg0FQIAEhgWM0VCMDlCQUM5NkVDRjI0RUJBNkFDMAA="
                timestamp: "1690810992"
                text: {
                  body: "aaaa"
                }
                type: "text"
              },
            ]
          }
          field: "messages"
        },
      ]
    },
  ]
}
