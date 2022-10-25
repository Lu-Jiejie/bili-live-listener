import { Message } from '../type'

export interface LiveEndMessage {
  // 房间号
  room_id: number
}

const parser = (data: any): LiveEndMessage => {
  return {
    room_id: data.roomid
  }
}

export interface LiveEndHandler {
  onLiveEnd: (message: Message<LiveEndMessage>) => void
}

export const LiveEnd = {
  parser,
  eventName: 'PREPARING',
  handlerName: 'onLiveEnd'
} as const
