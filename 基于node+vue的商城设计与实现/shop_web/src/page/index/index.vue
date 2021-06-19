<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>


    <!-- 底部导航 -->
    <!-- 
      active-color当前选中的颜色
      inactive-color为选中的颜色
      route是否开启路由模式
     -->
    <van-tabbar v-model="active" route active-color="red" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/index/home">首页</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" to="/index/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/index/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/index/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active:0
      }
    },
    methods: {},
    components: {},
    mounted() {},
    destroyed() {},
  }

</script>
<style>
</style>
