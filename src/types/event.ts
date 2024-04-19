import type { Message } from './message'

export interface EventInfo<T> {
  cmdName: string
  handlerName: string
  dataProcessor: (data: any) => Message<T>
}
