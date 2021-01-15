import storage from '/@/localStorage';
import { MutationTree } from 'vuex'
import { Gif, State, User } from './state'
import * as config from '/@/config'

const storageKeys = config.storageKeys
const storeDefaults = config.store.defaults

export enum MutationType {
  removeAll = 'remove_all',
  setUser = 'set_user',
  removeUser = 'remove_user',
  setGifs = 'set_gifs',
  pushGifs = 'push_gifs',
  setGifsCount = 'set_gifs_count',
  setGifsOffset = 'set_gifs_offset',
  incGifsOffset = 'inc_gifs_offset',
  setSettingsColumnMaxWidth = 'set_settings_column_max_width',
  setSettingsColumnMinWidth = 'set_settings_column_min_width',
  setSettingsFirstFetchCount = 'set_settings_first_batch_count',
  setSettingsFetchCount = 'set_settings_fetch_count',
  setSettingsColumnCount = 'setSettingsColumnCount',
}

export type Mutations = {
  [MutationType.removeAll](state: State): void;
  [MutationType.setUser](state: State, user: User): void;
  [MutationType.removeUser](state: State): void;
  [MutationType.setGifs](state: State, gifs: Gif[]): void;
  [MutationType.pushGifs](state: State, gifs: Gif[]): void;
  [MutationType.setGifsCount](state: State, count: number): void;
  [MutationType.setGifsOffset](state: State, offset: number): void;
  [MutationType.incGifsOffset](state: State, offset: number): void;
  [MutationType.setSettingsColumnCount](state: State, value: number): void;
  [MutationType.setSettingsColumnMaxWidth](state: State, value: number): void;
  [MutationType.setSettingsColumnMinWidth](state: State, value: number): void;
  [MutationType.setSettingsFirstFetchCount](state: State, value: number): void;
  [MutationType.setSettingsFetchCount](state: State, value: number): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.removeAll](state) {
    storage.clear()
    state.user = null
    state.gifs = null
    state.settings =  {
      columnCount: storeDefaults.settings.columnCount,
      columnMinWidth: storeDefaults.settings.columnMinWidth,
      columnMaxWidth: storeDefaults.settings.columnMaxWidth,
      firstFetchCount: storeDefaults.settings.firstFetchCount,
      fetchCount: storeDefaults.settings.fetchCount,
    }
  },
  [MutationType.setUser](state, user) {
    state.user = user
    storage.set(storageKeys.user.id, user.id)
    storage.set(storageKeys.user.accessToken, user.accessToken)
    storage.set(storageKeys.user.expiresIn, user.expiresIn)
  },
  [MutationType.removeUser](state) {
    state.user = null
    storage.remove(storageKeys.user.id)
    storage.remove(storageKeys.user.accessToken)
    storage.remove(storageKeys.user.expiresIn)
  },
  [MutationType.setGifs](state, gifs) {
    if (state.gifs) {
      state.gifs.items = gifs
      storage.set(storageKeys.gifs.items, gifs)
    }
  },
  [MutationType.pushGifs](state, gifs) {
    if (state.gifs) {
      state.gifs.items = [ ...state.gifs.items, ...gifs]
      storage.set(storageKeys.gifs.items, state.gifs.items)
    }
  },
  [MutationType.setGifsCount](state, count) {
    if (state.gifs) {
      state.gifs.count = count
      storage.set(storageKeys.gifs.count, count)
    }
  },
  [MutationType.setGifsOffset](state, offset) {
    if (state.gifs) {
      state.gifs.offset = offset
      storage.set(storageKeys.gifs.offset, offset)
    }
  },
  [MutationType.incGifsOffset](state, offset) {
    if (state.gifs) {
      state.gifs.offset = state.gifs.offset + offset
      storage.set(storageKeys.gifs.offset, state.gifs.offset)
    }
  },
  [MutationType.setSettingsColumnCount](state: State, value: number) {
    state.settings.columnCount = value
    storage.set(storageKeys.settings.columnCount, value)
  },
  [MutationType.setSettingsColumnMaxWidth](state: State, value: number) {
    state.settings.columnMaxWidth = value
    storage.set(storageKeys.settings.columnMaxWidth, value)
  },
  [MutationType.setSettingsColumnMinWidth](state: State, value: number) {
    state.settings.columnMinWidth = value
    storage.set(storageKeys.settings.columnMinWidth, value)
  },
  [MutationType.setSettingsFirstFetchCount](state: State, value: number) {
    state.settings.firstFetchCount = value
    storage.set(storageKeys.settings.firstFetchCount, value)
  },
  [MutationType.setSettingsFetchCount](state: State, value: number) {
    state.settings.fetchCount = value
    storage.set(storageKeys.settings.fetchCount, value)
  },
}
