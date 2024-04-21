import { KeepLiveTCP } from 'bilibili-live-ws'

import type { Message } from './types/message'

// common events
import { CloseEvent, ErrorEvent, HeartbeatEvent, LiveEvent, OpenEvent } from './events/common'

// events
import { type DanmuData, DanmuEvent } from './events/Danmu'
import { type GuardBuyData, GuardBuyEvent } from './events/GuardBuy'
import { type SuperChatData, SuperChatEvent } from './events/SuperChat'
import { type GiftData, GiftEvent } from './events/Gift'
import { type WatchedChangeData, WatchedChangeEvent } from './events/WatchedChange'
import { type RankCountChangeData, RankCountChangeEvent } from './events/RankCountChange'
import { type LikeCountChangeData, LikeCountChangeEvent } from './events/LikeCountChange'
import { type NoticeData, NoticeEvent } from './events/Notice'

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
  RankCountChangeEvent,
  LikeCountChangeEvent,
  NoticeEvent
]

interface BiliLiveOptions {
  key: string
  uid: number
}

type RemoveHandler = () => void

export default class BiliLive {
  public live: KeepLiveTCP
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
  public onRankCountChange!: (callback: (message: Message<RankCountChangeData>) => void) => RemoveHandler
  public onLikeCountChange!: (callback: (message: Message<LikeCountChangeData>) => void) => RemoveHandler
  public onNotice!: (callback: (message: Message<NoticeData>) => void) => RemoveHandler

  constructor(roomId: number, options: BiliLiveOptions) {
    this.live = new KeepLiveTCP(roomId, options)
    this.initEvents()
  }

  private initEvents() {
    [...commonEvents, ...events].forEach((event) => {
      const { cmdName, handlerName, dataProcessor } = event
      this.live.on(cmdName, (data) => {
        if (this.handlers[handlerName])
          this.handlers[handlerName].forEach(({ callback }) => callback(dataProcessor(data)))
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
}
