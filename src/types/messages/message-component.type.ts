export type ComponentType = "header" | "body" | "footer"
export type ParameterType =
  | "text"
  | "currency"
  | "date_time"
  | "image"
  | "document"
  | "video"

export interface ComponentParameter {
  type: ParameterType
  text: string
}

export interface MessageComponent {
  type: ComponentType
  parameters?: ComponentParameter[]
}
