import type { EventInfo } from '../types/event'
import type { GuardType, Message, User } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface GuardBuyData {
  /** 用户信息 */
  user: User
  /** 大航海类型 */
  guardType: GuardType
  /** 价格；单位：1金瓜子=1/1000元=1/100电池 */
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
  const { data } = rawData
  const newData: GuardBuyData = {
    user: {
      uid: data.uid,
      uname: data.username
    },
    guardType: data.guard_level,
    price: data.price,
    num: data.num,
    giftName: data.gift_name,
    giftId: data.gift_id,
    startTime: data.start_time,
    endTime: data.end_time
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const GuardBuyEvent: EventInfo<GuardBuyData> = {
  cmdName: 'GUARD_BUY',
  handlerName: 'onGuardBuy',
  dataProcessor
}
