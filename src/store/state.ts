import storage from '/@/localStorage'
import * as config from '/@/config'

const storageKeys = config.storageKeys
const storeDefaults = config.store.defaults

export type State = {
  user: User | null,
  gifs: Gifs | null,
  settings: {
    columnCount: number,
    columnMinWidth: number,
    columnMaxWidth: number,
    firstFetchCount: number,
    fetchCount: number,
  },
}

type Gifs = {
  items: Gif[],
  count: number,
  offset: number,
}

export type Gif = {
  photo: string,
  video: string,
  gif: string,
  ratio: number,
  title: string,
}

export type User = {
  id: number,
  accessToken: string,
  expiresIn: number,
}

export const state: State = {
  user: getUser(),
  gifs: getGifs(),
  settings: getSettings(),
}

export function getUser() {
  let id = storage.getNumber(storageKeys.user.id)
  let accessToken = storage.getString(storageKeys.user.accessToken)
  let expiresIn = storage.getNumber(storageKeys.user.expiresIn)

  // я. . . гуль. . .
  // i hate ts, pretty sure that return object values can't be null
  if ([id, accessToken, expiresIn].includes(null)) {
    return null
  }
  return {
    id: id || Number(),
    accessToken: accessToken || String(),
    expiresIn: expiresIn || Number(),
  }
}

export function getGifs() {
  let items = storage.getArray(storageKeys.gifs.items)
  let count = storage.getNumber(storageKeys.gifs.count)
  let offset = storage.getNumber(storageKeys.gifs.offset)

  if ([items, count, offset].includes(null)) {
    return null
  }
  return {
    items: items || Array(),
    count: count || Number(),
    offset: offset || Number(),
  }
}

export function getSettings() {
  return {
    columnCount: storage.getNumber(storageKeys.settings.columnCount)
      || storeDefaults.settings.columnCount,
    columnMinWidth: storage.getNumber(storageKeys.settings.columnMinWidth)
      || storeDefaults.settings.columnMinWidth,
    columnMaxWidth: storage.getNumber(storageKeys.settings.columnMaxWidth)
      || storeDefaults.settings.columnMaxWidth,
    firstFetchCount: storage.getNumber(storageKeys.settings.firstFetchCount)
      || storeDefaults.settings.firstFetchCount,
    fetchCount: storage.getNumber(storageKeys.settings.fetchCount)
      || storeDefaults.settings.fetchCount,
  }
}
