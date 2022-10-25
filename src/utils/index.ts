import { Message } from '../type'

export const int2Color = (int: number): string => {
  const hex = int.toString(16)
  return hex.length == 5 ? `#0${hex}` : `#${hex}`
}

export const randomText = (length: number): string => {
  return Math.random()
    .toString()
    .slice(2, 2 + length)
}

export const normalizeMessage = <T>(type: string, body: T): Message<T> => {
  const timestamp = Date.now()
  const hex = randomText(4)
  // id构成：时间戳:消息类型:随机hex
  const id = `${timestamp}:${type}:${hex}`
  return {
    id,
    timestamp,
    type,
    body
  }
}
