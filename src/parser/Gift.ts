import { int2Color } from '../utils'
import type { Message, User } from '../type'

export interface GiftMessage {
  user: User
  // 礼物id
  gift_id: number
  // 礼物名称
  gift_name: string
  // 礼物类型（金瓜子礼物或银瓜子礼物）
  coin_type: 'silver' | 'gold'
  // 礼物价格
  price: number
  // 礼物数量
  amount: number
  // 赠送动作（投喂等）
  action: string
  // 多人直播间指定赠送给某位主播
  send_master?: {
    uid: number
    uname: string
    room_id: number
  }
  // 礼物连击
  combo?: {
    // 连击id
    batch_id: string
    // 当前连击数
    combo_num: number
    // 连击总价
    total_price: number
  }
}

const parser = (data: any): GiftMessage => {
  const rawData = data.data
  const { medal_info } = data.data

  return {
    user: {
      uid: rawData.uid,
      uname: rawData.uname,
      badge: medal_info
        ? {
            name: medal_info.medal_name,
            level: medal_info.medal_level,
            color: int2Color(medal_info.medal_color_start),
            active: medal_info.is_lighted === 1,
            anchor: {
              uid: medal_info.target_id,
              uname: medal_info.anchor_uname,
              room_id: medal_info.anchor_roomid
            }
          }
        : undefined,
      identity: {
        rank: 0,
        guard_level: rawData.guard_level,
        room_admin: false
      }
    },
    gift_id: rawData.gift_id,
    gift_name: rawData.giftName,
    coin_type: rawData.coin_type,
    price: rawData.price,
    amount: rawData.num,
    action: rawData.action,
    send_master: rawData.send_master
      ? {
          uid: rawData.send_master.uid,
          uname: rawData.send_master.uname,
          room_id: rawData.send_master.room_id
        }
      : undefined,
    combo: rawData.batch_combo_id
      ? {
          batch_id: rawData.batch_combo_id,
          combo_num: rawData.super_batch_gift_num,
          total_price: rawData.combo_total_coin
        }
      : undefined
  }
}

export interface GiftHandler {
  onGift: (message: Message<GiftMessage>) => void
}

export const Gift = {
  parser,
  eventName: 'SEND_GIFT',
  handlerName: 'onGift'
} as const
