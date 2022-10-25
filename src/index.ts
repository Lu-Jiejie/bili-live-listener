import { KeepLiveTCP, getLongRoomId } from 'tiny-bilibili-ws'

import { listenAll, type MessageHandler } from './listener'

export interface MessageListener {
  // 房间号
  roomId: number
  // 短号（如果没有则为0）
  shortRoomId: number
  // 主动关闭
  close: () => void
  // 主动刷新人气
  getPopularity: () => Promise<number>
}

export const listen = async (roomId: number, handler: MessageHandler) => {
  const resData = (await getLongRoomId(roomId)).data
  const realRoomId = resData.room_id
  const shortRoomId = resData.short_id
  // 新建实例
  const live = new KeepLiveTCP(realRoomId)
  // 开启监听
  listenAll(live, realRoomId, handler)
  // 返回实例
  const listenerInstance: MessageListener = {
    roomId: realRoomId,
    shortRoomId,
    close: () => live.close(),
    getPopularity: () => live.getOnline()
  }
  return listenerInstance
}

export { getLongRoomId }
export type { MessageHandler }
export type { Message, User } from './type'
export { GuardLevel } from './type/const'
export type {
  PopularityMessage,
  DanmuMessage,
  GuardBuyMessage,
  SuperChatMessage,
  GiftMessage,
  WatchedChangeMessage,
  RankCountChangeMessage,
  LikeCountChangeMessage,
  NoticeMessage,
  FansCountMessage,
  HotRankChangeMessage,
  LiveStartMessage,
  LiveEndMessage
} from './parser'
