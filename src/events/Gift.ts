import type { EventInfo } from '../types/event'
import type { Message, User } from '../types/message'
import { int2ColorHex } from '../utils/color'
import { normalizeMessage } from '../utils/message'

export interface GiftData {
  /** 用户信息 */
  user: User
  /** 礼物Id */
  giftId: number
  /** 礼物名称 */
  giftName: string
  /** 礼物瓜子类型 */
  coinType: 'gold' | 'silver'
  /** 礼物价格(单价)；1金瓜子=1/1000元=1/100电池 */
  price: number
  /** 礼物数量 */
  num: number
  /** 赠送动作（例如：投喂） */
  action: string
  /** 礼物连击 */
  combo?: {
    /** 连击Id */
    id: number
    /** 连击次数 */
    num: number
    /** 连击总价 */
    totalPrice: number
  }
}

function dataProcessor(rawData: any): Message<GiftData> {
  const { data } = rawData
  const { medal_info } = data
  const newData: GiftData = {
    user: {
      uid: data.uid,
      uname: data.uname,
      face: data.face,
      fansMedal: medal_info.medal_name
        ? {
            name: medal_info.medal_name,
            level: medal_info.medal_level,
            color: {
              original: medal_info.medal_color,
              border: medal_info.medal_color_border,
              start: medal_info.medal_color_start,
              end: medal_info.medal_color_end
            },
            isActive: int2ColorHex(medal_info.medal_color) !== '#c0c0c0',
            anchor: {
              uid: medal_info.target_id,
              uname: medal_info.anchor_uname,
              roomId: medal_info.anchor_roomid
            }
          }
        : undefined
    },
    giftId: data.giftId,
    giftName: data.giftName,
    coinType: data.coin_type,
    price: data.price,
    num: data.num,
    action: data.action,
    combo: data.batch_combo_id
      ? {
          id: data.batch_combo_id,
          num: data.batch_combo_num,
          totalPrice: data.combo_total_coin
        }
      : undefined
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const GiftEvent: EventInfo<GiftData> = {
  cmdName: 'SEND_GIFT',
  handlerName: 'onGift',
  dataProcessor
}
