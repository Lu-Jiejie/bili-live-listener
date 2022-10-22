import type { Message } from '../type'

export interface PopularityChangeMessage {
  // 人气值
  popularity: number
}

const parser = (data: any): PopularityChangeMessage => {
  return {
    popularity: data
  }
}

export interface Handler {
  // 人气值变化回调
  onPopularityChange: (message: Message<PopularityChangeMessage>) => void
}

export const PopularityChange = {
  parser,
  eventName: 'heartbeat',
  handlerName: 'onPopularityChange'
} as const
