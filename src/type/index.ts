import { GuardLevel } from './const'

export interface User {
  uid: number
  uname: string
  // 牌子
  badge?: {
    name: string
    level: number
    color: string
    // 是否点亮
    active: boolean
    // 主播信息
    anchor: {
      uid: number
      uname: string
      // 主播房间号
      room_id: number
      // 是否是本直播间
      is_same_room?: boolean
    }
  }
  // 用户身份
  identity?: {
    // 高能榜排名
    rank: 0 | 1 | 2 | 3
    // 大航海信息
    guard_level: GuardLevel
    // 是否为房管
    room_admin: boolean
  }
}

export interface Message<T> {
  // 消息ID
  id: string
  // 消息时间戳
  timestamp: number
  // 消息类型
  type: string
  // 消息主体
  body: T
}
