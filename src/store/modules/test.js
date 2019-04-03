const VUEX_TEST = 'VUEX_TEST'

export default {
  state: {
    num: 0,
    name: 'qqq'
  },

  mutations: {
    [VUEX_TEST](state, data) {
      state.name = 'wqs',
        state.num = 233
    }
  },

  actions: {
    updateValue({ commit }) {
      commit(VUEX_TEST, {});
    }
  },

  getters: {
    num: state => state.num,
    name: state => state.name,
    getState: (state) => (key) =>{
      return state[key]
    }
  }
}