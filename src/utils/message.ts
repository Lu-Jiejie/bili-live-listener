import type { Message } from '../types/message'

export function normalizeMessage<T>(cmd: string, data: T, rawData: any): Message<T> {
  return {
    cmd,
    timestamp: Date.now(),
    data,
    raw: rawData,
  }
}
