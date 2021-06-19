<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navBar" :title="$route.meta.name" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- 主体内容 -->
    <div class="userBox">
      <!-- 需求：1如果没登录展示默认图片，如果登陆了展示马保国 -->
      <div v-if="!userInfo.token">
        <van-image round width="1rem" height="1rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div v-else>
        <van-image round width="1rem" height="1rem"
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=568366341,1799272920&fm=11&gp=0.jpg" />
        <br>
        <b>{{userInfo.nickname}}</b>
      </div>
      <!-- 需求：如果登录过了展示下面的各种列表，如果没登录过展示暂未登录 -->
      <div v-if="!userInfo.token">
        <van-empty image="network" description="暂未登录" />
        <van-button type="warning" @click="$router.push('/login')">点击去登录</van-button>
      </div>
      <div v-else class="userBoxBottom">
        <van-cell title="地址管理" icon="location-o" />
        <van-cell title="我的钱包" icon="gold-coin-o" />
        <van-cell title="我的优惠券" icon="smile-comment-o" />
        <van-cell title="我的二维码" icon="qr" />
        <van-cell title="我的小伙伴" icon="friends-o" />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userInfo: {}
      }
    },
    methods: {},
    components: {},
    mounted() {
      this.userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
    },
    destroyed() {},
  }

</script>
<style scoped>
  .userBox {
    text-align: center;
  }

  .userBox b {
    line-height: 0.4rem;
    font-size: 0.3rem;
  }
  .userBoxBottom{
    text-align: left;
  }

</style>
