import { GetterTree } from 'vuex'
import { State, User } from './state'

export type Getters = {
  isAuthorized(state: State): boolean;
}

export const getters: GetterTree<State, State> & Getters = {
  isAuthorized(state) {
    return !!state.user?.accessToken
  },
}
