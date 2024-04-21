import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface RankCountChangeData {
  /** 高能榜有贡献值的人数 */
  count: number
  /** 高能榜总人数，即在线总人数; 该属性会按照 有-无-有-无 的情况出现 */
  onlineCount?: number
}

function dataProcessor(rawData: any): Message<RankCountChangeData> {
  const { data } = rawData
  const newData: RankCountChangeData = {
    count: data.count
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const RankCountChangeEvent: EventInfo<RankCountChangeData> = {
  cmdName: 'ONLINE_RANK_COUNT',
  handlerName: 'onRankCountChange',
  dataProcessor
}
