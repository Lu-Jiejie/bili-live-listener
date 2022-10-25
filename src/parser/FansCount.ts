import { Message } from '../type'

export interface FansCountMessage {
  // 粉丝数
  fans: number
  // 粉丝团人数
  fans_club: number
}

const parser = (data: any): FansCountMessage => {
  const rawData = data.data

  return {
    fans: rawData.fans,
    fans_club: rawData.fans_club
  }
}

export interface FansCountHandler {
  onFansCount: (message: Message<FansCountMessage>) => void
}

export const FansCount = {
  parser,
  eventName: 'ROOM_REAL_TIME_MESSAGE_UPDATE',
  handlerName: 'onFansCount'
} as const
