import type { EventInfo } from '../types/event'
import type { AnchorLotAward, AnchorLotUserType, Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface AnchorLotStartData {
  /** 天选时刻Id */
  id: number
  /** 奖品 */
  award: AnchorLotAward
  /** 弹幕口令 */
  danmu: string
  /** 需要赠送的礼物信息，用于参与天选时刻 */
  gift?: {
    /** 礼物Id */
    id: number
    /** 礼物名称 */
    name: string
    /** 礼物数量 */
    num: number
    /** 礼物价格 */
    price: number
  }
  /** 天选时刻参与用户要求 */
  require: {
    /** 参与用户要求描述 */
    text: string
    /** 参与的用户类型 */
    userType: AnchorLotUserType
    /** 用户类型对应等级 粉丝勋章等级或大航海类型 */
    value: number
  }
  /** 天选时刻开始时间 */
  startTime: number
  /** 天选时刻持续时间，单位：秒 */
  duration: number
}

function dataProcessor(rawData: any): Message<AnchorLotStartData> {
  const { data } = rawData
  const newData: AnchorLotStartData = {
    id: data.id,
    award: {
      name: data.award_name,
      num: data.award_num,
      type: data.award_type,
      image: data.award_image,
      priceText: data.award_price_text
    },
    danmu: data.danmu,
    gift: data.gift_id
      ? {
          id: data.gift_id,
          name: data.gift_name,
          num: data.gift_num,
          price: data.gift_price
        }
      : undefined,
    require: {
      text: data.require_text,
      userType: data.require_type,
      value: data.require_value
    },
    startTime: data.current_time,
    duration: data.max_time
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const AnchorLotStartEvent: EventInfo<AnchorLotStartData> = {
  cmdName: 'ANCHOR_LOT_START',
  handlerName: 'onAnchorLotStart',
  dataProcessor
}
