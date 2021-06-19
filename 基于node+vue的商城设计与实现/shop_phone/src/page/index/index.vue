<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col>
            <!--1. 管理员用户显示的侧边栏 -->
            <el-menu v-if="userInfo.menus[0].children&&userInfo.menus.length>1" class="el-menu-vertical-demo" background-color="rgb(32, 34, 42)" text-color="white" active-text-color="rgb(241, 155, 46)" router>
              <el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
              <!--1.1 系统设置部分 -->
              <el-submenu index="1">
                <template slot="title">
                  <i :class="userInfo.menus[1].icon"></i>
                  <span>{{userInfo.menus[1].title}}</span>
                </template>
                <el-menu-item-group>
                  <template slot="title"></template>
                  <el-menu-item :index="item.url" v-for="item in userInfo.menus[1].children" :key="item.id">{{item.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!--1.2 商品管理部分 -->
              <el-submenu index="2">
                <template slot="title">
                  <i :class="userInfo.menus[0].icon"></i>
                  <span>{{userInfo.menus[0].title}}</span>
                </template>
                <el-menu-item-group>
                  <template slot="title"></template>
                  <el-menu-item :index="item.url" v-for="item in userInfo.menus[0].children" :key="item.id">{{item.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
            <!--2.商品管理权限用户显示的侧边栏 -->
            <el-menu v-else class="el-menu-vertical-demo" background-color="rgb(32, 34, 42)" text-color="white" active-text-color="rgb(241, 155, 46)" router>
              <el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
              <el-submenu index="2" v-if="userInfo.menus[0].children">
                <template slot="title">
                  <i :class="userInfo.menus[0].icon"></i>
                  <span>商城管理</span>
                </template>
                <!-- 2.1 -->
                <el-menu-item-group>
                  <template slot="title"></template>
                  <el-menu-item :index="item.url" v-for="item in userInfo.menus[0].children" :key="item.id">{{item.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 2.2.部分商品管理权限用户显示的侧边栏 -->
              <el-submenu index="2" v-else>
                <!-- 2.1 -->
                <template slot="title">
                  <i class="el-icon-s-help"></i>
                  <span>商城管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title"></template>
                  <el-menu-item :index="item.url" v-for="item in userInfo.menus" :key="item.id">{{item.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <el-button type="text" @click="quite">
            <a>退出</a>
          </el-button>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class=" el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { quitAlert } from "../../utils/alert";
export default {
  // beforeRouteEnter(to, from, next) {
  //   if (sessionStorage.getItem("isLogin") == 1) {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // },
  props: [],
  components: {},
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({}),
    //点击退出
    quite() {
      this.$confirm("此操作将退出该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/login");
          sessionStorage.clear();
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.el-aside {
  height: 160vh;
  background-color: rgb(32, 34, 42);
}
.el-header {
  font-size: 30px;
  text-align: right;
  line-height: 60px;
  background-color: rgb(179, 192, 209);
}
.el-menu-item:hover {
  background-color: pink;
}
</style>