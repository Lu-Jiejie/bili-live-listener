export interface Message<T> {
  /** 消息原生类型 */
  cmd: string
  /** 收到消息的时间戳 */
  timestamp: number
  /** 类型化后的消息主体 */
  data: T
  /** 原生消息 */
  raw: any
}

export interface User {
  /** 用户Id */
  uid: number
  /** 用户名 */
  uname: string
  /** 用户头像 */
  face?: string
  /** 用户头像框 */
  faceFrame?: string
  /** 用户当前佩戴的粉丝勋章 */
  fansMedal?: FansMedal
  /** 高能榜排名 */
  giftRank?: GiftRank
  /** 大航海类型 */
  guardType?: GuardType
  // 是否为房管
  isRoomAdmin?: boolean
}

export interface FansMedal {
  /** 粉丝勋章名称 */
  name: string
  /** 粉丝勋章等级 */
  level: number
  /** 粉丝勋章的大航海类型 */
  guardType: GuardType
  /** 粉丝勋章颜色 */
  color: {
    /** 原始颜色 */
    original: string
    /** 边框色 */
    border: string
    /** 渐变色开始 */
    start: string
    /** 渐变色结束 */
    end: string
  }
  /** 粉丝勋章是否点亮 */
  isLighted: boolean
  /** 相关主播信息 */
  anchor: {
    /** 主播用户Id */
    uid: number
    /** 主播用户名 */
    uname: string
    /** 主播房间号 */
    roomId: number
  }
}

/** 高能榜排名 */
export enum GiftRank {
  /** 未上榜 */
  None,
  /** 榜1 */
  First,
  /** 榜2 */
  Second,
  /** 榜3 */
  Third
}

/** 大航海类型 */
export enum GuardType {
  /** 未上舰 */
  None,
  /** 总督 */
  ZongDu,
  /** 提督 */
  TiDu,
  /** 舰长 */
  JianZhang
}

/** 互动类型 */
export enum InteractType {
  Enter = 1,
  Follow,
  Share,
  Like
}
