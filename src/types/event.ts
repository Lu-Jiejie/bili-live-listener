import type { Message } from './message'

export interface EventInfo<T> {
  cmdName: string | string[]
  handlerName: string
  dataProcessor: (data: any) => Message<T> | undefined
}

export interface CommonEventInfo {
  cmdName: string
  handlerName: string
}
