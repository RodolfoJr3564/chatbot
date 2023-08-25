import { ValidateMessageTypePipe } from "../../../src/common/pipes/valid-message-types.pipe"
import { MessageTypeEnum } from "../../../src/core/message-type.enum"
import { InvalidSendedMessageTypeException } from "../../../src/common/exceptions/invalid-sended-message.exception"

describe("ValidateMessageTypePipe", () => {
  let pipe: ValidateMessageTypePipe

  beforeEach(() => {
    pipe = new ValidateMessageTypePipe([MessageTypeEnum.TEXT])
  })

  it("should return data when message type is allowed", async () => {
    const testData = {
      messages: [{ type: MessageTypeEnum.TEXT, from: "test" }],
    }

    expect(await pipe.transform(testData)).toEqual(testData)
  })

  it("should throw error when message type is not allowed", async () => {
    const testData = {
      messages: [{ type: MessageTypeEnum.IMAGE, from: "test" }],
    }

    await expect(pipe.transform(testData)).rejects.toThrow(
      InvalidSendedMessageTypeException,
    )
  })

  it("should throw error when there are no messages", async () => {
    const testData = {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* @ts-expect-error */
    await expect(pipe.transform(testData)).rejects.toThrow(
      InvalidSendedMessageTypeException,
    )
  })
})
