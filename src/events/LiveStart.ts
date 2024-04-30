import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface LiveStartData {
  /** 开播平台 */
  platform: string
  /** 开播时间戳 */
  timestamp: number
  /** 房间Id */
  roomId: number
}

function dataProcessor(rawData: any): Message<LiveStartData> {
  const newData: LiveStartData = {
    platform: rawData.live_platform,
    timestamp: rawData.live_time,
    roomId: rawData.roomid,
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const LiveStartEvent: EventInfo<LiveStartData> = {
  cmdName: 'LIVE',
  handlerName: 'onLiveStart',
  dataProcessor,
}
