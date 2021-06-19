<template>
  <div>
    <el-button type="primary" @click="addbtn" size="small" style="margin:10px;margin-left:0">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add v-show="info.isShow" :info="info" ref="asd"></v-add>
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
        isPdd: false,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    addbtn() {
      this.info.isShow = true;
      this.info.isPdd = true;
      this.$refs.asd.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    edit(id) {
      // console.log(id);
      this.info.isShow = true;
      this.info.isPdd = false;
      this.$refs.asd.getinfo(id);
    },
  },

  mounted() {},
};
</script>
<style scoped>
</style>