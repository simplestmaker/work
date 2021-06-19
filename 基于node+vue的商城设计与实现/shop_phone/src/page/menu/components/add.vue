<template>
  <div>
    <el-dialog :title="info.isPdd ? '菜单添加' : '菜单编辑'" :visible.sync="info.isShow">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-select v-model="form.pid" placeholder="请选择顶级菜单" @change="changeApi()">
              <el-option label="顶级菜单" :value="0"></el-option>
              <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单类型">
            <!-- 注意群组类型  <el-radio-group v-model="form.type">-->
            <el-radio-group v-model="form.type">
              <el-radio :label="1" disabled>目录</el-radio>
              <el-radio :label="2" disabled>菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <!-- 打开时的值active-value='1' 关闭时的值inactive-value='2' -->
            <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
          </el-form-item>
          <el-form-item label="菜单图标" v-if="form.type == 1">
            <el-select v-model="form.icon" placeholder="请选择菜单图标">
              <el-option :value="item" v-for="item in icons" :key="item"><i :class="item"></i></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单地址" v-else>
            <el-select v-model="form.url" placeholder="请选择菜单地址">
              <el-option :label="item.name" :value="'/' + item.path" v-for="item in indexRouters" :key="item.path"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="info.isPdd">确 定</el-button>
        <el-button type="primary" @click="xiugai()" v-else>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { menuadd, getmenuinfo, menuEdit } from "../../../utils/request";
import { indexRouters } from "../../../router/index";
export default {
  //父传子
  props: ["info"],
  components: {},
  data() {
    return {
      //定义菜单地址 渲染数据
      indexRouters: indexRouters,
      icons: [
        "el-icon-user-solid",
        "el-icon-s-goods",
        "el-icon-tickets",
        "el-icon-alarm-clock",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
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
      reqChangeList: "menulist/reqChangeList",
    }),
    //清空form表单
    clear() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //点击确定
    submit() {
      menuadd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          successAlert(res.data.msg);
          this.reqChangeList();
          this.clear();
        } else {
          warningAlert(res.data.msg);
          this.clear();
        }
      });
    },
    //控制顶级菜单联动
    changeApi() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //获取一条信息
    getinfo(id) {
      getmenuinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
    //点击取消
    cancel() {
      //隐藏add表单
      this.info.isShow = false;
      //清空form表单
      this.clear();
    },
    //点击修改
    xiugai() {
      menuEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.clear();
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