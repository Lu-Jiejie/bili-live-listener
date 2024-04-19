import { KeepLiveTCP } from 'bilibili-live-ws'

import type { Message } from './types/message'

// events
import { type DanmuData, DanmuEvent } from './events/Danmu'

const events = [
  DanmuEvent
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

  // handler
  public onDanmu!: (callback: (message: Message<DanmuData>) => void) => RemoveHandler

  constructor(roomId: number, options: BiliLiveOptions) {
    this.live = new KeepLiveTCP(roomId, options)
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
        const id = this.handlerIdCounter++
        if (!this.handlers[handlerName])
          this.handlers[handlerName] = []
        this.handlers[handlerName].push({ id, callback })
        return () => {
          this.removeHandler(handlerName, id)
        }
      }
    })
  }

  private removeHandler(handlerName: string, id: number) {
    if (this.handlers[handlerName])
      this.handlers[handlerName] = this.handlers[handlerName].filter(handler => handler.id !== id)
  }
}
