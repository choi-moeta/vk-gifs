import { MutationTree } from 'vuex'
import { Gif, State, User } from './state'

export enum MutationType {
  clearAll = 'clearAll',
  setUser = 'set_user',
  removeUser = 'remove_user',
  setGifs = 'set_gifs',
  pushGifs = 'push_gifs',
  setGifsCount = 'set_gifs_count',
  setGifsOffset = 'set_gifs_offset',
  incGifsOffset = 'inc_gifs_offset',
  setSettingsColumnWidth = 'set_settings_column_width',
  setSettingsFirstBatchCount = 'set_settings_first_batch_count',
  setSettingsFetchCount = 'set_settings_fetch_count',
  setSettingsColumnsCount = 'setSettingsColumnsCount',
}

export type Mutations = {
  [MutationType.clearAll](state: State): void;
  [MutationType.setUser](state: State, user: User): void;
  [MutationType.removeUser](state: State): void;
  [MutationType.setGifs](state: State, gifs: Gif[]): void;
  [MutationType.pushGifs](state: State, gifs: Gif[]): void;
  [MutationType.setGifsCount](state: State, count: number): void;
  [MutationType.setGifsOffset](state: State, offset: number): void;
  [MutationType.incGifsOffset](state: State, offset: number): void;
  [MutationType.setSettingsColumnsCount](state: State, value: number): void;
  [MutationType.setSettingsColumnWidth](state: State, value: number): void;
  [MutationType.setSettingsFirstBatchCount](state: State, value: number): void;
  [MutationType.setSettingsFetchCount](state: State, value: number): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.clearAll](state) {
    state.user = null
    state.gifs = null
    state.settings =  {
      columnsCount: 5,
      columnWidth: 300,
      firstBatchCount: 16,
      fetchCount: 32,
    }
  },
  [MutationType.setUser](state, user) {
    state.user = user
    localStorage.setItem('user.id', String(user.id))
    localStorage.setItem('user.accessToken', user.accessToken)
    localStorage.setItem('user.expiresIn', String(user.expiresIn))
  },
  [MutationType.removeUser](state) {
    state.user = null
    localStorage.removeItem('user.id')
    localStorage.removeItem('user.accessToken')
    localStorage.removeItem('user.expiresIn')
  },
  [MutationType.setGifs](state, gifs) {
    if (state.gifs) state.gifs.items = gifs
    localStorage.setItem('gifs.items', JSON.stringify(gifs))
  },
  [MutationType.pushGifs](state, gifs) {
    if (state.gifs) state.gifs.items = [ ...state.gifs.items, ...gifs]
    localStorage.setItem('gifs.items', JSON.stringify(state.gifs?.items || []))
  },
  [MutationType.setGifsCount](state, count) {
    if (state.gifs) state.gifs.count = count
    localStorage.setItem('gifs.count', String(count))
  },
  [MutationType.setGifsOffset](state, offset) {
    if (state.gifs) state.gifs.offset = offset
    localStorage.setItem('gifs.offset', String(offset))
  },
  [MutationType.incGifsOffset](state, offset) {
    if (state.gifs) state.gifs.offset = state.gifs.offset + offset
    localStorage.setItem('gifs.offset', String(state.gifs?.offset || 0))
  },
  [MutationType.setSettingsColumnsCount](state: State, value: number) {
    state.settings.columnsCount = value
    localStorage.setItem('settings.columnsCount', String(value))
  },
  [MutationType.setSettingsColumnWidth](state: State, value: number) {
    state.settings.columnWidth = value
    localStorage.setItem('settings.columnWidth', String(value))
  },
  [MutationType.setSettingsFirstBatchCount](state: State, value: number) {
    state.settings.firstBatchCount = value
    localStorage.setItem('settings.firstBatchCount', String(value))
  },
  [MutationType.setSettingsFetchCount](state: State, value: number) {
    state.settings.fetchCount = value
    localStorage.setItem('settings.fetchCount', String(value))
  },
}
