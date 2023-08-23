import { Module, DynamicModule } from "@nestjs/common"
import { Queue } from "bull"

type UseFactoryParam = { [key in keyof Queue]?: jest.Mock<any, any, any> }

@Module({})
export class MockBullModule {
  static forRootAsync(
    ...providers: Array<{ name: string; useFactory: UseFactoryParam }>
  ): DynamicModule {
    const mockProviders = providers.map(({ name, useFactory }) => ({
      provide: name,
      useFactory: (): UseFactoryParam => useFactory,
    }))
    return {
      module: MockBullModule,
      providers: mockProviders,
      exports: mockProviders,
    }
  }

  static registerQueue(...args: any[]): DynamicModule {
    return this.forRootAsync()
  }
}
