import type { CommonEventInfo } from '../types/event'

export const OpenEvent: CommonEventInfo = {
  cmdName: 'open',
  handlerName: 'onOpen',
  dataProcessor: () => {}
}

export const LiveEvent: CommonEventInfo = {
  cmdName: 'live',
  handlerName: 'onLive',
  dataProcessor: () => {}

}

export const HeartbeatEvent: CommonEventInfo = {
  cmdName: 'heartbeat',
  handlerName: 'onHeartbeat',
  dataProcessor: () => {}
}

export const CloseEvent: CommonEventInfo = {
  cmdName: 'close',
  handlerName: 'onClose',
  dataProcessor: () => {}
}

export const ErrorEvent: CommonEventInfo = {
  cmdName: 'error',
  handlerName: 'onError',
  dataProcessor: (data: any) => data
}
