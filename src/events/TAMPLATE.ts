import type { EventInfo } from '../types/event'
import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface TAMPLATEData {

}

function dataProcessor(rawData: any): Message<TAMPLATEData> {
  const newData: TAMPLATEData = {

  }
  return normalizeMessage(rawData.cmd, newData, rawData)
}

export const TAMPLATEEvent: EventInfo<TAMPLATEData> = {
  cmdName: 'TAMPLATE',
  handlerName: 'onTAMPLATE',
  dataProcessor
}
