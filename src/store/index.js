import Vue from 'vue'
import Vuex from 'vuex'
import {getToken} from '@/util/cookie'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: getToken() || '',
    address: 'http://47.96.117.121:5003/api/'
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  },
  getters: {
    isLogin: state => {
      return !!state.token; // 转换为布尔值
    }
  }
})

export default store