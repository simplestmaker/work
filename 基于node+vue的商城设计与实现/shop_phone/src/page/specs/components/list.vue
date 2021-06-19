<template>
  <div>
    <el-table :data="list" border style="width: 100%" row-key="id" :tree-props="{ children: 'children' }" :resizable="false">
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="item in scope.row.attrs" :key="item" style="margin-right:3px;margin-top:3px">{{item}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
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
    <!-- {{list}} -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { specsdelete, specscount } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specslist/list",
      total: "specslist/total",
      size: "specslist/size",
    }),
  },
  methods: {
    ...mapActions({
      //获取数据总条数
      reqChangeTotal: "specslist/reqChangeTotal",
      reqChangeList: "specslist/reqChangeList",
      // 修改当前页码
      reqChangePage: "specslist/reqChangePage",
    }),
    //删除
    del(id) {
      //   console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          specsdelete(id).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reqChangeList();
              //总条数更新
              this.reqChangeTotal();
              this.info.isPdd = true;
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
    edit(id) {
      // console.log(this.list);
      // 通知父级调用edit
      this.info.isPdd = true;
      this.$emit("edit", id);
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
img {
  width: 0.5rem;
  height: 0.5rem;
}
</style>