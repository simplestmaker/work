// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入reset.css和rem.js
import './assets/css/reset.css'
import './assets/js/rem.js'

// 引入全局组件 
import  './components/index'
// 引入全局过滤器
import './filters/index'
// 引入仓库并挂入Vue实例
import store from './store/index'
//引入ElementUI
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
