import type { Message, User } from '../type'

export interface SuperChatMessage {
  user: User
  // sc内容
  content: string
  // sc颜色
  color: string
  // 价格
  price: number
  // 持续时间
  duration: number
}

const parser = (data: any, roomId: number): SuperChatMessage => {
  const rawData = data.data
  const { medal_info, user_info } = data.data

  return {
    user: {
      uid: rawData.uid,
      uname: user_info.uname,
      badge: medal_info
        ? {
            name: medal_info.medal_name,
            level: medal_info.medal_level,
            color: medal_info.medal_color,
            active: medal_info.is_lighted === 1,
            anchor: {
              uid: medal_info.target_id,
              uname: medal_info.anchor_uname,
              room_id: medal_info.anchor_roomid,
              is_same_room: medal_info.anchor_roomid === roomId
            }
          }
        : undefined,
      identity: {
        rank: 0,
        guard_level: user_info.guard_level || 0,
        room_admin: user_info.manager === 1
      }
    },
    content: rawData.message,
    color: rawData.background_price_color,
    price: rawData.price,
    duration: rawData.time
  }
}

export interface Handler {
  onSuperChat: (message: Message<SuperChatMessage>) => void
}

export const SuperChat = {
  parser,
  eventName: 'SUPER_CHAT_MESSAGE',
  handlerName: 'onSuperChat'
} as const
