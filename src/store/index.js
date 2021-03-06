import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
Vue.use(Vuex)

let store = new Vuex.Store({
  modules:{
    user,
    permission
  }
})

export default store