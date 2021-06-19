<template>
  <div>
    <el-button type="primary" size="small" style="margin:10px;margin-left:0" @click="add" v-show="info.isPdd">添加</el-button>
    <v-add v-show="info.isShow" :info='info' ref="dwp"></v-add>
    <v-list v-show="!info.isShow" :info='info' @edit="edit"></v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        isPdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqChangeList: "rolelist/reqChangeList",
    }),
    //添加
    add() {
      this.info.isShow = true;
      this.info.isPdd = true;
      this.$refs.dwp.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
    },
    //自定义属性
    edit(id) {
      this.info.isShow = true;
      this.$refs.dwp.getInfo(id);
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>