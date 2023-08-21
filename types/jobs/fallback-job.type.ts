import { Job } from "bull"
import { FallbackType } from "../messages"

export type FallbackJobType = Job<FallbackType>
