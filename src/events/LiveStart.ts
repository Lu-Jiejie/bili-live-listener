import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface LiveStartData {
  /** 开播平台 */
  platform: string
  /** 开播时间 */
  startTime: number
}

function dataProcessor(rawData: any): Message<LiveStartData> {
  const newData: LiveStartData = {
    platform: rawData.live_platform,
    startTime: rawData.live_time
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const LiveStartEvent: EventInfo<LiveStartData> = {
  cmdName: 'LIVE',
  handlerName: 'onLiveStart',
  dataProcessor
}
