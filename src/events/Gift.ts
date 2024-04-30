import type { EventInfo } from '../types/event'
import type { CoinType, Message, User } from '../types/message'

import { normalizeMessage } from '../utils/message'

export interface GiftData {
  /** 用户信息 */
  user: User
  /** 礼物Id */
  giftId: number
  /** 礼物名称 */
  giftName: string
  /** 礼物瓜子类型；1金瓜子=1/1000元=1/100电池；银瓜子无金钱价值 */
  coinType: CoinType
  /** 礼物价格（单价）；单位：1金瓜子=1/1000元=1/100电池 */
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
    /** 连击总价；单位：1金瓜子=1/1000元=1/100电池 */
    totalPrice: number
  }
  /** 时间戳 */
  timestamp: number
}

function dataProcessorGift(rawData: any): Message<GiftData> {
  const { data } = rawData
  const { medal_info } = data
  const newData: GiftData = {
    user: {
      uid: data.uid,
      uname: data.uname,
      face: data.face,
      fansMedal: medal_info && medal_info.medal_name
        ? {
            name: medal_info.medal_name,
            level: medal_info.medal_level,
            guardType: medal_info.guard_level,
            color: {
              original: medal_info.medal_color,
              border: medal_info.medal_color_border,
              start: medal_info.medal_color_start,
              end: medal_info.medal_color_end,
            },
            isLighted: medal_info.is_lighted,
            anchor: {
              uid: medal_info.target_id,
              uname: medal_info.anchor_uname, // ""
              roomId: medal_info.anchor_roomid, // 0
            },
          }
        : undefined,
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
          totalPrice: data.combo_total_coin,
        }
      : undefined,
    timestamp: data.timestamp,
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

function dataProcessorRedPocket(rawData: any): Message<GiftData> {
  const { data } = rawData
  const { medal_info } = data
  const newData: GiftData = {
    user: {
      uid: data.uid,
      uname: data.uname,
      fansMedal: medal_info && medal_info.medal_name
        ? {
            name: medal_info.medal_name,
            // 没有 face 字段
            level: medal_info.medal_level,
            guardType: medal_info.guard_level,
            color: {
              original: medal_info.medal_color,
              border: medal_info.medal_color_border,
              start: medal_info.medal_color_start,
              end: medal_info.medal_color_end,
            },
            isLighted: medal_info.is_lighted,
            anchor: {
              uid: medal_info.target_id,
              uname: medal_info.anchor_uname, // ""
              roomId: medal_info.anchor_roomid, // 0
            },
          }
        : undefined,
    },
    giftId: data.gift_id,
    giftName: data.gift_name,
    coinType: 'gold',
    price: data.price * 100, // 原单位是电池，为单位统一，转换为金瓜子
    num: data.num,
    action: data.action,
    combo: data.batch_combo_id
      ? {
          id: data.batch_combo_id,
          num: data.batch_combo_num,
          totalPrice: data.combo_total_coin,
        }
      : undefined,
    timestamp: data.current_time,
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

function dataProcessor(rawData: any): Message<GiftData> {
  switch (rawData.cmd) {
    case 'POPULARITY_RED_POCKET_NEW':
      return dataProcessorRedPocket(rawData)
    default:
      return dataProcessorGift(rawData)
  }
}

export const GiftEvent: EventInfo<GiftData> = {
  cmdName: ['SEND_GIFT', 'POPULARITY_RED_POCKET_NEW'],
  handlerName: 'onGift',
  dataProcessor,
}
