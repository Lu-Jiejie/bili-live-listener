import type { Message } from '../type'

export interface PopularityMessage {
  // 人气值
  popularity: number
}

const parser = (data: any): PopularityMessage => {
  return {
    popularity: data
  }
}

export interface PopularityHandler {
  // 人气值变化回调
  onPopularity: (message: Message<PopularityMessage>) => void
}

export const Popularity = {
  parser,
  eventName: 'heartbeat',
  handlerName: 'onPopularity'
} as const
