import type { Message } from '../type'

export interface LikeCountChangeMessage {
  // 点赞量
  count: number
}

const parser = (data: any): LikeCountChangeMessage => {
  const rawData = data.data

  return {
    count: rawData.click_count
  }
}

export interface Handler {
  onLikeCountChange: (message: Message<LikeCountChangeMessage>) => void
}

export const LikeCountChange = {
  parser,
  eventName: 'LIKE_INFO_V3_UPDATE',
  handlerName: 'onLikeCountChange'
} as const
