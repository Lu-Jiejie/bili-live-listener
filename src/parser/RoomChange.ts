import { Message } from '../type'

export interface RoomChangeMessage {
  // 直播间标题
  title: string
  // 二级分区id
  area_id: number
  // 二级分区名
  area_name: string
  // 一级分区id
  parent_area_id: number
  // 一级分区名
  parent_area_name: string
}

const parser = (data: any): RoomChangeMessage => {
  const rawData = data.data

  return {
    title: rawData.title,
    area_id: rawData.area_id,
    area_name: rawData.area_name,
    parent_area_id: rawData.parent_area_id,
    parent_area_name: rawData.parent_area_name
  }
}

export interface RoomChangeHandler {
  onRoomChange: (message: Message<RoomChangeMessage>) => void
}

export const RoomChange = {
  parser,
  eventName: 'ROOM_CHANGE',
  handlerName: 'onRoomChange'
} as const
