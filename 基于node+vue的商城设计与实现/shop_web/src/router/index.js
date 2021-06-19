import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: "/login",
      component: () => import("../page/login/login.vue"),
      // 添加一些配置项
      meta: {
        name: "登录"
      }
    },
    {
      path: "/register",
      component: () => import("../page/register/register.vue"),
      meta: {
        name: "注册"
      }
    },
    {
      path: "/index",
      component: () => import("../page/index/index.vue"),
      children: [{
          path: "home",
          component: () => import("../page/index/components/home.vue"),
          meta: {
            name: "首页"
          }
        },
        {
          path: "sort",
          component: () => import("../page/index/components/sort.vue"),
          meta: {
            name: "分类"
          }
        },
        {
          path: "cart",
          component: () => import("../page/index/components/cart.vue"),
          meta: {
            name: "购物车"
          }
        },
        {
          path: "mine",
          component: () => import("../page/index/components/mine.vue"),
          meta: {
            name: "我的"
          }
        },
        {
          path: "",
          redirect: "home"
        }
      ]
    },
    {
      path: "/goodDetail",
      component: () => import("../page/goodDetail/goodDetail.vue"),
      meta: {
        name: "商品详情"
      }
    }, {
      path: "/sortDetail",
      component: () => import("../page/sortDetail/sortDetail.vue"),
      meta:{
        name: "商品列表"
      }
    }, {
      path: "*",
      redirect: "index"
    }
  ]
})
