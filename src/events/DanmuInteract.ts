import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface DanmuInteractData {
  /** 弹幕互动类型；Vote：弹幕投票 Combo：弹幕连击 */
  type: 'Vote' | 'Combo'
  /** 弹幕互动Id */
  id: number
  /** 弹幕互动状态：进行中或结束；进行中表示该id的弹幕互动仍会更新 */
  status: 'Ongoing' | 'Ended'
  /** 弹幕投票 */
  vote?: {
    /** 投票Id */
    id: number
    /** 投票问题 */
    question: string
    /** 投票选项 */
    options: {
      /** 选项序号 */
      id: number
      /** 选项描述 */
      description: string
      /** 投票人数 */
      count: number
      /** 投票比例 */
      percent: number
    }[]
    /** 投票总数 */
    count: number
  }
  /** 弹幕连击 */
  combo?: {
    /** Id */
    id: number
    /** 内容 */
    content: string
    /** 弹幕前缀图标 */
    prefixIcon: string
    /** 引导；比如“他们都在说：” */
    guide: string
    /** 状态：进行中或结束；进行中表示该id的`弹幕连击`仍会更新 */
    status: 'Ongoing' | 'Ended'
    /** `弹幕连击`数量 */
    count: number
  }[]
}

function dataProcessorVote(rawData: any): Message<DanmuInteractData> {
  const { data: { data } } = rawData
  const newData: DanmuInteractData = {
    type: 'Vote',
    id: rawData.data.id,
    status: rawData.data.status === 5 ? 'Ended' : 'Ongoing',
    vote: {
      id: data.vote_id,
      question: data.question,
      options: data.options.map((option: any) => ({
        id: option.idx,
        description: option.desc,
        count: option.cnt,
        percent: option.percent
      })),
      count: data.cnt
    },
    combo: data.combo
      ? data.combo.map((c: any) => ({
        id: c.id,
        content: c.content,
        prefixIcon: c.prefix_icon,
        guide: c.guide,
        status: c.status === 5 ? 'Ended' : 'Ongoing',
        count: c.cnt
      }))
      : undefined
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

function dataProcessorCombo(rawData: any): Message<DanmuInteractData> {
  const { data: { data } } = rawData
  const newData: DanmuInteractData = {
    type: 'Combo',
    id: rawData.data.id,
    status: rawData.data.status === 5 ? 'Ended' : 'Ongoing',
    combo: data.combo.map((c: any) => ({
      id: c.id,
      content: c.content,
      prefixIcon: c.prefix_icon,
      guide: c.guide,
      status: c.status === 5 ? 'Ended' : 'Ongoing',
      count: c.cnt
    }))
  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

function dataProcessor(rawData: any): Message<DanmuInteractData> | undefined {
  switch (rawData.data.type) {
    case 101:
      return dataProcessorVote(rawData)
    case 102:
      return dataProcessorCombo(rawData)
    default:
      return undefined
  }
}

export const DanmuInteractEvent: EventInfo<DanmuInteractData> = {
  cmdName: 'DM_INTERACTION',
  handlerName: 'onDanmuInteract',
  dataProcessor
}
