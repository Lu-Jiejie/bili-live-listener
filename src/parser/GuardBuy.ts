import type { Message, User } from '../type'
import type { GuardLevel } from '../type/const'

export interface GuardBuyMessage {
  user: User
  // 礼物id
  gift_id: number
  // 礼物名称
  gift_name: string
  // 大航海等级
  guard_level: GuardLevel
  // 价格
  price: number
  // 生效时间
  start_time: number
  // 结束时间
  end_time: number
}

const parser = (data: any): GuardBuyMessage => {
  const rawData = data.data

  return {
    user: {
      uid: rawData.uid,
      uname: rawData.username
    },
    gift_id: rawData.gift_id,
    gift_name: rawData.gift_name,
    guard_level: rawData.guard_level,
    price: rawData.price,
    start_time: rawData.start_time,
    end_time: rawData.end_time
  }
}

export interface GuardBuyHandler {
  onGuardBuy: (message: Message<GuardBuyMessage>) => void
}

export const GuardBuy = {
  parser,
  eventName: 'GUARD_BUY',
  handlerName: 'onGuardBuy'
} as const
