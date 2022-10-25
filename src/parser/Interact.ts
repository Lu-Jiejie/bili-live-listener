import type { Message, User } from '../type'
import { int2Color } from '../utils'
import { InteractType } from '../type/const'

export interface InteractMessage {
  // 用户信息
  user: User
  // 互动类型
  interact_type: InteractType
}

const parser = (data: any, roomId: number): InteractMessage => {
  const rawData = data.data
  const { fans_medal } = rawData
  return {
    user: {
      uid: rawData.uid,
      uname: rawData.uname,
      badge: fans_medal.target_id
        ? {
            active: fans_medal.is_lighted,
            name: fans_medal.medal_name,
            level: fans_medal.medal_level,
            color: int2Color(fans_medal.medal_color_start),
            anchor: {
              uid: fans_medal.target_id,
              uname: '',
              room_id: fans_medal.anchor_roomid,
              is_same_room: fans_medal.anchor_roomid === roomId
            }
          }
        : undefined,
      identity: {
        rank: 0,
        guard_level: rawData.privilege_type,
        room_admin: false
      }
    },
    interact_type: rawData.msg_type
  }
}

export interface InteractHandler {
  onInteract: (message: Message<InteractMessage>) => void
}

export const Interact = {
  parser,
  eventName: 'INTERACT_WORD',
  handlerName: 'onInteract'
} as const
