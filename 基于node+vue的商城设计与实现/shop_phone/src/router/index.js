import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

export const indexRouters = [{
  path: 'menu',
  name: '菜单管理',
  component: () => import('../page/menu/menu'),
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/menu')){
      next()
    } else {
      next('/home')
    }
  },
},
{
  path: 'banner',
  name: '轮播图管理',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/banner')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/banner/banner')
},
{
  path: 'cate',
  name: '商品分类',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/cate')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/cate/cate')
},
{
  path: 'goods',
  name: '商品管理',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/goods')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/goods/goods')
},
{
  path: 'manage',
  name: '管理员管理',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/manage')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/manage/manage')
},
{
  path: 'role',
  name: '角色管理',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/role')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/role/role')
},
{
  path: 'seckill',
  name: '秒杀活动',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/seckill')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/seckill/seckill')
},
{
  path: 'spec',
  name: '商品规格',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/spec')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/specs/specs')
},
{
  path: '/member',
  name: '会员管理',
  beforeEnter(to, from, next) {
    let routerUrl = store.state.userInfo.menus_url;
    if (routerUrl.includes('/member')){
      next()
    } else {
      next('/home')
    }
  },
  component: () => import('../page/vip/vip')
  }]


const router= new Router({
  routes: [
    {
      path: "/login",
      name: '登录',
      component: () => import("../page/login/login")
    },
    {
      path: "/",
      name: '首页',
      component: () => import("../page/index/index"),
      children: [
        {
          path: 'home',
          component: () => import('../page/home/home')
        },
        ...indexRouters
      ]
    },
    {
      path: '*',
      redirect:'/'
    }
  ]
})

//全局守卫
// 登录拦截
router.beforeEach((to, from, next) => {
  //如果去登陆页 直接进
  if (to.path === '/login') {
    next()
    return
  }
  if (store.state.userInfo.token) {
    next()
    return
  }
  next('/login')
})

export default router