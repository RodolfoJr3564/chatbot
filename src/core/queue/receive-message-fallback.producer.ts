import { Injectable } from "@nestjs/common"
import { InjectQueue } from "@nestjs/bull"
import { Queue } from "bull"
import { FallbackType } from "../../../types"

@Injectable()
export class ReceivedMessageFallbackProducer {
  constructor(
    @InjectQueue("receive-message-fallback")
    private readonly receiveMessageFallbackQueue: Queue,
  ) {}

  async handleInvalidMessage(data: FallbackType) {
    await this.receiveMessageFallbackQueue.add(
      "invalid-received-whatsapp-message",
      data,
    )
  }
}
