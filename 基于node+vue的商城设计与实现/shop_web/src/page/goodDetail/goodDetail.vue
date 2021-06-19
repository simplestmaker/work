<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navBar" :title="$route.meta.name" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- 主体内容 -->
    <div>
      <img :src="$imgUrl + info.img" alt="">
      <span>名称：{{info.goodsname}}</span>
      <span>￥：{{info.price}}</span>
      <div>
        <span>购买数量：</span>
        <van-stepper v-model="obj.num" />
      </div>
      <div>
        <span>商品详情</span>
        <!-- 第一种方法：v-html -->
        <!-- <div v-html="info.description"></div> -->
        <!-- 第二种方法：ref -->
        <div ref="aaa"></div>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" @click="goCart" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
  import {
    goodDetail,
    cartAdd
  } from "../../utils/request"
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        info: {},
        // 点击添加的时候发送给后端的
        obj: {
          uid: '',
          goodsid: '',
          num: 1
        }
      }
    },
    methods: {
      // 点击添加购物车
      goCart() {
        // 先判断用户是否登录过，如果没登录过那么就直接跳到登录页，如果登录过就跳到购物车页
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        this.obj.uid = userInfo.uid
        if (userInfo.token) {
          // 表示登陆过
          cartAdd(this.obj).then(res => {
            if (res.data.code == 200) {
              Toast.success(res.data.msg)
              this.$router.push('/index/cart')
            } else {
              Toast.fail(res.data.msg)
            }
          })
        } else {
          // 表示没登陆过
          Toast.fail("请您先登录")
          this.$router.push('/login')
        }
      }
    },
    components: {},
    mounted() {
      goodDetail(this.$route.query.id).then(res => {
        if (res.data.code == 200) {
          this.info = res.data.list[0]
          this.obj.goodsid = this.info.id
          // 渲染商品详情
          this.$refs.aaa.innerHTML = this.info.description
        }
      })
    },
    destroyed() {},
  }

</script>
<style scoped>
  span {
    display: block;
  }

  img {
    width: 100%;
    height: 2.5rem;
  }

</style>
