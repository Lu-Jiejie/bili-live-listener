import type { Message, User } from '../types/message'
import { colorHex2Int, int2ColorHex } from '../utils/color'
import { normalizeMessage } from '../utils/message'
import type { EventInfo } from '../types/event'

export interface DanmuData {
  /** 弹幕发送用户 */
  user: User
  /** 弹幕内容 */
  content: string
  /** 时间戳 */
  timestamp: number
  /** 是否为抽奖弹幕 */
  isLottery: boolean
  // 弹幕表情
  emoticon?: {
    id: number
    url: string
  }
}

function dataProcessor(rawData: any): Message<DanmuData> {
  const { info } = rawData
  const fansMedalInactive = colorHex2Int('#c0c0c0')

  const data: DanmuData = {
    user: {
      uid: info[0][15].user.uid,
      uname: info[0][15].user.base.name,
      face: info[0][15].user.base.face,
      giftRank: info[4][4],
      guardType: info[7],
      isRoomAdmin: info[2][2] === 1,
      ...(info[3].length > 0
        ? {
            fansMedal: {
              name: info[3][1],
              level: info[3][0],
              color: {
                original: int2ColorHex(info[3][4]),
                border: int2ColorHex(info[3][7]),
                start: int2ColorHex(info[3][8]),
                end: int2ColorHex(info[3][9])
              },
              isActive: info[3][7] !== fansMedalInactive,
              anchor: {
                uid: info[3][12],
                uname: info[3][2],
                roomId: info[3][3]
              }
            }
          }
        : {})
    },
    content: info[1],
    timestamp: info[0][4],
    isLottery: info[0][9] !== 0,
    ...(info[0][13]?.emoticon_unique
      ? {
          emoticon: {
            id: info[0][13].emoticon_unique.id,
            url: info[0][13].url
          }
        }
      : {})
  }

  return normalizeMessage(rawData.cmd, data, rawData)
}

export const DanmuEvent: EventInfo<DanmuData> = {
  cmdName: 'DANMU_MSG',
  handlerName: 'onDanmu',
  dataProcessor
}
