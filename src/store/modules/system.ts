import { systemType } from '../mutation-types'

const {
  SET_MARK
} = systemType

export default {
  state: {
    mark: '1'
  },
  mutations: {
    [SET_MARK](state, payload) {
      state.mark = payload.mark
    }
  }
}

