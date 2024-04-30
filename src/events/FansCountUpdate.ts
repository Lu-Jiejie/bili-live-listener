import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface FansCountUpdateData {
  /** 粉丝数量 */
  fansCount: number
  /** 粉丝团数量 */
  fansClubCount: number
}

function dataProcessor(rawData: any): Message<FansCountUpdateData> {
  const { data } = rawData
  const newData: FansCountUpdateData = {
    fansCount: data.fans,
    fansClubCount: data.fans_club,
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const FansCountUpdateEvent: EventInfo<FansCountUpdateData> = {
  cmdName: 'ROOM_REAL_TIME_MESSAGE_UPDATE',
  handlerName: 'onFansCountUpdate',
  dataProcessor,
}
