import { fetchGifs } from '/@/api/index.ts'
import { normalizeGifs } from '/@/utils'
import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { Gif, State, User } from './state'

export enum ActionTypes {
  auth = 'auth',
  logout = 'logout',
  fetchGifsFirstBatch = 'fetch_gifs_first_batch',
  fetchGifs = 'fetch_gifs',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}

export type Actions = {
  [ActionTypes.auth](context: ActionAugments, user: User): void;
  [ActionTypes.logout](context: ActionAugments): void;
  [ActionTypes.fetchGifsFirstBatch](context: ActionAugments): void;
  [ActionTypes.fetchGifs](context: ActionAugments): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.auth]({ commit }, user: User) {
    commit(MutationType.setUser, user)
  },
  async [ActionTypes.logout]({ commit }) {
    commit(MutationType.clearAll)
  },
  async [ActionTypes.fetchGifsFirstBatch]({ state, commit }) {
    if (state.gifs?.offset != 0) return;

    const response = await fetchGifs(state.settings.firstBatchCount, 0)
    if (!response) return;

    const { count, items } = response
    const gifs = normalizeGifs(items)

    commit(MutationType.setGifs, gifs)
    commit(MutationType.setGifsCount, count)
    commit(MutationType.setGifsOffset, state.settings.firstBatchCount)
  },
  async [ActionTypes.fetchGifs]({ state, commit }) {
    const response = await fetchGifs(state.settings.fetchCount, state.gifs?.offset || 0)
    if (!response) return;

    const { items } = response
    const gifs = normalizeGifs(items)

    commit(MutationType.pushGifs, gifs)
    commit(MutationType.incGifsOffset, state.settings.fetchCount)
  }
}
