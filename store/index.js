import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import user from './modules/user'

export const strict = false

const persistedStateOptions = {
  paths: ['user', 'auth'],
}

const store = () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: { auth, user },
    plugins: [createPersistedState(persistedStateOptions)],
  })

export default store
