export interface ConfigurationsInterface {
  host: string
  port: string
  whatsappAdapter: {
    webhookApiToken: string
    host: string
    clientToken: string
  }
  redis: {
    host: string
    port: string
  }
}
