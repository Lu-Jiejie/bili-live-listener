import type { EventInfo } from '../types/event'
import type { GuardType, Message, User } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface GuardBuyData {
  /** 用户信息 */
  user: User
  /** 大航海类型 */
  guardType: GuardType
  /** 价格 单位：1/1000元 */
  price: number
  /** 数量 */
  num: number
  /** 礼物名称 */
  giftName: string
  /** 礼物Id */
  giftId: number
  /** 开始时间 */
  startTime: number
  /** 结束时间 */
  endTime: number
}

function dataProcessor(rawData: any): Message<GuardBuyData> {
  const { data: info } = rawData
  const data: GuardBuyData = {
    user: {
      uid: info.uid,
      uname: info.username
    },
    guardType: info.guard_level,
    price: info.price,
    num: info.num,
    giftName: info.gift_name,
    giftId: info.gift_id,
    startTime: info.start_time,
    endTime: info.end_time
  }
  return normalizeMessage(rawData.cmd, data, rawData)
}

export const GuardBuyEvent: EventInfo<GuardBuyData> = {
  cmdName: 'GUARD_BUY',
  handlerName: 'onGuardBuy',
  dataProcessor
}
