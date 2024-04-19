import type { Message } from '../types/message'
import { normalizeMessage } from '../utils/message'

export interface TAMPLATEData {

}

function dataProcessor(rawData: any): Message<TAMPLATEData> {
  const data: TAMPLATEData = {

  }
  return normalizeMessage(rawData.cmd, data, rawData)
}

export const TAMPLATEEvent = {
  cmdName: 'TAMPLATE',
  handlerName: 'onTAMPLATE',
  dataProcessor
}
