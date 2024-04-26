import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface RoomChangeData {
  /** 直播间标题 */
  title: string
  /** 一级分区Id */
  parentAreaId: number
  /** 一级分区名称 */
  parentAreaName: string
  /** 二级分区Id */
  areaId: number
  /** 二级分区名称 */
  areaName: string
  /** 时间戳 */
  timestamp: number
}

function dataProcessor(rawData: any): Message<RoomChangeData> {
  const { data } = rawData
  const newData: RoomChangeData = {
    title: data.title,
    parentAreaId: data.parent_area_id,
    parentAreaName: data.parent_area_name,
    areaId: data.area_id,
    areaName: data.area_name,
    timestamp: Number.parseInt(data.sub_session_key.split(':')[1])
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const RoomChangeEvent: EventInfo<RoomChangeData> = {
  cmdName: 'ROOM_CHANGE',
  handlerName: 'onRoomChange',
  dataProcessor
}
