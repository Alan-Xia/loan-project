import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/LayoutPage/LayoutPage.vue'
import {getToken} from '@/util/cookie'

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue'),
      meta: {
        isLogin: false,
        title: '登录'
      }
    },
    {
      path: '/',
      component: Layout,
      redirect:'/index',
      meta:{
        isLogin: true
      },
      children:[
        {
          path: 'index',
          name: 'home',
          component: () => import('@/views/HomePage/HomePage.vue'),
          meta:{
            isLogin: true,
            title: '首页'
          }
        }
      ]
    },
    {
      path: '/loan/req',
      component: Layout,
      redirect:'/loan/req/index',
      meta:{
        isLogin: true
      },
      children:[
        {
          path: 'index',
          name: 'loan',
          component: () => import('@/views/LoanPage/LoanPage.vue'),
          meta:{
            isLogin: true,
            title: '贷款申请'
          }
        }
      ]
    },
    {
      path: '/loan/manager',
      component: Layout,
      redirect:'/loan/manager/index',
      meta:{
        isLogin: true
      },
      children:[
        {
          path: 'index',
          name: 'apply',
          component: () => import('@/views/ApplyPage/ApplyPage.vue'),
          meta:{
            isLogin: true,
            title: '申请管理'
          }
        }
      ]
    },
    {
      path: '/approve',
      component: Layout,
      redirect:'/approve/first',
      meta:{
        title: '贷款审批',
        isLogin: true
      },
      children:[
        {
          path: 'first',
          name: 'fristCareFul',
          component: () => import('@/views/ContactPage/fristCareFul.vue'),
          meta:{
            isLogin: true,
            title: '初审'
          }
        },
        {
          path: 'end',
          name: 'endCareFul',
          component: () => import('@/views/ContactPage/endCareFul.vue'),
          meta:{
            isLogin: true,
            title: '终审'
          }
        }
      ]
    },
    {
      path: '/contract/manager',
      component: Layout,
      redirect:'/contract/manager/index',
      meta:{
        isLogin: true
      },
      children:[
        {
          path: 'index',
          name: 'subject',
          component: () => import('@/views/SubjectPage/index.vue'),
          meta:{
            isLogin: true,
            title: '标的管理'
          }
        }
      ]
    },
    {
      path: '/jurisdiction',
      component: Layout,
      redirect:'/jurisdiction/create',
      meta:{
        title: '权限管理',
        isLogin: true
      },
      children:[
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/Jurisdiction/create.vue'),
          meta:{
            isLogin: true,
            title: '创建管理员'
          }
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('@/views/Jurisdiction/list.vue'),
          meta:{
            isLogin: true,
            title: '列表展示'
          }
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/NoFound/NoFound.vue'),
      meta: {
        isLogin: false,
        title: '404'
      }
      
    }
  ]
})

// 路由守卫
router.beforeEach ((to, form , next) => {
  if (to.meta.isLogin) {
    if (getToken()) {
      next()
    } else {
      next ({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
    next()
  }
})

//修改页面title
router.afterEach((to,form) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  } else {
    window.document.title = '贷款项目'
  }
})


export default router
