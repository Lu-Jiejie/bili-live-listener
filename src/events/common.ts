import type { CommonEventInfo } from '../types/event'

export const OpenEvent: CommonEventInfo = {
  cmdName: 'open',
  handlerName: 'onOpen'
}

export const LiveEvent: CommonEventInfo = {
  cmdName: 'live',
  handlerName: 'onLive'

}

export const HeartbeatEvent: CommonEventInfo = {
  cmdName: 'heartbeat',
  handlerName: 'onHeartbeat'
}

export const CloseEvent: CommonEventInfo = {
  cmdName: 'close',
  handlerName: 'onClose'
}

export const ErrorEvent: CommonEventInfo = {
  cmdName: 'error',
  handlerName: 'onError'
}
