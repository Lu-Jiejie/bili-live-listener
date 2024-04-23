import type { DanmuInfoResponse, MobileRoomInitResponse, NavResponse } from '../types/response'

export function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(url, options).then(res => res.json()) as Promise<T>
}

export async function getRoomId(roomid: number) {
  const { data: {
    room_id: longRoomId,
    short_id: shortRoomId
  }
  } = await request<MobileRoomInitResponse>(`https://api.live.bilibili.com/room/v1/Room/mobileRoomInit?id=${roomid}`)

  return { longRoomId, shortRoomId }
}

export async function getRoomConf(roomid: number, cookie: string) {
  const {
    data: {
      token: key
    }
  } = await request<DanmuInfoResponse>(`https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${roomid}`, { headers: { cookie } })

  return { key }
}

export async function getLoginedUid(cookie: string) {
  const {
    data: {
      mid: uid
    }
  } = await request<NavResponse>('https://api.bilibili.com/x/web-interface/nav', { headers: { cookie } })

  return uid
}
