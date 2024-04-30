import type { EventInfo } from '../types/event'
import type { Message, User } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface EntryEffectData {
  /** 用户信息 */
  user: User
  /** 入场特效文本内容 */
  content: string
  /** 时间戳 */
  timestamp: number
}

function dataProcessor(rawData: any): Message<EntryEffectData> {
  const { data } = rawData
  const { medal } = data.uinfo
  const newData: EntryEffectData = {
    user: {
      uid: data.uid,
      uname: data.uinfo.base.name,
      face: data.face,
      fansMedal: medal && medal.name
        ? {
            name: medal.name,
            level: medal.level,
            guardType: medal.guard_level,
            color: {
              original: medal.color,
              border: medal.color_border,
              start: medal.color_start,
              end: medal.color_end,
            },
            isLighted: medal.is_light,
            anchor: {
              uid: medal.ruid,
              uname: '',
              roomId: 0,
            },
          }
        : undefined,
      guardType: data.uinfo.guard.level,
    },
    content: data.copy_writting,
    timestamp: Math.round(data.trigger_time / 1000),
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const EntryEffectEvent: EventInfo<EntryEffectData> = {
  cmdName: 'ENTRY_EFFECT',
  handlerName: 'onEntryEffect',
  dataProcessor,
}
