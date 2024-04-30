import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface LikeCountUpdateData {
  num: number
}

function dataProcessor(rawData: any): Message<LikeCountUpdateData> {
  const { data } = rawData
  const newData: LikeCountUpdateData = {
    num: data.click_count,
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const LikeCountUpdateEvent: EventInfo<LikeCountUpdateData> = {
  cmdName: 'LIKE_INFO_V3_UPDATE',
  handlerName: 'onLikeCountUpdate',
  dataProcessor,
}
