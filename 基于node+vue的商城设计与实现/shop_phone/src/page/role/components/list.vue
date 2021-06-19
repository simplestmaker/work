<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="角色编号" width="100">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="310">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" size="small" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="info" size="small" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { roledel } from "../../../utils/request";
//引入二次封装的弹窗
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      tableData: [],
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
    }),
    //删除
    del(id) {
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roledel(id).then((res) => {
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

    //编辑
    edit(id) {
      // 通知父级调用edit
      this.info.isPdd = !this.info.isPdd;
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>

