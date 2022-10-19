import type { SuperChatMsg } from '../app'

export default (data): SuperChatMsg => {
  const {
    uid,
    user_info: { uname },
    message,
    price,
    medal_info: { medal_name, medal_level },
    time
  } = data.data
  return {
    user: {
      uid,
      uname: uname,
      badge: {
        name: medal_name,
        level: medal_level
      }
    },
    content: message,
    price,
    time
  }
}
