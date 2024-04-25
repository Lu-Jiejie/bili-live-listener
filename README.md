# bili-live-listener

[![NPM Version](https://img.shields.io/npm/v/bili-live-listener?style=flat&color=skyblue)](https://www.npmjs.com/package/bili-live-listener) [![Bilibili](https://img.shields.io/badge/-Bilibili直播-skyblue?style=flat&logo=Bilibili&logoColor=444)](https://live.bilibili.com/)

Bilibili直播间消息监听库。

- 更优雅的消息监听方式
- 更丰富的类型导出
- 持续更新的API。
- 基于 TCP 协议，~~也许更节省内存~~。

## Install

```bash
npm i bili-live-listener
```

## Example

```typescript
import { BiliLive,  } from 'bili-live-listener'

// 获取直播间长号
const { longRoomId } = getRoomId(510)

// 实例化一个 BiliLive 对象，传入直播间号
// 需要传入登录状态下获取的 key 以及 uid，详情见下方 Options
const biliLive = new BiliLive(longRoomId, {
  key: 'xxxxxxxx', // your key
  uid: 12345678 // your logined uid
})

// 监听弹幕消息，返回一个移除监听器的函数
const removeHandler = biliLive.onDanmu(({ data }) => {
  console.log(`${data.user.uname} : ${data.content}`)
})

// 移除监听器
removeHandler()

// 切断连接
biliLive.close()
```

## Class Params

> [!IMPORTANT]
> ~~叔叔~~B站修改了获取直播间数据包的要求，现在必须传入登录状态下获取的 `key` 以及 登录的 `uid` 才能正常接受到数据包。

BiliLive 的构造函数接受两个参数，分别为 `roomId` 和 `options`。

### roomId

要监听的直播间号，需要传入长号。

在 `node` 环境下，可以使用本库提供的 `getRoomId` 函数获取长号与短号（如果有）。

```typescript
import { getRoomId } from 'bili-live-listener'

console.log(getRoomId(510))
// => { longRoomId: 80397, shortRoomId: 510 }

console.log(getRoomId(80397))
// => { longRoomId: 80397, shortRoomId: 510 }
```

### options

#### key

登录状态下获取的 `key`。

登录状态下，在浏览器中访问链接 https://api.live.bilibili.com/room/v1/Room/mobileRoomInit?id={LONG_ROOM_ID} , 找到响应体中的 `data.token` 即为 `key`。

在 `node` 环境下，可以使用本库提供的 `getRoomConf` 函数获取，示例如下：

```typescript
import { getRoomConf} from 'bili-live-listener'

// bilibili.com 中的 cookie，注意不要通过 `document.cookie` 获取，而应该通过浏览器发送请求的请求头中的 `cookie` 属性获取
const cookie = 'buvid3=...'

// 注意传入长号
const longRoomId = 80397

const { key } = getRoomConf(longRoomId, cookie)
```

#### uid

登录的 `uid`。

登录状态下，在浏览器中访问 https://api.bilibili.com/x/web-interface/nav ，找到响应体中的 `data.mid` 即为 `uid`。

当然，你也可以直接访问自己的主页，找到 `uid`。

在 `node` 环境下，可以使用本库提供的 `getLoginedUid` 函数获取，示例如下：

```typescript
import { getLoginedUid } from 'bili-live-listener'

// bilibili.com 中的 cookie，注意不要通过 `document.cookie` 获取，而应该通过浏览器发送请求的请求头中的 `cookie` 属性获取
const cookie = 'buvid3=...'

const uid = getLoginedUid(cookie)
```

#### isBrowser

是否在浏览器环境下运行，默认为 `false`。

浏览器环境下必须传入 `true`。

## Instance Methods

### Common Methods

| Instance Method | Callback Params        | Trigger When ...             |
| --------------- | -------------------- | ---------------------------- |
| onOpen          | void           | 连接开启                     |
| onLive          | void           | 成功登入房间                 |
| onHeartbeat     | void           | 收到服务器心跳包，约30s一次  |
| onClose         | void           | 连接关闭                     |
| onError         | error: any | 连接 error，同时连接也会关闭 |

### Listen to Raw Message

你可以使用 `onRawMessage` 方法监听原生消息，以应对B站新增的消息类型。一个例子如下：

```typescript
// 监听一切消息
biliLive.onRawMessage('msg',(message) => {
  console.log(message)
})

// 监听指定消息
biliLive.onRawMessage('DANMU_MSG',(message) => {
  console.log(message)
})
  ```

### Message Methods

| Instance Method | Callback Params        | Trigger When ...             |
| --------------- | -------------------- | ---------------------------- |
| onDanmu         | [DanmuData](src/events/Danmu.ts) | 收到弹幕消息                 |
| onGuardBuy      | [GuardBuyData](src/events/GuardBuy.ts) | 收到上船消息                 |
| onSuperChat     | [SuperChatData](src/events/SuperChat.ts) | 收到醒目留言消息             |
| onGift          | [GiftData](src/events/Gift.ts) | 收到礼物消息                 |
| onWatchedChange | [WatchedChangeData](src/events/WatchedChange.ts) | “XX人看过”人数变动           |
| onRankCountChange | [RankCountChangeData](src/events/RankCountChange.ts) | 高能榜人数变动           |
| onLikeCountChange | [LikeCountChangeData](src/events/LikeCountChange.ts) | 点赞数变动               |
| onNotice       | [NoticeData](src/events/Notice.ts) | 收到全站广播                 |
| onHotRankUpdate | [HotRankUpdateData](src/events/HotRankUpdate.ts) | 当前直播间的分区排名变动                 |
| onFansCountUpdate | [FansCountUpdateData](src/events/FansCountUpdate.ts) | 粉丝数量\粉丝团数量变动                 |
| onLiveStart    | [LiveStartData](src/events/LiveStart.ts) | 直播开启                     |
| onLiveEnd      | [LiveEndData](src/events/LiveEnd.ts) | 直播结束                     |
| onInteract    | [InteractData](src/events/Interact.ts) | 互动消息（用户进入、关注、分享、点赞直播间）                     |
| onEntryEffect   | [EntryEffectData](src/events/EntryEffect.ts) | 有入场特效的用户进入直播间（舰长、提督、总督等）                     |
| onRoomChange  | [RoomChangeData](src/events/RoomChange.ts) | 房间信息变动（标题、分区）                     |
| onAnchorLotStart | [AnchorLotStartData](src/events/AnchorLotStart.ts) | 天选时刻开始                     |
| onAnchorLotEnd | [AnchorLotEndData](src/events/AnchorLotEnd.ts) | 天选时刻结束                     |

值得注意的是，这些 `Message Methods` 都会返回一个移除监听器的函数，你可以调用这个函数来移除监听器，参考 [这里](#example)

### Message Type

#### Common

```typescript
// 回调函数中的参数类型
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

// 用户信息
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

// 粉丝勋章信息
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

/** 天选时刻奖品信息 */
export interface AnchorLotAward {
  /** 奖品名称 */
  name: string
  /** 奖品数量 */
  num: number
  /** 奖品图片 */
  image: string
  /** 奖品类型 */
  type: AnchorLotAwardType
  /** 奖品价值描述 */
  priceText: string
}

/** 天选时刻奖品类型 */
export enum AnchorLotAwardType {
  /** 实物奖品 */
  PHYSICAL = 0,
  /** 虚拟奖品 */
  VIRTUAL = 1
}

/** 天选时刻参与用户要求的类型 */
export enum AnchorLotUserType {
  /** 无要求 */
  None = 0,
  /** 关注主播 */
  Follow = 1,
  /** 粉丝勋章 */
  FansMedal = 2,
  /** 大航海 */
  Guard = 3
}
```

#### Data Type

你可以在 [src/events](src/events) 查看所有的消息主体类型。

比如，弹幕消息的消息主体类型为 `DanmuData`，定义如下：

```typescript
export interface DanmuData {
  /** 用户信息 */
  user: User
  /** 弹幕内容 */
  content: string
  /** 时间戳 */
  timestamp: number
  /** 是否为抽奖弹幕 */
  isLottery: boolean
  // 弹幕表情
  emoticon?: {
    id: number
    url: string
  }
}
```

## Reference

[SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/live/message_stream.md)

[lovelyyoshino/Bilibili-Live-API](https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md)
