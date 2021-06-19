<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="100">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="310">
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色" width="310">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" size="small" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="info" size="small" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.uid)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.uid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!--
       total  总条数
       page-size   每页展示多少条
       @current-change  当页码发生变化显示的当前的页
     -->
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage">
      </el-pagination>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { usercount, userdelete } from "../../../utils/request";
//引入二次封装的弹窗
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "userlist/list",
      total: "userlist/total",
      size: "userlist/size",
    }),
  },
  methods: {
    ...mapActions({
      //获取数据总条数
      reqChangeTotal: "userlist/reqChangeTotal",
      reqChangeList: "userlist/reqChangeList",
      // 修改当前页码
      reqChangePage: "userlist/reqChangePage",
    }),
    //删除
    del(uid) {
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userdelete(uid).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reqChangeList();
              //总条数更新
              this.reqChangeTotal();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //编辑
    edit(uid) {
      // console.log(this.list);
      // 通知父级调用edit
      this.info.isPdd = false;
      this.$emit("edit", uid);
    },
    // 当页码发生变化的时候
    changePage(e) {
      // 修改当前页码
      console.log(e);
      this.reqChangePage(e);
      //  重新请求数据
      this.reqChangeList();
    },
  },
  mounted() {
    this.reqChangeTotal();
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>