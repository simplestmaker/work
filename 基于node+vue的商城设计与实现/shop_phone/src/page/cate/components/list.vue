<template>
  <div>
    <el-table :data="list" border style="width: 100%" row-key="id" :tree-props="{ children: 'children' }" :resizable="false">
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" size="small" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- {{list}} -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { catedelete } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "catelist/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "catelist/reqChangeList",
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
          catedelete({ id: id }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
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
    //点击编辑
    edit(id) {
      //通知父级调用edit方法 传参id
      this.$emit("edit", id);
    },
  },
  mounted() {
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