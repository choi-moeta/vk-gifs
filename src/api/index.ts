import store from '/@/store'
import { jsonp } from '/@/utils'

export type ResponseVK = {
  count: number,
  items: [{
    date: number,
    ext: string, // 'gif'
    id: number,
    owner_id: number,
    preview: {
      photo: {
        sizes: [{
          height: number,
          width: number,
          src: string,
          type: string, // m s x y o i d
        }]
      },
      video: {
        file_size: number,
        height: number,
        width: number,
        src: string,
      },
    }
    size: number,
    title: string,
    type: number,
    url: string,
  }]
}

export const fetchGifs = (count = 2000, offset = 0) => {
  const user = store.state.user
  if (!user) {
    return null
  }
  const link = `https://api.vk.com/method/docs.get?count=${count}&v=5.52&type=3&owner_id=${user.id}&access_token=${user.accessToken}&offset=${offset}`
  return jsonp(link).then((r: any) => r.response) as Promise<ResponseVK>
}
