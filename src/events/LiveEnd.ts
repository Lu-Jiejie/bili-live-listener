import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface LiveEndData {
  roomId: number
}

function dataProcessor(rawData: any): Message<LiveEndData> {
  const newData: LiveEndData = {
    roomId: rawData.roomid
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const LiveEndEvent: EventInfo<LiveEndData> = {
  cmdName: 'PREPARING',
  handlerName: 'onLiveEnd',
  dataProcessor
}
