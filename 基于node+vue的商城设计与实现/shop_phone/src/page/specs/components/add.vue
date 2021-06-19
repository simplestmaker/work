<template>
  <div>
    <el-form label-width="80px" style="margin-top:30px">
      <el-form-item label="规格名称">
        <el-input style="width:200px;" v-model="form.specsname"></el-input>
      </el-form-item>
      <el-form-item label="规格属性" v-for="(item,index) in arr" :key="index">
        <div id="strBox">
          <el-input style="width:200px" v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addStr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delStr">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" v-if="info.isPdd" @click="xiugai">修改</el-button>
        <el-button type="primary" @click="submit" v-else>添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { specsadd, specsinfo, specsedit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // 用来渲染有多少个规则属性
      arr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "specslist/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "specslist/reqChangeList",
    }),

    //清空form表单
    clear() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arr = [{ value: "" }, { value: "" }];
    },

    //点击取消
    cancel() {
      //隐藏add表单
      this.info.isShow = false;
      this.info.isPdd = true;
      this.clear();
    },

    //点击新增属性
    addStr() {
      this.arr.push({ value: "" });
    },

    // 点击删除
    delStr(index) {
      this.arr.splice(index, 1);
    },

    //获取一条信息
    getInfo(id) {
      // 清空arr
      this.arr = [];
      specsinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.form.id = id;
          // this.arr = JSON.parse(res.data.list[0].attrs);
          // console.log(JSON.parse(res.data.list[0].attrs));
          res.data.list[0].attrs.forEach((item) => {
            let res = /["[""\]"]/g;
            let a = item.replace(res, "");
            this.arr.push({ value: a });
          });
        }
      });
    },

    //点击确定
    submit() {
      // console.log(this.form, this.arr);
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      // console.log(this.form);
      specsadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqChangeList();
          this.info.isShow = false;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击修改
    xiugai() {
      // console.log(this.form);
      // console.log(typeof this.form.attrs);
      this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
      this.arr = this.form.attrs;
      specsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.info.isPdd = true;
          this.reqChangeList();
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
#strBox {
  position: relative;
}
#addStr {
  position: absolute;
  left: 205px;
  top: 0;
}
</style>