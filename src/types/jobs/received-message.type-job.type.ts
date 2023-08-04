import { Job } from "bull"
import { ReceivedWhatsappMessage } from "../messages"

export type ReceivedWhatsappMessageJob = Job<ReceivedWhatsappMessage>
