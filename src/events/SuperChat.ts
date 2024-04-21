import type { EventInfo } from '../types/event'
import type { Message, User } from '../types/message'
import { int2ColorHex } from '../utils/color'
import { normalizeMessage } from '../utils/message'

export interface SuperChatData {
  /** 用户信息 */
  user: User
  /** SC内容 */
  content: string
  /** SC价格 单位：元 */
  price: number
  /** SC颜色 */
  color: {
    main: string
    background: string
  }
  /** SC持续时间 */
  duration: number
  /** SC开始时间 */
  startTime: number
  /** SC结束时间 */
  endTime: number
  /** 礼物名称 */
  giftName: string
  /** 礼物Id */
  giftId: number
}

function dataProcessor(rawData: any): Message<SuperChatData> {
  const { data } = rawData
  const { user_info, medal_info } = data
  const newData: SuperChatData = {
    user: {
      uid: data.uid,
      uname: user_info.uname,
      face: user_info.face,
      faceFrame: user_info.face_frame,
      fansMedal: medal_info
        ? {
            name: medal_info.medal_name,
            level: medal_info.medal_level,
            color: {
              original: medal_info.medal_color,
              border: int2ColorHex(medal_info.medal_color_border),
              start: int2ColorHex(medal_info.medal_color_start),
              end: int2ColorHex(medal_info.medal_color_end)
            },
            isActive: int2ColorHex(medal_info.medal_color_start) !== '#c0c0c0',
            anchor: {
              uid: medal_info.target_id,
              uname: medal_info.anchor_uname,
              roomId: medal_info.anchor_roomid
            }
          }
        : undefined,
      guardType: user_info.guard_level,
      isRoomAdmin: !!user_info.manager
    },
    content: data.message,
    price: data.price,
    color: {
      main: data.background_bottom_color,
      background: data.background_color
    },
    duration: data.time,
    startTime: data.start_time,
    endTime: data.end_time,
    giftId: data.gift.gift_id,
    giftName: data.gift.gift_name
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const SuperChatEvent: EventInfo<SuperChatData> = {
  cmdName: 'SUPER_CHAT_MESSAGE',
  handlerName: 'onSuperChat',
  dataProcessor
}
