import { DanmuMsg } from '../app'

const int2Color = (int: number) => {
  const hex = int.toString(16)
  return hex.length == 1 ? `#0${hex}` : `#${hex}`
}

export default (data): DanmuMsg => {
  const content = data.info[1]
  const username = data.info[2][1]
  const badge = data.info[3].length
    ? {
        name: data.info[3][1],
        level: data.info[3][0],
        color: int2Color(data.info[3][4])
      }
    : undefined

  return {
    user: {
      uid: data.info[2][0],
      uname: username,
      badge
    },
    content
  }
}
