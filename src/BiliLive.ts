import { KeepLiveTCP } from 'bilibili-live-ws'
import { KeepLiveWS } from 'bilibili-live-ws/browser'

import type { Message } from './types/message'

// common events
import { CloseEvent, ErrorEvent, HeartbeatEvent, LiveEvent, OpenEvent } from './events/common'

// events
import { type DanmuData, DanmuEvent } from './events/Danmu'
import { type GuardBuyData, GuardBuyEvent } from './events/GuardBuy'
import { type SuperChatData, SuperChatEvent } from './events/SuperChat'
import { type GiftData, GiftEvent } from './events/Gift'
import { type WatchedChangeData, WatchedChangeEvent } from './events/WatchedChange'
import { type RankCountUpdateData, RankCountUpdateEvent } from './events/RankCountUpdate'
import { type LikeCountUpdateData, LikeCountUpdateEvent } from './events/LikeCountUpdate'
import { type NoticeData, NoticeEvent } from './events/Notice'
import { type HotRankUpdateData, HotRankUpdateEvent } from './events/HotRankUpdate'
import { type FansCountUpdateData, FansCountUpdateEvent } from './events/FansCountUpdate'
import { type LiveStartData, LiveStartEvent } from './events/LiveStart'
import { type LiveEndData, LiveEndEvent } from './events/LiveEnd'
import { type InteractData, InteractEvent } from './events/Interact'
import { type EntryEffectData, EntryEffectEvent } from './events/EntryEffect'
import { type RoomChangeData, RoomChangeEvent } from './events/RoomChange'
import { type AnchorLotStartData, AnchorLotStartEvent } from './events/AnchorLotStart'
import { type AnchorLotEndData, AnchorLotEndEvent } from './events/AnchorLotEnd'
import { type RedPocketStartData, RedPocketStartEvent } from './events/RedPocketStart'
import { type RedPocketEndData, RedPocketEndEvent } from './events/RedPocketEnd'
import { type PopularRankUpdateData, PopularRankUpdateEvent } from './events/PopularRankUpdate'

const commonEvents = [
  OpenEvent,
  LiveEvent,
  HeartbeatEvent,
  CloseEvent,
  ErrorEvent
]

const events = [
  DanmuEvent,
  GuardBuyEvent,
  SuperChatEvent,
  GiftEvent,
  WatchedChangeEvent,
  RankCountUpdateEvent,
  LikeCountUpdateEvent,
  NoticeEvent,
  HotRankUpdateEvent,
  FansCountUpdateEvent,
  LiveStartEvent,
  LiveEndEvent,
  InteractEvent,
  EntryEffectEvent,
  RoomChangeEvent,
  AnchorLotStartEvent,
  AnchorLotEndEvent,
  RedPocketStartEvent,
  RedPocketEndEvent,
  PopularRankUpdateEvent
]

export interface BiliLiveOptions {
  /** 登录状态下获取的key */
  key: string
  /** 登录状态下的uid */
  uid: number
  /** 是否在浏览器环境下 */
  isBrowser?: boolean
}

/** 移除监听器 */
export type RemoveHandler = () => void

export default class BiliLive {
  private live: KeepLiveTCP | KeepLiveWS
  private handlers: Record<string, { id: number, callback: Function }[]> = {}
  private handlerIdCounter = 0

  // common events handler
  public onOpen!: (callback: () => void) => RemoveHandler
  public onLive!: (callback: () => void) => RemoveHandler
  public onHeartbeat!: (callback: () => void) => RemoveHandler
  public onClose!: (callback: () => void) => RemoveHandler
  public onError!: (callback: (error: any) => void) => RemoveHandler

  // event handler
  public onDanmu!: (callback: (message: Message<DanmuData>) => void) => RemoveHandler
  public onGuardBuy!: (callback: (message: Message<GuardBuyData>) => void) => RemoveHandler
  public onSuperChat!: (callback: (message: Message<SuperChatData>) => void) => RemoveHandler
  public onGift!: (callback: (message: Message<GiftData>) => void) => RemoveHandler
  public onWatchedChange!: (callback: (message: Message<WatchedChangeData>) => void) => RemoveHandler
  public onRankCountChange!: (callback: (message: Message<RankCountUpdateData>) => void) => RemoveHandler
  public onLikeCountChange!: (callback: (message: Message<LikeCountUpdateData>) => void) => RemoveHandler
  public onNotice!: (callback: (message: Message<NoticeData>) => void) => RemoveHandler
  public onHotRankUpdate!: (callback: (message: Message<HotRankUpdateData>) => void) => RemoveHandler
  public onFansCountUpdate!: (callback: (message: Message<FansCountUpdateData>) => void) => RemoveHandler
  public onLiveStart!: (callback: (message: Message<LiveStartData>) => void) => RemoveHandler
  public onLiveEnd!: (callback: (message: Message<LiveEndData>) => void) => RemoveHandler
  public onInteract!: (callback: (message: Message<InteractData>) => void) => RemoveHandler
  public onEntryEffect!: (callback: (message: Message<EntryEffectData>) => void) => RemoveHandler
  public onRoomChange!: (callback: (message: Message<RoomChangeData>) => void) => RemoveHandler
  public onAnchorLotStart!: (callback: (message: Message<AnchorLotStartData>) => void) => RemoveHandler
  public onAnchorLotEnd!: (callback: (message: Message<AnchorLotEndData>) => void) => RemoveHandler
  public onRedPocketStart!: (callback: (message: Message<RedPocketStartData>) => void) => RemoveHandler
  public onRedPocketEnd!: (callback: (message: Message<RedPocketEndData>) => void) => RemoveHandler
  public onPopularRankUpdate!: (callback: (message: Message<PopularRankUpdateData>) => void) => RemoveHandler

  constructor(roomId: number, options: BiliLiveOptions) {
    const { key, uid, isBrowser } = options

    if (isBrowser)
      this.live = new KeepLiveWS(roomId, { key, uid })
    else
      this.live = new KeepLiveTCP(roomId, { key, uid })

    this.initEvents()
  }

  private initEvents() {
    [...commonEvents, ...events].forEach((event) => {
      const { cmdName: _cmdName, handlerName, dataProcessor } = event
      const cmdNames = Array.isArray(_cmdName) ? _cmdName : [_cmdName]
      cmdNames.forEach((cmdName) => {
        this.live.on(cmdName, (data) => {
          if (this.handlers[handlerName])
            this.handlers[handlerName].forEach(({ callback }) => callback(dataProcessor(data)))
        })
      })
      ;(this as any)[handlerName] = function (callback: Function): RemoveHandler {
        return this.addHandler(handlerName, callback)
      }
    })
  }

  private addHandler(handlerName: string, callback: Function): RemoveHandler {
    const id = this.handlerIdCounter++
    if (!this.handlers[handlerName])
      this.handlers[handlerName] = []
    this.handlers[handlerName].push({ id, callback })
    return () => this.removeHandler(handlerName, id)
  }

  private removeHandler(handlerName: string, id: number) {
    if (this.handlers[handlerName])
      this.handlers[handlerName] = this.handlers[handlerName].filter(handler => handler.id !== id)
  }

  public close() {
    this.live.close()
  }

  public onRawMessage: (...args: Parameters<typeof this.live.on>) => void = (...args) => {
    this.live.on(...args)
  }
}
