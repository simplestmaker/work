<template>
  <div>
    <el-dialog title="提示" :visible.sync="info.isShow" width="30%">
      <span>
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
        <el-input v-model="form.nickname" placeholder="用户名"></el-input>
        <el-input placeholder="密码" v-model="form.password" show-password></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()" v-if="info.isPdd">确 定</el-button>
        <el-button type="primary" @click="xiugai()" v-else>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { register, memberinfo, memberedit } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqChangeList: "viplist/reqChangeList",
    }),
    //点击注册
    confirm() {
      if (
        this.form.phone != "" &&
        this.form.nickname != "" &&
        this.form.password != ""
      ) {
        register(this.form).then((res) => {
          if (res.data.code == 200) {
            this.info.isShow = false;
            this.reqChangeList();
            successAlert(res.data.msg);
          } else {
            warningAlert(res.data.msg);
          }
        });
      } else {
        warningAlert("用户名或者密码昵称为空");
        this.info.isShow = true;
      }
    },
    //获取一条信息
    getinfo(uid) {
      memberinfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
          this.form.password = "";
        }
      });
    },
    //点击修改
    xiugai() {
      memberedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          successAlert(res.data.msg);
          this.reqChangeList();
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
</style>