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
      redirect:'/home',
      meta:{
        isLogin: true
      },
      children:[
        {
          path: 'home',
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
      path: '/loan',
      component: Layout,
      redirect:'/loan/index',
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
      path: '/apply',
      component: Layout,
      redirect:'/apply/index',
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
      path: '/contact',
      component: Layout,
      redirect:'/contact/fristCareFul',
      meta:{
        title: '贷款审批',
        isLogin: true
      },
      children:[
        {
          path: 'fristCareFul',
          name: 'fristCareFul',
          component: () => import('@/views/ContactPage/fristCareFul.vue'),
          meta:{
            isLogin: true,
            title: '初审'
          }
        },
        {
          path: 'endCareFul',
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
      path: '/subject',
      component: Layout,
      redirect:'/subject/index',
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