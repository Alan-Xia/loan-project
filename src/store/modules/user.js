import {setToken,getToken,removeToken} from '@/util/cookie'
import {login,userInfo,logout} from '@/plugins/api'
let user = {
  state: {
    token: getToken(),
    address: 'http://47.96.117.121:5003',
    roles: []
  },
  mutations:{
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_ROLES (state,roles) {
      state.roles = roles
    }
  },
  actions:{
    Login ({commit},userInfo) {
      const { account, password } = userInfo
      return new Promise((resolve,reject) => {
        login({account,password}).then(res => {
          console.log(res)
          if (res.code == '20000') {
            const token = res.data.token
            setToken(token)
            commit('SET_TOKEN',token)
            resolve(token)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo ({commit,state}) {
      return new Promise((resolve,reject) =>{
        userInfo(state.token).then(res =>{
          const data = res.data
          if (!data) {
            reject('获取信息失败')
          }
          commit('SET_ROLES', data.roles)
          resolve(data)
        })
      }).catch(error => {
        reject(error)
      })
    },
    Logout ({commit,state}) {
      return new Promise((resolve,reject) =>{
        logout(state.token).then(() =>{
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(err =>{
          reject(err)
        })
      })
    }
  },
  getters:{
    token: state => state.token,
    roles: state => state.token,
    address: state => state.address
  }
}

export default user