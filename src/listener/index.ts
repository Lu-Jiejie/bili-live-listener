import { KeepLiveTCP, KeepLiveWS } from 'tiny-bilibili-ws'
import {
  PopularityChange,
  type PopularityChangeHandler,
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
  type NoticeHandler
} from '../parser'
import type { Message } from '../type'
import { randomText } from '../utils'

export type MessageHandler = Partial<
  {
    // 连接成功
    onOpen: () => void
    // 连接关闭
    onClose: () => void
    // 开始监听信息
    onStartListen: () => void
  } & PopularityChangeHandler &
    DanmuHandler &
    GuardBuyHandler &
    SuperChatHandler &
    GiftHandler &
    WatchedChangeHandler &
    RankCountChangeHandler &
    LikeCountChangeHandler &
    NoticeHandler
>

const normalizeMessage = <T>(type: string, body: T): Message<T> => {
  const timestamp = Date.now()
  const hex = randomText(5)
  // id构成：时间戳:消息类型:随机hex
  const id = `${timestamp}:${type}:${hex}`
  return {
    id,
    timestamp,
    type,
    body
  }
}

export const listenAll = (live: KeepLiveTCP | KeepLiveWS, roomId: number, handler?: MessageHandler) => {
  if (!handler) {
    return
  }

  // 常规
  if (handler.onOpen) {
    live.on('open', () => {
      handler.onOpen?.()
    })
  }
  if (handler.onClose) {
    live.on('close', () => {
      handler.onClose?.()
    })
  }
  if (handler.onStartListen) {
    live.on('live', () => {
      handler.onStartListen?.()
    })
  }

  // PopularityChange 人气值
  if (handler[PopularityChange.handlerName]) {
    live.on(PopularityChange.eventName, (data) => {
      const parsedData = PopularityChange.parser(data.data)
      handler[PopularityChange.handlerName]!(normalizeMessage(PopularityChange.eventName, parsedData))
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
    live.on(LikeCountChange.eventName, (data) => {
      const parsedData = LikeCountChange.parser(data.data)
      handler[LikeCountChange.handlerName]!(normalizeMessage(LikeCountChange.eventName, parsedData))
    })
  }
}
