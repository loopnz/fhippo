// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from './axios/index'
import moment from "moment";
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment;

import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'

import App from './App.vue'
import router from './router'
import store from './vuex'
import i18n from './i18n/i18n'

Vue.config.productionTip = false
Vue.use(ElementUI)

//  获取角色信息，根据用户权限动态加载路由
router.beforeEach((to, from, next) => {
  if (store.getters.token && store.getters.token !== 'undefined') {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.info) {
        !(async function getAddRouters() {
          axios
            .get('/operator/getOperator')
            .then(async function(response) {
              await store.dispatch('getInfo', response.data)
              await store.dispatch(
                'newRoutes',
                store.getters.info.authorityRouter
              )
              await router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            })
            .catch(function(error) {
              console.log(error)
            })
        })()
      } else {
        let is404 = to.matched.some(record => {
          if (record.meta.role) {
            return store.getters.info.authorityRouter === -1
          }
        })
        if (is404) {
          next({ path: '/404' })
          return false
        }
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    next({ path: '/login' })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  components: { App }
})
