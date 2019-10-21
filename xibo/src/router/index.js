import en from '../i18n/lang/en'
import cn from '../i18n/lang/cn'
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Layout from '@/views/layout/layout'
import HomeMain from '@/views/index/mainIndex'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 不是必须加载的组件使用懒加载
const NotFound = () => import('@/page404')

Vue.use(Router)
let routeNmae = en.routeNmae
let roleNmae = cn.routeNmae
let defaultRouter = [{
    path: '/',
    redirect: '/index',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    children: []
  },
  {
    path: '/index',
    iconCls: 'fa fa-dashboard', // 图标样式class
    name: routeNmae.home,
    component: Layout,
    alone: true,
    children: [{
      path: '/index',
      iconCls: 'fa fa-dashboard', // 图标样式class
      name: '主页',
      component: HomeMain,
      children: []
    }]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true,
    children: []
  }
]

let addRouter = [{
    r_id: 100010,
    r_name: roleNmae.slideManage,
    path: '/slideManage',
    iconCls: 'el-icon-tickets',
    name: 'slideManage',
    component: () => import('@/views/layout/layout'),
    children: [{
        r_id: 100011,
        r_name: roleNmae.pathological,
        path: '/pathological',
        iconCls: 'el-icon-tickets',
        name: 'pathological',
        component: () => import('@/views/slideManage/pathologicalSlide'),
        children: []
      },

      {
        r_id: 100012,
        r_name: roleNmae.inspection,
        path: '/inspection',
        iconCls: 'el-icon-tickets',
        name: 'inspection',
        component: () => import('@/views/slideManage/inspectionSlide'),
        children: []
      },
    ]
  },
  {
    r_id: 100020,
    r_name: roleNmae.consultation,
    path: '/consultation',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'consultation',
    component: () => import('@/views/layout/layout'),
    children: [
      // {
      //   r_id: 100021,
      //   r_name: roleNmae.myConsultation,
      //   path: '/myConsultation',
      //   iconCls: 'el-icon-edit-outline', // 图标样式class
      //   name: 'myConsultation',
      //   component: () => import('@/views/consultation/myConsultation'),
      //   children: []
      // },
      // {
      //   r_id: 100022,
      //   r_name: roleNmae.consultationList,
      //   path: '/consultationList',
      //   iconCls: 'el-icon-edit-outline', // 图标样式class
      //   name: 'consultationList',
      //   component: () => import('@/views/consultation/consultationList'),
      //   children: []
      // },
      {
        r_id: 100023,
        r_name: roleNmae.inspectionConsultation,
        path: '/inspectionConsultation',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'inspectionConsultation',
        component: () => import('@/views/consultation/inspectionConsultation'),
        children: []
      },
      {
        r_id: 100024,
        r_name: roleNmae.pathologicalConsultation,
        path: '/pathologicalConsutation',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'pathologicalConsutation',
        component: () => import('@/views/consultation/pathologicalConsultation'),
        children: []
      }
    ]
  },
  {
    r_id: 100030,
    r_name: roleNmae.statistics,
    path: '/statistics',
    iconCls: 'el-icon-tickets', // 图标样式class
    name: 'statistics',
    component: () => import('@/views/layout/layout'),
    children: [{
        r_id: 100031,
        r_name: roleNmae.uploadDaily,
        path: '/uploadDaily',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'uploadDaily',
        component: () => import('@/views/statistics/uploadDaily'),
        children: []
      },
      {
        r_id: 100032,
        r_name: roleNmae.consultationDaily,
        path: '/consultationDaily',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'consultationDaily',
        component: () => import('@/views/statistics/consultationDaily'),
        children: []
      },
      {
        r_id: 100033,
        r_name: roleNmae.slideStatistics,
        path: '/slideStatistics',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'slideStatistics',
        component: () => import('@/views/statistics/slideStatistics'),
        children: []
      },
      {
        r_id: 100034,
        r_name: roleNmae.markDaily,
        path: '/markDaily',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'markDaily',
        component: () => import('@/views/statistics/markDaily'),
        children: []
      }
    ]
  },
  {
    r_id: 100000,
    r_name: roleNmae.systemManage,
    path: '/systemManage',
    iconCls: 'fa fa-universal-access', // 图标样式class
    name: 'systemManage',
    component: () => import('@/views/layout/layout'),
    children: [{
        r_id: 100001,
        r_name: roleNmae.roleManage,
        path: '/roleManage',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'roleManage',
        component: () => import('@/views/systemManage/roleManage'),
        children: []
      },
      {
        r_id: 100002,
        r_name: roleNmae.userManage,
        path: '/userManage',
        iconCls: 'el-icon-edit-outline', // 图标样式class
        name: 'userManage',
        component: () => import('@/views/systemManage/userList'),
        children: []
      },
      // {
      //   r_id: 100003,
      //   r_name: roleNmae.editUser,
      //   path: '/editUser',
      //   iconCls: 'el-icon-edit-outline', // 图标样式class
      //   name: 'editUser',
      //   component: () => import('@/views/systemManage/editUser'),
      //   children: []
      // },
      // {
      //   r_id: 100030,
      //   r_name: roleNmae.editPassword,
      //   path: '/editPassword',
      //   iconCls: 'el-icon-edit-outline', // 图标样式class
      //   name: 'editPassword',
      //   component: () => import('@/views/systemManage/editPassword'),
      //   children: []
      // }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    children: []
  }
]




export default new Router({
  mode: 'history',
  routes: defaultRouter
})
export {
  defaultRouter,
  addRouter
}
