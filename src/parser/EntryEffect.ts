import type { Message, User } from '../type'

export interface EntryEffectMessage {
  user: User
  // 提示文案
  copy_writing: string
}

const parser = (data: any): EntryEffectMessage => {
  const rawData = data.data

  return {
    user: {
      uid: rawData.uid,
      uname: rawData.copy_writing.match(/<%(.*)%>/)[1],
      identity: {
        rank: 0,
        guard_level: rawData.privilege_type,
        room_admin: false
      }
    },
    copy_writing: rawData.copy_writing
  }
}

export interface EntryEffectHandler {
  onEntryEffect: (message: Message<EntryEffectMessage>) => void
}

export const EntryEffect = {
  parser,
  eventName: 'ENTRY_EFFECT',
  handlerName: 'onEntryEffect'
} as const
