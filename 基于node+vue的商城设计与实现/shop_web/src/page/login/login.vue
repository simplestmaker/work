<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navBar" title="登录" left-text="返回" right-text="注册" left-arrow @click-left="$router.back()"
      @click-right="$router.push('/register')" />
    <!-- 主体内容 -->
    <van-form @submit="onSubmit">
      <van-field v-model="obj.phone" name="手机号" label="手机号" placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="obj.password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import {login} from "../../utils/request"
import { Toast } from 'vant';
  export default {
    data() {
      return {
        obj:{
          phone:'',
          password:''
        }
      }
    },
    methods: {
      // 点击提交后
      onSubmit(){
        login(this.obj).then(res=>{
          if(res.data.code == 200){
            Toast.success(res.data.msg)
            sessionStorage.setItem("userInfo",JSON.stringify(res.data.list))
            this.$router.push('/index/mine')
          }else{
            Toast.fail(res.data.msg)
          }
        })
      }
    },
    components: {},
    mounted() {},
    destroyed() {},
  }

</script>
<style>
</style>
