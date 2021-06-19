<template>
  <div class="login">
    <div>
      <h1>{{ $route.name }}</h1>
      <el-input placeholder="请输入用户名" v-model="form.username" id="user"></el-input>
      <el-input placeholder="请输入密码" v-model="form.password" show-password id="pass" @keyup.enter.native="goIndex()"></el-input>
      <el-button type="primary" round id="sub" @click="goIndex()">登录</el-button>
    </div>
    <!-- {{userInfo}} -->
  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
import { login } from "../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      reqUserinfo: "reqUserinfo",
    }),
    //登录
    goIndex() {
      login(this.form).then((res) => {
        if (res.data.code == 200) {
          //1成功的页面
          //2本地储存
          // localStorage.setItem("user", this.userInfo.token);
          //2存入状态层
          this.reqUserinfo(res.data.list);
          successAlert(res.data.msg);
          //3跳入页面
          this.$router.push("/home");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {},
};
</script>
<style scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(skyblue, blue);
}
.login > div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 340px;
  height: 200px;
  background-color: #f1f1f1;
  margin: auto;
  border-radius: 5px;
  padding: 30px 30px;
}
h1 {
  text-align: center;
}
#sub {
  display: block;
  margin: 0 auto;
  margin-top: 20px;
}
</style>