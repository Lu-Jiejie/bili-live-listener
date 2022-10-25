import type { Message } from '../type'

export interface RankCountChangeMessage {
  // 高能榜人数
  count: number
}

const parser = (data: any): RankCountChangeMessage => {
  const rawData = data.data

  return {
    count: rawData.count
  }
}

export interface RankCountChangeHandler {
  onRankCountChange: (message: Message<RankCountChangeMessage>) => void
}

export const RankCountChange = {
  parser,
  eventName: 'ONLINE_RANK_COUNT',
  handlerName: 'onRankCountChange'
} as const
