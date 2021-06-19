// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入reset.css和rem.js
import "./assets/css/reset.css"
import "./assets/js/rem.js"
// 引入公共组件
import "./components/index.js"
// 引入过滤器
import "./filters/index.js"
// 引入状态层
import store from "./store/index"
// 引入vant
import VantUI from "vant"
import "vant/lib/index.css"
Vue.use(VantUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
