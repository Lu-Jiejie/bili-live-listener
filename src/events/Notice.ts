import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface NoticeData {
  /** 广播Id */
  id: number
  /** 广播名称/类型 */
  name: string
  /** 目标直播间Id；如果有短Id则为短Id */
  roomId: number
  /** 目标直播间长Id */
  longRoomId: number
  /** 广播相关链接；如果广播只有本直播间可见则无 */
  url?: string
  /** 广播内容（他人直播间）；如果广播只有本直播间可见则无 */
  messageCommon?: string
  /** 广播内容（自己直播间） */
  messageSelf: string
}

function dataProcessor(rawData: any): Message<NoticeData> {
  const newData: NoticeData = {
    id: rawData.id,
    name: rawData.name,
    roomId: rawData.roomid,
    longRoomId: rawData.real_roomid,
    url: rawData.link_url || undefined,
    messageCommon: rawData.msg_common || undefined,
    messageSelf: rawData.msg_self
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const NoticeEvent: EventInfo<NoticeData> = {
  cmdName: 'NOTICE_MSG',
  handlerName: 'onNotice',
  dataProcessor
}
