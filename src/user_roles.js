import router from './router'
import store from './store'
import { Message } from 'element-ui'

router.beforeEach(async(to, from ,next) => {
  if (to.path == '/') {
    next()
  } else {
    let result = store.getters.roles && store.getters.roles.length > 0
    if (result) {
      next()
    } else {
      try {
        const { roles } = await store.dispatch('GetInfo')
        let rolename = roles.map(r => r.name)
        store.commit('SET_NAME',...rolename)
        const accessRoutes = await store.dispatch('GenerateRoutes', rolename)  //角色过滤
        router.addRoutes(accessRoutes)  //动态路由
        next({ ...to})
      } catch (error) {
        Message.error('token失效' )
        next({ path: '/' })
      }
    }
  }
})