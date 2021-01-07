import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      name:"游客"
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
