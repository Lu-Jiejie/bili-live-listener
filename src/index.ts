import { KeepLiveTCP, getRoomid } from 'bilibili-live-ws'
import type { RoomMsgHandler, DanmuMsg } from './app'

import parser from './parser'

export const openRoom = async (roomId: number, handler: RoomMsgHandler) => {
  // 短号拿长号
  const realRoomId = await getRoomid(roomId)

  const live = new KeepLiveTCP(realRoomId)

  live.on('open', () => console.log('连接已建立！'))
  // 心跳包（人气）
  live.on('heartbeat', (hot) => {
    handler.onHeartBeat?.(hot)
  })
  // 弹幕
  live.on('DANMU_MSG', (data) => {
    handler.onIncomeDanmuRaw?.(data)
    handler.onIncomeDanmu?.(parser.DANMU_MSG(data))
  })
  // xx人看过
  live.on('WATCHED_CHANGE', (data) => {
    handler.onWatchedChangeRaw?.(data)
    handler.onWatchedChange?.(parser.WATCHED_CHANGE(data))
  })
  // SC
  live.on('SUPER_CHAT_MESSAGE', (data) => {
    handler.onIncomeSuperChatRaw?.(data)
    handler.onIncomeSuperChat?.(parser.SUPER_CHAT_MESSAGE(data))
  })
  // 上舰长
  live.on('GUARD_BUY', (data) => {
    handler.onGuardBuyRaw?.(data)
    handler.onGuardBuy?.(parser.GUARD_BUY(data))
  })
}
export type { RoomMsgHandler, DanmuMsg }
