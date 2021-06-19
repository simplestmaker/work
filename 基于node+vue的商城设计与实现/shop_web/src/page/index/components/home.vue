<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navBar" :title="$route.meta.name"/>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="1500" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img :src="$imgUrl + item.img">
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格展示 -->
    <van-grid :border="true" :column-num="4">
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        <span>限时抢购</span>
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
        <span>积分商城</span>
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        <span>联系我们</span>
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        <span>商品分类</span>
      </van-grid-item>
    </van-grid>
    <!-- 商品展示 -->
    <van-tabs type="card">
      <van-tab title="是否热卖">
        <van-card v-for="item in hotList" :key="item.id" :price="item.price" :title="item.goodsname"
          :thumb="$imgUrl + item.img" />
      </van-tab>
      <van-tab title="是否新品">
        <van-card v-for="item in newList" :key="item.id" :price="item.price" :title="item.goodsname"
          :thumb="$imgUrl + item.img" />
      </van-tab>
      <van-tab title="推荐商品">
        <van-card v-for="item in pickList" :key="item.id" :price="item.price" :title="item.goodsname"
          :thumb="$imgUrl + item.img" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  import axios from 'axios'
  import {
    banner,
    indexGoods
  } from "../../../utils/request"
  export default {
    data() {
      return {
        // 用于渲染轮播图
        bannerList: [],
        // 用于是否热卖
        hotList: [],
        // 用于是否新品
        newList: [],
        // 用于推荐商品
        pickList: []
      }
    },
    methods: {},
    components: {},
    mounted() {
      
      axios.all([banner(), indexGoods()]).then(axios.spread((res1, res2) => {
        if (res1.data.code == 200) {
          this.bannerList = res1.data.list
        }
        if (res2.data.code == 200) {
          this.hotList = res2.data.list[0].content
          this.newList = res2.data.list[1].content
          this.pickList = res2.data.list[2].content
        }
      }))
    },
    destroyed() {},
  }

</script>
<style scoped>
  .my-swipe img {
    width: 100%;
    height: 1.8rem;
  }

</style>
