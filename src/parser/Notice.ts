import { Message } from '../type'

export interface NoticeMessage {
  // 广播ID
  id: number
  // 广播名称（类型）
  name: string
  // 广播内容
  content: string
  // 广播背景色
  background: string
  // 广播高亮色
  highlight: string
}

const parser = (data: any, roomId: number): NoticeMessage => {
  const rawData = data.data

  return {
    id: rawData.id,
    name: rawData.name,
    content: rawData.real_roomid === roomId ? rawData.msg_self : rawData.msg_common,
    background: rawData.full.background,
    highlight: rawData.full.highlight
  }
}

export interface Handler {
  onNotice: (message: Message<NoticeMessage>) => void
}

export const Notice = {
  parser,
  eventName: 'NOTICE_MSG',
  handlerName: 'onNotice'
} as const
