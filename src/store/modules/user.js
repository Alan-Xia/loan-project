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
    Login ({commit},user) {
      const { account, password } = user
      return new Promise((resolve,reject) => {
        login({account,password}).then(response => {
          const { data } = response;
          commit('SET_TOKEN', data.token); //mutations
          setToken(data.token); //值保存到cookie
          resolve(data.token)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo ({commit,state}) {
      return new Promise((resolve,reject) =>{
        userInfo(state.token).then(res =>{
          const {data} = res
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
        logout().then(() =>{
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(err =>{
          reject(err)
        })
      })
    }
  },
  getters:{
    token: state => state.token,
    roles: state => state.roles,
    address: state => state.address
  }
}

export default user
