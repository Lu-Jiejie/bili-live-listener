import { getLongRoomId, KeepLiveTCP } from 'tiny-bilibili-ws'

const roomId = 80397

const live = new KeepLiveTCP(roomId)

live.on('Notice', ({ data }) => {
  console.log(data)
})
