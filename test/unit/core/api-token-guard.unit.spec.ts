import { WebhookApiTokenGuard } from "../../../src/common/guards/api-token.guard"
import { ConfigService } from "@nestjs/config"
import { BadRequestException, UnauthorizedException } from "@nestjs/common"

describe("WebhookApiTokenGuard", () => {
  let guard: WebhookApiTokenGuard
  let configService: jest.Mocked<ConfigService>
  const VALID_TOKEN = "VALID_TOKEN"
  const INVALID_TOKEN = "INVALID_TOKEN"

  const mockContext = (token?: string) =>
    ({
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest
          .fn()
          .mockReturnValue({ headers: { access_token: token } }),
      }),
    } as any)

  beforeEach(() => {
    configService = {
      get: jest.fn().mockReturnValue(VALID_TOKEN),
    } as any

    guard = new WebhookApiTokenGuard(configService)
  })

  describe("canActivate", () => {
    it("should throw BadRequestException when no token is provided", () => {
      const context = mockContext()
      expect(() => guard.canActivate(context)).toThrow(BadRequestException)
    })

    it("should throw UnauthorizedException when an invalid token is provided", () => {
      const context = mockContext(INVALID_TOKEN)
      expect(() => guard.canActivate(context)).toThrow(UnauthorizedException)
    })

    it("should not throw any exception when a valid token is provided", () => {
      const context = mockContext(VALID_TOKEN)
      expect(guard.canActivate(context)).toBe(true)
    })
  })
})
