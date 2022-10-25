import { Message } from '../type'

export interface WatchedChangeMessage {
  // 看过（具体数值）
  num: number
  // 看过（格式化输出，如 3.2万人看过 ）
  text: string
}

const parser = (data: any): WatchedChangeMessage => {
  const rawData = data.data

  return {
    num: rawData.num,
    text: rawData.text_small
  }
}

export interface WatchedChangeHandler {
  onWatchedChange: (message: Message<WatchedChangeMessage>) => void
}

export const WatchedChange = {
  parser,
  eventName: 'WATCHED_CHANGE',
  handlerName: 'onWatchedChange'
} as const
