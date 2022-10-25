import { Message } from '../type'

export interface NoticeMessage {
  // 广播ID
  id: number
  // 广播名称（类型）
  name: string
  // 广播内容
  content: string
  // 目标直播间
  target_id: number
  // 是否为本直播间
  is_same_room: boolean
}

const parser = (data: any, roomId: number): NoticeMessage => {
  const rawData = data.data

  return {
    id: rawData.id,
    name: rawData.name,
    content: rawData.real_roomid === roomId ? rawData.msg_self : rawData.msg_common,
    target_id: rawData.real_roomid,
    is_same_room: rawData.real_roomid === roomId
  }
}

export interface NoticeHandler {
  onNotice: (message: Message<NoticeMessage>) => void
}

export const Notice = {
  parser,
  eventName: 'NOTICE_MSG',
  handlerName: 'onNotice'
} as const
