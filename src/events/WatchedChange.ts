import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface WatchedChangeData {
  /** 累计观看人数详细数据；如168253 */
  num: number
  /** 格式化文本；如16.8万 */
  textSmall: string
  /** 更完整的格式化文本；如16.8万人看过 */
  textLarge: string
}

function dataProcessor(rawData: any): Message<WatchedChangeData> {
  const { data } = rawData
  const newData: WatchedChangeData = {
    num: data.num,
    textSmall: data.text_small,
    textLarge: data.text_large,
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const WatchedChangeEvent: EventInfo<WatchedChangeData> = {
  cmdName: 'WATCHED_CHANGE',
  handlerName: 'onWatchedChange',
  dataProcessor,
}
