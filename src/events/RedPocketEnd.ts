import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface RedPocketEndData {
  /** 红包Id */
  id: number
  /** 红包礼物总数 */
  totalNum: number
  /** 中奖用户信息 */
  winners: {
    /** 用户Id */
    uid: number
    /** 用户名 */
    uname: string
    /** 获得的奖品Id */
    giftId: number
  }[]
  /** 红包内礼物信息 */
  awards: {
    /** 礼物Id */
    giftId: number
    /** 礼物名称 */
    giftName: number
    /** 礼物价格 */
    price: number
    /** 奖品图片 */
    giftPic: string
    /** 礼物图片（大） */
    giftBigPic: string
  }[]
}

function dataProcessor(rawData: any): Message<RedPocketEndData> {
  const { data } = rawData
  const newData: RedPocketEndData = {
    id: data.lot_id,
    totalNum: data.total_num,
    winners: data.winner_info.map((winner: any) => ({
      uid: winner[0],
      uname: winner[1],
      giftId: winner[3]
    })),
    awards: Object.entries(data.awards).map(([giftId, giftInfo]: [string, any]) => ({
      giftId: Number.parseInt(giftId),
      giftName: giftInfo.award_name,
      price: giftInfo.award_price,
      giftPic: giftInfo.award_pic,
      giftBigPic: giftInfo.award_big_pic
    }))
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const RedPocketEndEvent: EventInfo<RedPocketEndData> = {
  cmdName: 'POPULARITY_RED_POCKET_WINNER_LIST',
  handlerName: 'onRedPocketEnd',
  dataProcessor
}
