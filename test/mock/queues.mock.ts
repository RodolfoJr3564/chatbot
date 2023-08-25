export const queuesMockBuild = (...queueNames: string[]) =>
  queueNames.map(queueName => ({
    name: `BullQueue_${queueName}`,
    useFactory: {
      add: jest.fn(),
    },
  }))
