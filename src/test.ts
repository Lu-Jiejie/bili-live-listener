import { KeepLiveTCP, getLongRoomId } from 'tiny-bilibili-ws'

// 510 80397

// 7777 545068

// 我的直播间 4913837

const roomId = 4913837

// getLongRoomId(roomId).then(res => console.log(res))

const live = new KeepLiveTCP(roomId)

const blocklist = [
  'DANMU_MSG',
  'INTERACT_WORD',
  'LIVE_INTERACTIVE_GAME',
  'ENTRY_EFFECT',
  'ONLINE_RANK_COUNT',
  'WATCHED_CHANGE',
  'ONLINE_RANK_COUNT',
  'SEND_GIFT',
  'STOP_LIVE_ROOM_LIST',
  'LIKE_INFO_V3_UPDATE',
  'COMBO_SEND',
  'ONLINE_RANK_V2',
  'ROOM_REAL_TIME_MESSAGE_UPDATE',
  'NOTICE_MSG',
  'HOT_ROOM_NOTIFY',
  'SUPER_CHAT_ENTRANCE',
  'USER_TOAST_MSG',
  'GUARD_BUY'
]

live.on('msg', ({ data }) => {
  if (!blocklist.includes(data.cmd)) {
    console.log(JSON.stringify(data))
    console.log(' ')
  }
})

// live.on('INTERACT_WORD', ({ data }) => {
//   console.log(data)
//   console.log(' ')
// })
