import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface RedPocketStartData {
  /** 红包Id */
  id: number
  /** 红包奖品 */
  awards: {
    /** 礼物Id */
    giftId: number
    /** 礼物名称 */
    giftName: number
    /** 礼物数量 */
    num: number
    /** 奖品图片 */
    giftPic: string
  }[]
  /** 奖品总价值；单位：1金瓜子=1/1000元=1/100电池 */
  totalPrice: number
  /** 弹幕口令 */
  danmu: string
  /** 红包赠送者信息 */
  sender: {
    uid: number
    uname: string
    face: string
  }
  /** 红包开始抽奖时间 */
  startTime: number
  /** 红包抽奖持续时间，单位：秒 */
  duration: number
  /** 等待开始抽奖的红包数量 */
  waitNum: number
}

function dataProcessor(rawData: any): Message<RedPocketStartData> {
  const { data } = rawData
  const newData: RedPocketStartData = {
    id: data.lot_id,
    awards: data.awards.map((award: any) => ({
      giftId: award.gift_id,
      giftName: award.gift_name,
      num: award.num,
      giftPic: award.gift_pic
    })),
    totalPrice: data.total_price,
    danmu: data.danmu,
    sender: {
      uid: data.sender_uid,
      uname: data.sender_name,
      face: data.sender_face
    },
    startTime: data.start_time,
    duration: data.last_time,
    waitNum: data.wait_num
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const RedPocketStartEvent: EventInfo<RedPocketStartData> = {
  cmdName: 'POPULARITY_RED_POCKET_START',
  handlerName: 'onRedPocketStart',
  dataProcessor
}
