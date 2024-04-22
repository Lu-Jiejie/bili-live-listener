import type { EventInfo } from '../types/event'
import type { Message, User } from '../types/message'
import { normalizeMessage } from '../utils/message'

enum InteractType {
  Enter = 1,
  Follow,
  Share,
  Like
}

export interface InteractData {
  /** 互动类型 */
  type: InteractType
  /** 用户信息 */
  user: User
}

function dataProcessorInteract(rawData: any): Message<InteractData> {
  const { data } = rawData
  const { fans_medal } = data
  const newData: InteractData = {
    type: data.msg_type,
    user: {
      uid: data.uid,
      uname: data.uname,
      face: data.uinfo.base.face,
      fansMedal: fans_medal && fans_medal.medal_name
        ? {
            name: fans_medal.medal_name,
            level: fans_medal.medal_level,
            color: {
              original: fans_medal.medal_color,
              border: fans_medal.medal_color_border,
              start: fans_medal.medal_color_start,
              end: fans_medal.medal_color_end
            },
            isLighted: !!fans_medal.is_lighted,
            anchor: {
              uid: fans_medal.target_id,
              uname: '',
              roomId: fans_medal.anchor_roomid
            }
          }
        : undefined,
      guardType: data.uinfo.guard.level
    }
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

function dataProcessorLike(rawData: any): Message<InteractData> {
  const { data } = rawData
  const { fans_medal } = data
  const newData: InteractData = {
    type: InteractType.Like,
    user: {
      uid: data.uid,
      uname: data.uname,
      face: data.uinfo.base.face,
      fansMedal: fans_medal && fans_medal.medal_name
        ? {
            name: fans_medal.medal_name,
            level: fans_medal.medal_level,
            color: {
              original: fans_medal.medal_color,
              border: fans_medal.medal_color_border,
              start: fans_medal.medal_color_start,
              end: fans_medal.medal_color_end
            },
            isLighted: !!fans_medal.is_lighted,
            anchor: {
              uid: fans_medal.target_id,
              uname: '',
              roomId: fans_medal.anchor_roomid
            }
          }
        : undefined,
      guardType: data.uinfo.guard.level
    }
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

function dataProcessor(rawData: any): Message<InteractData> {
  switch (rawData.cmd) {
    case 'LIKE_INFO_V3_CLICK':
      return dataProcessorLike(rawData)
    default:
      return dataProcessorInteract(rawData)
  }
}

export const InteractEvent: EventInfo<InteractData> = {
  cmdName: ['INTERACT_WORD', 'LIKE_INFO_V3_CLICK'],
  handlerName: 'onInteract',
  dataProcessor
}
