import type { KeepLiveTCP, KeepLiveWS } from 'tiny-bilibili-ws'
import {
  Popularity,
  type PopularityHandler,
  Danmu,
  type DanmuHandler,
  GuardBuy,
  type GuardBuyHandler,
  SuperChat,
  type SuperChatHandler,
  Gift,
  type GiftHandler,
  WatchedChange,
  type WatchedChangeHandler,
  RankCountChange,
  type RankCountChangeHandler,
  LikeCountChange,
  type LikeCountChangeHandler,
  Notice,
  type NoticeHandler,
  FansCount,
  type FansCountHandler,
  LiveStart,
  type HotRankChangeHandler,
  HotRankChange,
  type LiveStartHandler,
  LiveEnd,
  type LiveEndHandler,
  Interact,
  type InteractHandler,
  EntryEffect,
  type EntryEffectHandler,
  RoomChange,
  type RoomChangeHandler
} from '../parser'
import type { Message } from '../type'
import { normalizeMessage, randomText } from '../utils'

export type MessageHandler = Partial<
  {
    // 连接成功
    onOpen: () => void
    // 连接关闭
    onClose: () => void
    // 开始监听信息
    onStartListen: () => void
  } & PopularityHandler &
    DanmuHandler &
    GuardBuyHandler &
    SuperChatHandler &
    GiftHandler &
    WatchedChangeHandler &
    RankCountChangeHandler &
    LikeCountChangeHandler &
    NoticeHandler &
    FansCountHandler &
    HotRankChangeHandler &
    LiveStartHandler &
    LiveEndHandler &
    InteractHandler &
    EntryEffectHandler &
    RoomChangeHandler
>

export const listenAll = (live: KeepLiveTCP | KeepLiveWS, roomId: number, handler?: MessageHandler) => {
  if (!handler) {
    return
  }

  // 连接开启
  if (handler.onOpen) {
    live.on('open', () => {
      handler.onOpen?.()
    })
  }

  // 连接关闭
  if (handler.onClose) {
    live.on('close', () => {
      handler.onClose?.()
    })
  }

  // 成功登入房间、开始监听
  if (handler.onStartListen) {
    live.on('live', () => {
      handler.onStartListen?.()
    })
  }

  // PopularityChange 人气值
  if (handler[Popularity.handlerName]) {
    live.on(Popularity.eventName, (data) => {
      const parsedData = Popularity.parser(data.data)
      handler[Popularity.handlerName]!(normalizeMessage(Popularity.eventName, parsedData))
    })
  }

  // Danmu 普通弹幕
  if (handler[Danmu.handlerName]) {
    live.on(Danmu.eventName, (data) => {
      const parsedData = Danmu.parser(data.data, roomId)
      handler[Danmu.handlerName]!(normalizeMessage(Danmu.eventName, parsedData))
    })
  }

  // GuardBuy 上舰信息
  if (handler[GuardBuy.handlerName]) {
    live.on(GuardBuy.eventName, (data) => {
      const parsedData = GuardBuy.parser(data.data)
      handler[GuardBuy.handlerName]!(normalizeMessage(GuardBuy.eventName, parsedData))
    })
  }

  // SuperChat sc
  if (handler[SuperChat.handlerName]) {
    live.on(SuperChat.eventName, (data) => {
      const parsedData = SuperChat.parser(data.data, roomId)
      handler[SuperChat.handlerName]!(normalizeMessage(SuperChat.eventName, parsedData))
    })
  }

  // Gift 礼物信息
  if (handler[Gift.handlerName]) {
    live.on(Gift.eventName, (data) => {
      const parsedData = Gift.parser(data.data)
      handler[Gift.handlerName]!(normalizeMessage(Gift.eventName, parsedData))
    })
  }

  // WatchedChange 多少人看过
  if (handler[WatchedChange.handlerName]) {
    live.on(WatchedChange.eventName, (data) => {
      const parsedData = WatchedChange.parser(data.data)
      handler[WatchedChange.handlerName]!(normalizeMessage(WatchedChange.eventName, parsedData))
    })
  }

  // RankCountChange 高能榜人数
  if (handler[RankCountChange.handlerName]) {
    live.on(RankCountChange.eventName, (data) => {
      const parsedData = RankCountChange.parser(data.data)
      handler[RankCountChange.handlerName]!(normalizeMessage(RankCountChange.eventName, parsedData))
    })
  }

  // LikeCountChange 点赞量
  if (handler[LikeCountChange.handlerName]) {
    live.on(LikeCountChange.eventName, (data) => {
      const parsedData = LikeCountChange.parser(data.data)
      handler[LikeCountChange.handlerName]!(normalizeMessage(LikeCountChange.eventName, parsedData))
    })
  }

  // Notice 广播信息
  if (handler[Notice.handlerName]) {
    live.on(Notice.eventName, (data) => {
      const parsedData = Notice.parser(data.data, roomId)
      handler[Notice.handlerName]!(normalizeMessage(Notice.eventName, parsedData))
    })
  }

  // FansCount 粉丝数、粉丝团人数实时更新
  if (handler[FansCount.handlerName]) {
    live.on(FansCount.eventName, (data) => {
      const parsedData = FansCount.parser(data.data)
      handler[FansCount.handlerName]!(normalizeMessage(FansCount.eventName, parsedData))
    })
  }

  // HotRankChange 热门排名
  if (handler[HotRankChange.handlerName]) {
    live.on(HotRankChange.eventName, (data) => {
      const parsedData = HotRankChange.parser(data.data)
      handler[HotRankChange.handlerName]!(normalizeMessage(HotRankChange.eventName, parsedData))
    })
  }

  // LiveStart 开播提醒
  if (handler[LiveStart.handlerName]) {
    live.on(LiveStart.eventName, (data) => {
      const parsedData = LiveStart.parser(data.data)
      handler[LiveStart.handlerName]!(normalizeMessage(LiveStart.eventName, parsedData))
    })
  }

  // LiveEnd 下播提醒
  if (handler[LiveEnd.handlerName]) {
    live.on(LiveEnd.eventName, (data) => {
      const parsedData = LiveEnd.parser(data.data)
      handler[LiveEnd.handlerName]!(normalizeMessage(LiveEnd.eventName, parsedData))
    })
  }

  // Interact 普通用户直播间互动（进入、关注、分享直播间）
  if (handler[Interact.handlerName]) {
    live.on(Interact.eventName, (data) => {
      const parsedData = Interact.parser(data.data, roomId)
      handler[Interact.handlerName]!(normalizeMessage(Interact.eventName, parsedData))
    })
  }

  // EntryEffect 特殊用户进入直播间（舰长等）
  if (handler[EntryEffect.handlerName]) {
    live.on(EntryEffect.eventName, (data) => {
      const parsedData = EntryEffect.parser(data.data)
      handler[EntryEffect.handlerName]!(normalizeMessage(EntryEffect.eventName, parsedData))
    })
  }

  // RoomChange 房间信息更改
  if (handler[RoomChange.handlerName]) {
    live.on(RoomChange.eventName, (data) => {
      const parsedData = RoomChange.parser(data.data)
      handler[RoomChange.handlerName]!(normalizeMessage(RoomChange.eventName, parsedData))
    })
  }
}
