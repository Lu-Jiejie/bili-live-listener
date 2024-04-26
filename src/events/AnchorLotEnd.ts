import type { EventInfo } from '../types/event'
import type { AnchorLotAward, Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface AnchorLotEndData {
  /** 天选时刻Id */
  id: number
  /** 奖品 */
  award: AnchorLotAward
  /** 中奖用户信息 */
  winners: {
    /** 用户Id */
    uid: number
    /** 用户名 */
    uname: string
    /** 用户头像 */
    face: string
    /** 直播等级 */
    level: number
    /** 中奖数量 */
    num: number
  }[]
}

function dataProcessor(rawData: any): Message<AnchorLotEndData> {
  const { data } = rawData
  const newData: AnchorLotEndData = {
    id: data.id,
    award: {
      name: data.award_name,
      num: data.award_num,
      type: data.award_type,
      image: data.award_image,
      priceText: data.award_price_text
    },
    winners: data.award_users.map((user: any) => ({
      uid: user.uid,
      uname: user.uname,
      face: user.face,
      level: user.level,
      num: user.num
    }))
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const AnchorLotEndEvent: EventInfo<AnchorLotEndData> = {
  cmdName: 'ANCHOR_LOT_AWARD',
  handlerName: 'onAnchorLotEnd',
  dataProcessor
}
