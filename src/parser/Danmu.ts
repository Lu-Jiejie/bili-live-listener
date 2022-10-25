import { int2Color } from '../utils'
import { Message, User } from '../type'

export interface DanmuMessage {
  user: User
  // 弹幕内容
  content: string
  // 时间戳
  timestamp: number
  // 是否为天选抽奖弹幕
  lottery: boolean
  // 弹幕表情
  emoticon?: {
    id: number
    height: number
    width: number
    url: string
  }
}

const parser = (data: any, roomId: number): DanmuMessage => {
  const rawData = data.info

  return {
    user: {
      uid: rawData[2][0],
      uname: rawData[2][1],
      badge: rawData[3].length
        ? {
            active: rawData[3][7] !== 12632256,
            name: rawData[3][1],
            level: rawData[3][0],
            color: int2Color(rawData[3][4]),
            anchor: {
              uid: rawData[3][12],
              uname: rawData[3][2],
              room_id: rawData[3][3],
              is_same_room: rawData[3][3] === roomId
            }
          }
        : undefined,
      identity: {
        rank: rawData[4][4],
        guard_level: rawData[7],
        room_admin: rawData[2][2] === 1
      }
    },
    content: rawData[1],
    timestamp: rawData[0][4],
    lottery: rawData[0][9] !== 0,
    emoticon: rawData[0][13]?.emoticon_unique
      ? {
          id: rawData[0][13].emoticon_unique,
          height: rawData[0][13].height,
          width: rawData[0][13].width,
          url: rawData[0][13].url
        }
      : undefined
  }
}

export interface DanmuHandler {
  onDanmu: (message: Message<DanmuMessage>) => void
}

export const Danmu = {
  parser,
  eventName: 'DANMU_MSG',
  handlerName: 'onDanmu'
} as const
