import { errorLogType } from '../mutation-types'

const { ADD_ERROR_LOG } = errorLogType

export default {
  state: {
    logs: []
  },
  mutations: {
    [ADD_ERROR_LOG](state, payload) {
      state.logs.push(payload.log)
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit({
        type: 'ADD_ERROR_LOG',
        log: log
      })
    }
  }
}
