# bili-live-listener

[![npm](https://img.shields.io/npm/v/bili-live-listener)](https://www.npmjs.com/package/bili-live-listener)

b站直播间信息监听库，包括但不限于弹幕、礼物、醒目留言、全站广播等。

## 特点

+ 过滤原始数据，提供更简洁有用的数据结构、类型
+ 使用typescript，有类型导出
+ 持续更新钩子

## 安装

```bash
npm install bili-live-listener
```

## 简单使用

```typescript
import { listen } from 'bili-live-listener'
import type { MessageHandler, Message, DanmuMessage } from 'bili-live-listener'

// 回调函数对象
const handler: MessageHandler = {
  // 成功登入房间回调函数
  onStartListen() {
    // do something...
  },
  // 弹幕消息回调函数
  onDanmu(message: Message<DanmuMessage>) {
    // 取出弹幕消息主体
    const { body } = message
    // 打印 用户名：弹幕内容
    console.log(`${body.user.uname} : ${body.content}`)
  }
}
// 开始监听直播间 listen(roomId,handler)
// 短号将自动转换为长号，注意await
const live = await listen(510, handler)

// 关闭连接
live.close()
```

## listen监听函数

listen接受两个参数，第一个是要连接到的直播间号，第二个是钩子函数对象，其类型MessageHandler可从包里导出

在连接成功后一旦触发对应事件（具体事件见下文），便触发回调

```typescript
const handler:MessageHandler
listen(510,handler)
```

值得注意的是，可以获取listen产生的实例，但需要异步获取

```typescript
const live = await listen(510,handler)
```

listen产生的实例的具体用途如下

```typescript
// 获取实例对应的房间号（长号，即真实房间号）
console.log(live.roomId)
// 获取实例对应的短号（没有则为0）
console.log(live.shortRoomId)
// 获取实时人气
console.log(await live.getPopularity())
// 主动关闭连接
live.close()
```

## handler

### 总览

| 钩子函数          | 触发时机                                                   |
| ----------------- | ---------------------------------------------------------- |
| onOpen            | 连接开启触发，早于onStartListen                            |
| onClose           | 连接关闭触发                                               |
| onStartListen     | 开始监听直播间时触发，晚于onOpen                           |
| onPopularity      | 收到服务器人气值心跳包时触发，触发频率约30s                |
| onDanmu           | 收到弹幕时触发                                             |
| onGuardBuy        | 新增上舰时触发                                             |
| onSuperChat       | 收到醒目留言时触发                                         |
| onGift            | 收到礼物时触发                                             |
| onWatchedChange   | xx人看过，人数变化时触发，有内置cd                         |
| onRankCountChange | 高能榜人数变化时触发，有内置cd                             |
| onLikeCountChange | 点赞数变化时触发，有内置cd                                 |
| onNotice          | 收到全站广播时触发                                         |
| onFansCount       | 粉丝数、粉丝团人数变化时触发，有内置cd                     |
| onHotRankChange   | 热门榜单排名变化时触发，有内置cd                           |
| onLiveStart       | 主播开播时触发                                             |
| onLiveEnd         | 主播下播时触发                                             |
| onInteract        | 普通用户直播间互动时触发（进入、关注、分享直播间）         |
| onEntryEffect     | 特殊用户进入直播间时触发（舰长、提督、总督或其他高贵用户） |
| onRoomChange      | 直播间信息变更时触发                                       |

### Message

所有钩子函数的形参类型均为Message（可从包内导出）

Message定义如下，泛型T可取遍下文中介绍的所有钩子函数对应的消息主体类型

```typescript
interface Message<T> {
  // 消息ID
  id: string
  // 消息时间戳
  timestamp: number
  // 消息类型
  type: string
  // 消息主体
  body: T
}
```

举个栗子，下面代码代表的是弹幕回调函数对应的形参

```typescript
const message:Message<DanmuMessage> = {}

// 等价于
const message:{
  id: string
  timestamp: number
  type: string
  body: DanmuMessage
} = {}
```

### onPopularity

收到服务器人气值心跳包时触发，触发频率约30s

```typescript
// 消息主体类型
export interface PopularityMessage {
  // 人气值
  popularity: number
}
```

### onDanmu

收到弹幕时触发

```typescript
// 消息主体类型
export interface DanmuMessage {
  user: User
  // 弹幕内容
  content: string
  // 时间戳
  timestamp: number
  // 是否为天选抽奖弹幕
  lottery: boolean
  // 弹幕表情
  emoticon?: {
    id: number
    height: number
    width: number
    url: string
  }
}
```

其中User类型是包内置的用户信息类型，定义如下

```typescript
export interface User {
  // 用户uid
  uid: number
  // 用户名称
  uname: string
  // 牌子
  badge?: {
    // 牌子名称（如阿梓粉丝牌为小孩梓）
    name: string
    // 牌子等级
    level: number
    // 牌子颜色
    color: string
    // 是否点亮
    active: boolean
    // 牌子对应主播信息
    anchor: {
      // 主播uid
      uid: number
      // 主播名称
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
    // 是否为本房管
    room_admin: boolean
  }
}

export enum GuardLevel {
  // 白板
  None,
  // 总督
  ZongDu,
  // 提督
  TiDu,
  // 舰长
  JianZhang
}
```

### onGuardBuy

新增上舰时触发

```typescript
// 消息主体类型
export interface GuardBuyMessage {
  // 上舰用户的用户信息
  user: User
  // 礼物id
  gift_id: number
  // 礼物名称
  gift_name: string
  // 大航海等级
  guard_level: GuardLevel
  // 价格
  price: number
  // 生效时间
  start_time: number
  // 结束时间
  end_time: number
}
```

### onSuperChat

收到醒目留言时触发

```typescript
// 消息主体类型
export interface SuperChatMessage {
  user: User
  // sc内容
  content: string
  // sc颜色
  color: string
  // 价格
  price: number
  // 持续时间
  duration: number
}
```

### onGift

收到礼物时触发

```typescript
// 消息主体类型
export interface GiftMessage {
  user: User
  // 礼物id
  gift_id: number
  // 礼物名称
  gift_name: string
  // 礼物类型（金瓜子礼物或银瓜子礼物）
  coin_type: 'silver' | 'gold'
  // 礼物价格
  price: number
  // 礼物数量
  amount: number
  // 赠送动作（投喂等）
  action: string
  // 多人直播间指定赠送给某位主播
  send_master?: {
    uid: number
    uname: string
    room_id: number
  }
  // 礼物连击
  combo?: {
    // 连击id
    batch_id: string
    // 当前连击数
    combo_num: number
    // 连击总价
    total_price: number
  }
}
```

### onWatchedChange

看过人数变化时触发

```typescript
// 消息主体类型
export interface WatchedChangeMessage {
  // 看过（具体数值）
  num: number
  // 看过（格式化输出，如 3.2万人看过 ）
  text: string
}
```

### onRankCountChange

高能榜人数变化时触发

```typescript
// 消息主体类型
export interface RankCountChangeMessage {
  // 高能榜人数
  count: number
}
```

### onLikeCountChange

点赞量变化时触发

```typescript
// 消息主体类型
export interface LikeCountChangeMessage {
  // 点赞量
  count: number
}
```

### onNotice

收到全站广播时触发

```typescript
// 消息主体类型
export interface NoticeMessage {
  // 广播ID
  id: number
  // 广播名称（类型）
  name: string
  // 广播内容
  content: string
  // 广播内容发生的直播间
  target_id: number
  // 是否为本直播间
  is_same_room: boolean
}
```

### onFansCount

粉丝数、粉丝团人数改变时触发

```typescript
// 消息主体类型
export interface FansCountMessage {
  // 粉丝数
  fans: number
  // 粉丝团人数
  fans_club: number
}
```

### onHotRankChange

直播间热门排名改变时触发

```typescript
// 消息主体类型
export interface HotRankChangeMessage {
  // 热门分类
  rank_name: string
  // 分类描述
  rank_description: string
  // 排名
  rank: number
}
```

### onLiveStart

开播时触发

```typescript
// 消息主体类型
export interface LiveStartMessage {
  // 房间号
  room_id: number
  // 开播平台
  live_platform: string
}
```

### onLiveEnd

下播时触发

```typescript
// 消息主体类型
export interface LiveEndMessage {
  // 房间号
  room_id: number
}
```

### onInteract

普通用户直播间互动（进入、关注、分享直播间）时触发

```typescript
// 消息主体类型
export interface InteractMessage {
  // 用户信息
  user: User
  // 互动类型
  interact_type: InteractType
}

export enum InteractType {
  // 进入直播间
  Enter = 1,
  // 关注、订阅
  Follow,
  // 分享直播间
  Share
}
```

### onEntryEffect

特殊用户进入直播间（舰长等）时触发

```typescript
// 消息主体类型
export interface EntryEffectMessage {
  // 用户信息
  user: User
  // 提示文案
  copy_writing: string
}
```

### onRoomChange

直播间信息改变时触发

```typescript
// 消息主体类型
export interface RoomChangeMessage {
  // 直播间标题
  title: string
  // 二级分区id
  area_id: number
  // 二级分区名
  area_name: string
  // 一级分区id
  parent_area_id: number
  // 一级分区名
  parent_area_name: string
}
```

## 参考资料

https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md