import axios from 'axios'
import { Message } from 'element-ui'
import {getToken, removeToken} from './cookie'
import store from '@/store'
/**
 * 配置axios拦截器
 */

 /** 新增链接 */
const service = axios.create({
  baseURL: 'http://47.96.117.121:5003/api/', // 后端链接地址
  withCredentials: true   // 允许携带cookie
})
// http request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['token'] = getToken()
    }
    return config
},error => {
  console.log('err:' + error)
  Promise.reject(error)
})
// response(响应)拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      if (res.code == 404) {
        Message({
          message: res.message || 'api请求地址错误',
          type: 'error',
          duration: 2000
        })
      }
      if (res.code == 401) {
        Message({
          message: res.message || '服务器错误',
          type: 'error',
          duration: 2000
        })
        clearHandler()
      }
    } else {
      return res
    }
  },error => {
  console.log('err:',error)
  /* if (err.response.status === 401) { // 未授权
    clearHandler()
  }*/
  Promise.reject(error)
})

/* function clearHandler() {
  // 清空缓存
  removeToken ()
  // 跳转至登录页
  router.push({
  path: "/login",
  query: {
      redirect: router.currentRoute.path
  }
  });
} */

export default service