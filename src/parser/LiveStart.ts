import { Message } from '../type'

export interface LiveStartMessage {
  // 房间号
  room_id: number
  // 开播平台
  live_platform: string
}

const parser = (data: any): LiveStartMessage => {
  return {
    room_id: data.roomid,
    live_platform: data.live_platform
  }
}

export interface LiveStartHandler {
  onLiveStart: (message: Message<LiveStartMessage>) => void
}

export const LiveStart = {
  parser,
  eventName: 'LIVE',
  handlerName: 'onLiveStart'
} as const
