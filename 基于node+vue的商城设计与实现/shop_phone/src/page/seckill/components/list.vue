<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" border>
      <el-table-column prop="title" label="活动名称">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="update(scope.row.id)">编 辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删 除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { seckdelete } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      // 列表数据
      list: "secklist/list",
    }),
  },
  methods: {
    ...mapActions({
      // 请求列表
      reqChangeList: "secklist/reqChangeList",
    }),
    // 删除
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          seckdelete(id).then((res) => {
            if (res.data.code == 200) {
              // 提示
              successAlert(res.data.msg);
              // 重新请求数据
              this.reqChangeList();
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
    // 编辑
    update(id) {
      // 去通知父级做某些事
      this.$emit("update", id);
    },
  },
  mounted() {
    // 页面一进来请求列表
    this.reqChangeList();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
