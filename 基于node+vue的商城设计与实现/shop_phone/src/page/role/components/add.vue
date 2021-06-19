<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.rolename" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="region">
        <el-tree :data="list" show-checkbox node-key="id" :props="{label:'title'}" ref="tree">
        </el-tree>
      </el-form-item>
      <el-form-item label="状态" prop="delivery">
        <template>
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isPdd">添加</el-button>
        <el-button type="primary" v-else @click="xiugai()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
//调用角色添加接口
import { roleadd, getroleinfo, roleedit } from "../../../utils/request";
//引入二次封装的弹窗
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  //父传子
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menulist/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList1: "menulist/reqChangeList",
      reqChangeList2: "rolelist/reqChangeList",
    }),
    //点击添加
    submit() {
      //灵活使用ref
      // console.log(this.$refs.tree.getCheckedKeys());
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          // 清空数据
          this.empty();
          // 重新渲染列表
          this.reqChangeList2();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 清空
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 由于树形控件和form没有任何联系，所以要是用element的方法来清空
      this.$refs.tree.setCheckedKeys([]);
    },
    //点击取消
    cancel() {
      this.info.isShow = false;
      this.info.isPdd = true;
    },
    //获取一条信息
    getInfo(id) {
      getroleinfo(id).then((res) => {
        console.log(res.data.list);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          // 因为form和属性控件本身没有什么联系，我们需要使用ele的方法设置树形控件
          // 因为获取到的数据是字符串数组，而树形控件需要数组，所以使用JSON.parse转换
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },

    //点击修改
    xiugai() {
      // console.log(this.form);
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.reqChangeList2();
          this.info.isPdd = true;
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqChangeList1();
  },
};
</script>
<style scoped>
</style>