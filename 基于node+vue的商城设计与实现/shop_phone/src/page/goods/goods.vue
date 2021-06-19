<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @update="update"></v-list>
    <v-add :info="info" ref="aaa"></v-add>

  </div>
</template>
<script>
  import vList from "./components/list"
  import vAdd from "./components/add"
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    props: [],
    components: {
      vList,
      vAdd
    },
    data() {
      return {
        info: {
          isShow: false,
          isAdd: true
        }
      };
    },
    computed: {
      ...mapGetters({}),
    },
    methods: {
      ...mapActions({}),
      // 点击添加
      add() {
        this.info.isShow = true
        this.info.isAdd = true
      },
      // list列表点击了编辑后，通知我要执行的事
      update(id) {
        this.info.isShow = true
        this.info.isAdd = false
        // 通过ref让add组件执行他的getOne()
        this.$refs.aaa.getOne(id)
      }
    },
    mounted() {},
  };

</script>
<style scoped>
</style>
