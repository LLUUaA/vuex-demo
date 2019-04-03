import vue from 'vue'
import vuex from 'vuex'
import test from './modules/test'

vue.use(vuex);
const store = new vuex.Store({
  state:{},
  mutations:{},
  modules:{
    test
  }
})

export default store;