<template>
  <div>
    <el-button type='primary' @click="reg" style="margin:10px;margin-left:0">注册</el-button>
    <v-add :info='info' v-show="info.isShow" ref="dwp"></v-add>
    <v-list @edit="edit" :info='info'></v-list>
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
    //点击注册
    reg() {
      this.info.isShow = true;
      this.info.isPdd = true;
      this.$refs.dwp.form = {
        phone: "",
        nickname: "",
        password: "",
      };
    },
    edit(uid) {
      this.info.isShow = true;
      this.$refs.dwp.getinfo(uid);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>