import { Job } from "bull"
import { ReceivedWhatsappMessageType } from "../messages"

export type ReceivedWhatsappMessageJob = Job<ReceivedWhatsappMessageType>
