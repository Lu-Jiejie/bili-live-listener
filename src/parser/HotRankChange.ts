import { Message } from '../type'

export interface HotRankChangeMessage {
  // 热门分类
  rank_name: string
  // 分类描述
  rank_description: string
  // 排名
  rank: number
}

const parser = (data: any): HotRankChangeMessage => {
  const rawData = data.data

  return {
    rank_name: rawData.area_name,
    rank_description: rawData.rank_desc,
    rank: rawData.rank
  }
}

export interface HotRankChangeHandler {
  onHotRankChange: (message: Message<HotRankChangeMessage>) => void
}

export const HotRankChange = {
  parser,
  eventName: 'HOT_RANK_CHANGED_V2',
  handlerName: 'onHotRankChange'
} as const
