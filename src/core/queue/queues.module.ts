import { Module } from "@nestjs/common"
import { BullModule } from "@nestjs/bull"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ConfigurationsInterface } from "../../../config"

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<ConfigurationsInterface>,
      ) => {
        const redis = configService.get("redis")
        return {
          redis: {
            host: redis.host,
            port: parseInt(redis.port),
          },
        }
      },
    }),
    BullModule.registerQueue(
      { name: "receive-message" },
      { name: "receive-message-fallback" },
      { name: "send-messages" },
      // TODO: { name: "send-messages-fallback" },
    ),
  ],
  exports: [BullModule],
})
export class QueuesModule {}
