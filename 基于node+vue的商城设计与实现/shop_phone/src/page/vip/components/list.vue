<template>
  <div>
    <template>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="100">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="200">
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
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
      list: "viplist/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "viplist/reqChangeList",
    }),
    //点击编辑
    edit(uid) {
      //通知父级调用edit方法 传参id
      this.$emit("edit", uid);
      this.info.isPdd = false;
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>

