import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface HotRankUpdateData {
  /** 分区名称；比如“虚拟主播” */
  areaName: string
  /** 分区热门排名描述；比如“虚拟主播top50” */
  description: string
  /** 分区热门排名 */
  rank: number
}

function dataProcessor(rawData: any): Message<HotRankUpdateData> {
  const { data } = rawData
  const newData: HotRankUpdateData = {
    areaName: data.area_name,
    description: data.rank_desc,
    rank: data.rank
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const HotRankUpdateEvent: EventInfo<HotRankUpdateData> = {
  cmdName: 'HOT_RANK_CHANGED_V2',
  handlerName: 'onHotRankUpdate',
  dataProcessor
}
