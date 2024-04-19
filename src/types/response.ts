export interface MobileRoomInitResponse {
  code: number
  msg: string
  message: string
  data: {
    room_id: number
    short_id: number
    uid: number
  }
}

export interface DanmuInfoResponse {
  code: number
  message: string
  ttl: number
  data: {
    group: string
    business_id: number
    refresh_row_factor: number
    refresh_rate: number
    max_delay: number
    token: string
    host_list: {
      host: string
      port: number
      wss_port: number
      ws_port: number
    }[]
  }
}

export interface NavResponse {
  code: number
  message: string
  ttl: number
  data: {
    mid: number
  }
}
