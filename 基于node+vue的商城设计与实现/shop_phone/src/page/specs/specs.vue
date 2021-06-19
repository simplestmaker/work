<template>
  <div>
    <el-button type="primary" size="small" style="margin:10px;margin-left:0" @click="addbtn" v-show="info.isPdd">添加</el-button>
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
    ...mapActions({}),
    //点击添加
    addbtn() {
      this.info.isShow = true;
      this.info.isPdd = false;
    },
    //自定义属性
    edit(id) {
      this.info.isShow = true;
      this.$refs.dwp.getInfo(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>