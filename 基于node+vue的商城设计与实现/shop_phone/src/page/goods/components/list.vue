<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称">
      </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{scope.row.price|filterPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格">
        <template slot-scope="scope">
          <span>{{scope.row.price|filterPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div>
            <img :src="$imgUrl+scope.row.img">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rolename" label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </div>
        </template>
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
    <!-- 分页 -->
    <!--
       total  总条数
       page-size   每页展示多少条
       @current-change  当页码发生变化
     -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { goodsDel } from "../../../utils/request";
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
      list: "goodslist/list",
      // 总条数total
      total: "goodslist/total",
      // 每页显示的条数size
      size: "goodslist/size",
    }),
  },
  methods: {
    ...mapActions({
      // 请求列表
      reqChangeList: "goodslist/reqChangeList",
      // 请求总条数total
      reqChangeTotal: "goodslist/reqChangeTotal",
      // 修改当前页码
      reqChangePage: "goodslist/reqChangePage",
    }),
    // 删除
    del(id) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsDel({
            id: id,
          }).then((res) => {
            if (res.data.code == 200) {
              // 提示
              successAlert(res.data.msg);
              // 重新请求数据
              this.reqChangeList();
              // 重新请求总条数
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
    // 编辑
    update(id) {
      // 去通知父级做某些事
      this.$emit("update", id);
    },
    // 当页码发生变化的时候
    changePage(e) {
      // 修改当前页码
      this.reqChangePage(e);
      //  重新请求数据
      this.reqChangeList();
    },
  },
  mounted() {
    // 页面一进来请求列表
    this.reqChangeList();
    // 页面一进来请求总条数total
    this.reqChangeTotal();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
