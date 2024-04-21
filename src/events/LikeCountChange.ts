import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface LikeCountChangeData {
  num: number
}

function dataProcessor(rawData: any): Message<LikeCountChangeData> {
  const { data } = rawData
  const newData: LikeCountChangeData = {
    num: data.click_count
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const LikeCountChangeEvent: EventInfo<LikeCountChangeData> = {
  cmdName: 'LIKE_INFO_V3_UPDATE',
  handlerName: 'onLikeCountChange',
  dataProcessor
}
