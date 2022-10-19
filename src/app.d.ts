interface User {
  uid: number
  uname: string
  badge?: {
    name: string
    level: number
  }
}

interface DanmuMsg {
  user: User
  content: string
}

interface SuperChatMsg {
  user: User
  content: string
  price: number
  time: number
}

interface GuardBuyMsg {
  user: User
  price: number
  gift_name: string
}

export interface RoomMsgHandler {
  onHeartBeat?: (hot: number) => void
  onIncomeDanmu?: (message: DanmuMsg) => void
  onIncomeDanmuRaw?: (data: any) => void
  onWatchedChange?: (watchers: number) => void
  onWatchedChangeRaw?: (data: any) => void
  onIncomeSuperChat?: (message: SuperChatMsg) => void
  onIncomeSuperChatRaw?: (data: any) => void
  onGuardBuy?: (message: GuardBuyMsg) => void
  onGuardBuyRaw?: (data: any) => void
}
