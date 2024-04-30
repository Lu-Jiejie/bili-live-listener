import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface PopularRankUpdateData {
  /** 房间主播uid */
  uid: number
  /** 人气榜排名 */
  rank: number
  /** 结榜倒计时 */
  countdown: number
  /** 时间戳 */
  timestamp: number
}

function dataProcessor(rawData: any): Message<PopularRankUpdateData> {
  const { data } = rawData
  const newData: PopularRankUpdateData = {
    uid: data.uid,
    rank: data.rank,
    countdown: data.countdown,
    timestamp: data.timestamp,
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const PopularRankUpdateEvent: EventInfo<PopularRankUpdateData> = {
  cmdName: 'PopularRankUpdate',
  handlerName: 'onPopularRankUpdate',
  dataProcessor,
}
