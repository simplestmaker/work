<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navBar" :title="$route.meta.name" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- 主体内容 -->
    <div class="content">
      <!-- 左侧侧边栏 -->
      <div>
        <van-sidebar v-model="activeKey" @change="onchange" class="left">
          <van-sidebar-item v-for="item in firstList" :key="item.id" :title="item.catename" />
        </van-sidebar>
      </div>
      <!-- 右侧 -->
      <div>
        <van-grid :gutter="6" :column-num="3" class="right">
          <van-grid-item v-for="item in secondList" :key="item.id" :icon="$imgUrl + item.img" :text="item.catename"
            @click="goSortDetail(item.id)" />
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    goodsSort
  } from "../../../utils/request"
  export default {
    data() {
      return {
        activeKey: 0,
        // 用于渲染一级分类
        firstList: [],
        // 用于渲染二级分类
        secondList: []
      }
    },
    methods: {
      // 当一级导航发生变化
      onchange(e) {
        this.secondList = this.firstList[e].children
      },
      // 跳转到分类详情
      goSortDetail(id) {
        this.$router.push("/sortDetail?fid=" + id)
      }
    },
    components: {},
    mounted() {
      goodsSort().then(res => {
        if (res.data.code == 200) {
          this.firstList = res.data.list
          this.secondList = res.data.list[this.activeKey].children
        }
      })
    },
    destroyed() {},
  }

</script>
<style scoped>
  /* .left {
    float: left;
  }

  .right {
    float: left;
  } */

  .content {
    display: flex;
  }

</style>
