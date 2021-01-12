import { Gif } from '/@/store/state';
import { ResponseVK } from './../api/index';
interface Params {
  [Key: string]: string;
}

export function parseParams(hash: string) {
  const pairs = hash.slice(1).split('&').map(str => str.split('='))
  const params: Params = {}
  for (const [key, value] of pairs) {
    params[key] = value
  }

  return params
}

export function jsonp(url: string) {
  return new Promise((resolve, reject) => {
    let cbName = 'json_callback'
    let timeout = 10000

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url + `&callback=${cbName}`;

    const _window: any = window
    _window[cbName] = function (e: any) {
      script.remove()
      resolve(e)
    }

    setTimeout(() => {
      script.remove()
      reject('timeout')
    }, timeout)

    document.getElementsByTagName('head')[0].appendChild(script);
  })
}

export function normalizeGifs(items: ResponseVK["items"]) {
  return items.map(item => ({
    photo: item.preview.photo.sizes.pop()?.src,
    video: item.preview.video?.src,
    gif: item.url,
    ratio: item.preview.video ? item.preview.video.height / item.preview.video.width : 0.5,
    title: item.title,
  } as Gif))
}

