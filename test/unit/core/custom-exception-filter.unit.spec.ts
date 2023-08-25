import { HttpException, HttpStatus } from "@nestjs/common"
import { InvalidSendedMessageTypeException } from "../../../src/common/exceptions/invalid-sended-message.exception"
import { FallbackExceptionTypeEnum } from "../../../src/core/fallback/fallback-exception-type.enum"
import { ReceivedMessageFallbackProducer } from "../../../src/core/queue/receive-message-fallback.producer"
import { CustomExceptionFilter } from "../../../src/common/filters/http-exception.filter"

describe("CustomExceptionFilter", () => {
  let filter: CustomExceptionFilter
  let receivedMessageFallbackProducer: jest.Mocked<ReceivedMessageFallbackProducer>
  const mockResponse = () => {
    const res: any = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  beforeEach(() => {
    receivedMessageFallbackProducer = {
      handleInvalidMessage: jest.fn(),
    } as any

    filter = new CustomExceptionFilter(receivedMessageFallbackProducer)
  })

  it("should handle generic HttpException", () => {
    const exception = new HttpException("Generic Error", HttpStatus.BAD_REQUEST)
    const response = mockResponse()
    const host = {
      switchToHttp: jest
        .fn()
        .mockReturnValue({ getResponse: jest.fn().mockReturnValue(response) }),
    } as any

    filter.catch(exception, host)

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(response.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Generic Error",
      details: null,
    })
  })

  it("should handle InvalidSendedMessageTypeException and call producer", () => {
    const exceptionData = {
      from: "test",
      exceptionType: FallbackExceptionTypeEnum.INVALID_WHATSAPP_MESSAGE_TYPE,
      messageType: "TEXT",
    }
    const exception = new InvalidSendedMessageTypeException(exceptionData)
    const response = mockResponse()
    const host = {
      switchToHttp: jest
        .fn()
        .mockReturnValue({ getResponse: jest.fn().mockReturnValue(response) }),
    } as any

    filter.catch(exception, host)

    expect(
      receivedMessageFallbackProducer.handleInvalidMessage,
    ).toHaveBeenCalledWith(exceptionData)
    expect(response.status).toHaveBeenCalledWith(202)
    expect(response.json).toHaveBeenCalledWith({
      statusCode: 202,
      message: "Request delivered successfully",
      details:
        "However, an invalid message type was sent. The message will be handled by the fallback queue.",
    })
  })
})
