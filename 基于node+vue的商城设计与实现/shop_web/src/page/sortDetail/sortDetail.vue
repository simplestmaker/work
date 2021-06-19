<template>
  <div>
    <van-nav-bar class="navBar" :title="$route.meta.name" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-card v-for="item in info" :key="item.id" :price="item.price" :title="item.goodsname" :thumb="$imgUrl + item.img" @click="goGoodDetail(item.id)"/>
  </div>
</template>
<script>
  import {
    sortDetail
  } from "../../utils/request"
  export default {
    data() {
      return {
        // 用于渲染页面列表
        info: []
      }
    },
    methods: {
      // 点击了跳转到商品详情
      goGoodDetail(id){
        this.$router.push("/goodDetail?id="+id)
      }
    },
    components: {},
    mounted() {
      console.log(this.$route.query.fid)
      sortDetail(this.$route.query.fid).then(res => {
        if (res.data.code == 200) {
          this.info = res.data.list
        }
      })
    },
    destroyed() {},
  }

</script>
<style>
</style>
