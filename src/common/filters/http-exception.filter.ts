import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common"
import { InvalidSendedMessageTypeException } from "../exceptions/invalid-sended-message.exception"
import { Response } from "express"
import { ReceivedMessageFallbackProducer } from "../../core/queue/receive-message-fallback.producer"

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly receivedMessageFallbackProducer: ReceivedMessageFallbackProducer,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const responseData = {
      statusCode: exception.getStatus(),
      message: exception.getResponse(),
      details: null,
    }

    if (exception instanceof InvalidSendedMessageTypeException) {
      void this.receivedMessageFallbackProducer.handleInvalidMessage({
        from: exception.from,
        exceptionType: exception.exceptionType,
        messageType: exception.messageType,
      })

      responseData.statusCode = 202
      responseData.message = "Request delivered successfully"
      responseData.details =
        "However, an invalid message type was sent. The message will be handled by the fallback queue."
    }

    response.status(responseData.statusCode).json(responseData)
  }
}
