<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属角色">
        <el-select v-model="form.roleid" placeholder="请选择所属角色">
          <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" style="width:200px" value="userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" style="width:200px" value="passWord"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <template>
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isPdd">添加</el-button>
        <el-button type="primary" @click="xiugai()" v-else>修改</el-button>
      </el-form-item>
    </el-form>
    <!-- {{list}} -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { useradd, getuserinfo, useredit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "rolelist/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "rolelist/reqChangeList",
      reqChangeList2: "userlist/reqChangeList",
      reqChangeTotal: "userlist/reqChangeTotal",
    }),

    //点击添加
    submit() {
      // console.log(this.form);
      useradd(this.form).then((res) => {
        if (res.data.code == 200) {
          console.log(this.form);
          successAlert(res.data.msg);
          this.reqChangeList2();
          this.reqChangeTotal();
          this.info.isShow = false;
          this.info.isPdd = true;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击取消
    cancel() {
      this.info.isShow = false;
      this.info.isPdd = true;
      this.info.isDDD = true;
    },
    //获取一条信息
    getInfo(uid) {
      getuserinfo(uid).then((res) => {
        console.log(res.data.list);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
          this.form.uid = uid;
        }
      });
    },

    //点击修改
    xiugai() {
      useredit(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.info.isPdd = true;
          this.reqChangeList2();
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>