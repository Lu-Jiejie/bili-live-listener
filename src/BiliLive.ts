import { KeepLiveTCP } from 'bilibili-live-ws'

import type { Message } from './types/message'

// events
import { type DanmuData, DanmuEvent } from './events/Danmu'
import { type GuardBuyData, GuardBuyEvent } from './events/GuardBuy'

const events = [
  DanmuEvent,
  GuardBuyEvent
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

  // event handler
  public onDanmu!: (callback: (message: Message<DanmuData>) => void) => RemoveHandler
  public onGuardBuy!: (callback: (message: Message<GuardBuyData>) => void) => RemoveHandler

  constructor(roomId: number, options: BiliLiveOptions) {
    this.live = new KeepLiveTCP(roomId, options)
    this.initCommonEvents()
    this.initEvents()
  }

  private initEvents() {
    events.forEach((event) => {
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

  private initCommonEvents() {
    this.live.on('open', () => {
      if (this.handlers['onOpen'])
        this.handlers['onOpen'].forEach(({ callback }) => callback())
    })
    this.live.on('live', () => {
      if (this.handlers['onLive'])
        this.handlers['onLive'].forEach(({ callback }) => callback())
    })
    this.live.on('heartbeat', () => {
      if (this.handlers['onHeartbeat'])
        this.handlers['onHeartbeat'].forEach(({ callback }) => callback())
    })
    this.live.on('close', () => {
      if (this.handlers['onClose'])
        this.handlers['onClose'].forEach(({ callback }) => callback())
    })
    this.live.on('error', (error) => {
      if (this.handlers['onError'])
        this.handlers['onError'].forEach(({ callback }) => callback(new Error(error)))
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

  // common events
  public onOpen(callback: () => void) {
    return this.addHandler('onOpen', callback)
  }

  public onLive(callback: () => void) {
    return this.addHandler('onLive', callback)
  }

  public onHeartbeat(callback: () => void) {
    return this.addHandler('onHeartbeat', callback)
  }

  public onClose(callback: () => void) {
    return this.addHandler('onClose', callback)
  }

  public onError(callback: (error: Error) => void) {
    return this.addHandler('onError', callback)
  }

  public close() {
    this.live.close()
  }
}
