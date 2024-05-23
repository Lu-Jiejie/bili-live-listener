# bili-live-listener

[![npm version][npm-version-badge]][npm-version-href]
[![install size][install-size-badge]][install-size-href]
[![jsdocs][jsdocs-badge]][jsdocs-href]
[![license][license-badge]][license-href]
[![bilibili live][bili-live-badge]][bili-live-href]

Bilibili直播间消息监听库。

- 更优雅的消息监听方式
- 更丰富的类型导出
- 持续更新的API
- 基于 TCP 协议，~~也许更节省内存~~

## Install

```bash
npm i bili-live-listener
```

## Example

```typescript
import { BiliLive } from 'bili-live-listener'

// 获取直播间长号
const { longRoomId } = getRoomId(510)

// 实例化一个 BiliLive 对象，传入直播间号
// 需要传入登录状态下获取的 key 以及 uid，详情见下方 Options
const biliLive = new BiliLive(longRoomId, {
  key: 'xxxxxxxx', // your key
  uid: 12345678, // your logined uid
  // isBrowser: true // if you are in browser environment
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
import { getRoomConf } from 'bili-live-listener'

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
| onRedPocketStart | [RedPocketStartData](src/events/RedPocketStart.ts) | 红包抽奖开始                     |
| onRedPocketEnd | [RedPocketEndData](src/events/RedPocketEnd.ts) | 红包抽奖结束                     |
| onPopularRankUpdate | [PopularRankUpdateData](src/events/PopularRankUpdate.ts) | 当前直播间的热门排名变动                     |
| onDanmuInteract | [DanmuInteractData](src/events/DanmuInteract.ts) | 弹幕互动（弹幕投票信息、“他们都在说”类的弹幕连击）                      |

值得注意的是，这些 `Message Methods` 都会返回一个移除监听器的函数，你可以调用这个函数来移除监听器，参考 [这里](#example)

### Message Type

#### Common

```typescript
// 回调函数中的参数类型
export interface Message<T> {
  /** 消息原生类型 */
  cmd: string
  /** 收到消息的时间戳，由 Date.now() 生成 */
  timestamp: number
  /** 类型化后的消息主体 */
  data: T
  /** 原生消息 */
  raw: any
}
```

> [!TIP]
> 大部分消息主体 `data` 中都会包含 `timestamp` 字段，表示消息到达的更精确的秒时间戳，建议使用这个字段。
> 而 `Message<T>` 中的 `timestamp` 字段，是由 `Date.now()` 生成的时间戳，也许会有一定的误差。

#### Data Type

你可以在 [src/events](src/events) 查看所有的消息主体类型，它将作为泛型传入回调函数的参数类型 `Message<T>` 中。其中部分类型在 [src/types/message.ts](src/types/message.ts) 中定义。

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

<!-- Badge -->
[npm-version-badge]: https://img.shields.io/npm/v/bili-live-listener?style=flat&color=skyblue&labelColor=444
[npm-version-href]: https://www.npmjs.com/package/bili-live-listener
[install-size-badge]: https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=bili-live-listener&query=$.install.pretty&label=install%20size&style=flat&color=skyblue&labelColor=444
[install-size-href]: https://bundlephobia.com/result?p=bili-live-listener
[jsdocs-badge]: https://img.shields.io/badge/jsDocs-reference-skyblue?style=flat&color=skyblue&labelColor=444
[jsdocs-href]: https://www.jsdocs.io/package/bili-live-listener
[license-badge]: https://img.shields.io/github/license/Lu-Jiejie/bili-live-listener?style=flat&color=skyblue&labelColor=444
[license-href]: https://github.com/Lu-Jiejie/bili-live-listener/blob/main/LICENSE
[bili-live-badge]: https://img.shields.io/badge/-Bilibili直播-skyblue?style=flat&logo=Bilibili&color=skyblue&labelColor=444&logoColor=white
[bili-live-href]: https://live.bilibili.com/
