import { KeepLiveTCP, getLongRoomId } from 'tiny-bilibili-ws'

import { type MessageHandler } from './listener'

export interface MessageListener {
  roomId: number
}

export const startListen = async (roomId: number, handler: MessageListener) => {
  // 获取长号
  const longRoomId = (await getLongRoomId(roomId)).data.room_id
  // 新建实例
  const live = new KeepLiveTCP(longRoomId)
}
