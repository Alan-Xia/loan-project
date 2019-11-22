import Layout from '@/views/LayoutPage/LayoutPage.vue'
const permissionRouter = {
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
}
export default permissionRouter