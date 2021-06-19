<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navBar" :title="$route.meta.name" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- 主体内容部分 -->
    <!-- 未登录 -->
    <div v-if="!userInfo.token">
      <van-empty image="search" description="您还未登录，请先登录" />
      <van-button class="goLoginBtn" type="info" @click="$router.push('/login')">去登陆</van-button>
    </div>
    <!-- 已登录 -->
    <div v-else>
      <!-- 已经登录，但是购物车空空如也 -->
      <div v-if="!cartsList">
        <van-empty image="error" description="暂无数据，快去买买买" />
      </div>
      <!-- 已经登录，有数据就展示列表 -->
      <div v-else>
        <div class="goodInfo" v-for="item in cartsList" :key="item.id">
          <van-checkbox v-model="item.isTrue" @click="changeOne" checked-color="#ee0a24"></van-checkbox>
          <van-swipe-cell class="goodInfoRight">
            <van-card :num="item.num" :price="item.price" :title="item.goodsname" class="goods-card"
              :thumb="$imgUrl + item.img">
              <template #bottom>
                <van-stepper v-model="item.num" @plus="add(item.id)" @minus="pre(item.id)" />
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="goodDel(item.id)" />
            </template>
          </van-swipe-cell>
        </div>
        <van-submit-bar :price="priceAll" button-text="提交订单">
          <van-checkbox v-model="checkAll" @click="changeAll">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    cartList,
    cartEdit,
    cartDel
  } from "../../../utils/request";
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        // 用户登录的信息
        userInfo: {},
        // 用来渲染列表的
        cartsList: [],
        // 全选
        checkAll: false
      }
    },
    methods: {
      // 增加
      add(id) {
        cartEdit({
          id: id,
          type: 2
        })
      },
      // 减少
      pre(id) {
        cartEdit({
          id: id,
          type: 1
        })
      },
      // 点击某一条的复选框
      changeOne() {
        this.checkAll = this.cartsList.every(item => item.isTrue)
      },
      // 点击全选按钮
      changeAll() {
        this.cartsList.forEach(item => {
          item.isTrue = this.checkAll
        })
      },
      // 点击删除
      goodDel(id) {
        cartDel({
          id: id
        }).then(res => {
          if (res.data.code == 200) {
            Toast.success(res.data.msg)
            //  重新请求列表数据
            this.list()
          } else {
            Toast.fail(res.data.msg)
          }
        })
      },
      // 请求列表数据
      list() {
        cartList(this.userInfo.uid).then(res => {
          if (res.data.code == 200) {
            let list = res.data.list
            if (list) {
              list.map(item => {
                return item.isTrue = false
              })
            }
            this.cartsList = list
          }
        })
      }
    },
    computed: {
      // 总价
      priceAll() {
        // 默认总价为0
        let sum = 0
        this.cartsList.forEach(item => {
          if (item.isTrue) {
            sum += item.price * item.num
          }
        })
        return sum * 100
      }
    },
    components: {},
    mounted() {
      this.userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}

      // 请求列表数据
      this.list()
    },
    destroyed() {},
  }

</script>
<style scoped>
  .goLoginBtn {
    display: block;
    margin: 0 auto;
  }

  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }

  .goodInfo {
    display: flex;
  }

  .goodInfoRight {
    flex: 1;
  }

</style>
