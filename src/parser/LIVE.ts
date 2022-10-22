import { Message } from '../type'

export interface LiveStartMessage {
  // 房间号
  room_id: number
  // 开播平台
  live_platform: string
}

const parser = (data: any): LiveStartMessage => {
  const rawData = data.data

  return {
    room_id: rawData.roomid,
    live_platform: rawData.live_platform
  }
}

export interface Handler {
  onLiveStart: (message: Message<LiveStartMessage>) => void
}

export const LIVE = {
  parser,
  eventName: 'LIVE',
  handlerName: 'onLiveStart'
} as const
