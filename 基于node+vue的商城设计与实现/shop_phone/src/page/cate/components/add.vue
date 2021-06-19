<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" style="width:380px">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <div id="fileBox">
          <h3 style="position:absolute">+</h3>
          <img :src="imgUrl" alt="" v-if="imgUrl">
          <input type="file" name="" id="" @change="changeFile">
        </div>
      </el-form-item>
      <el-form-item label="状态">
        <!-- 打开时的值active-value='1' 关闭时的值inactive-value='2' -->
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="info.isPdd">确 定</el-button>
        <el-button type="primary" @click="xiugai()" v-else>修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { cateadd, getcateinfo, cateedit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
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
    // 事件对象event
    changeFile(e) {
      //获取图片信息
      let file = e.target.files[0];
      // 可以将图片信息转换成具体的图片
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //清空form表单
    clear() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    //点击确定
    submit() {
      // console.log(this.form);
      cateadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqChangeList();
          this.info.isShow = false;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击取消
    cancel() {
      //隐藏add表单
      this.info.isShow = false;
      //清空form表单
      this.clear();
    },
    //获取一条信息
    getinfo(id) {
      getcateinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgUrl + this.form.img;
        }
      });
    },
    //点击修改
    xiugai() {
      // console.log(this.form);
      cateedit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = false;
          this.clear();
          successAlert(res.data.msg);
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>e
<style scoped>
#fileBox {
  width: 1rem;
  height: 1rem;
  border: 1px dashed #ccc;
  position: relative;
}
#fileBox > input {
  width: 1rem;
  height: 1rem;
  position: absolute;
  outline: 0;
  opacity: 0;
}
#fileBox h3 {
  text-align: center;
  line-height: 0.5rem;
  font-size: 50px;
  color: #ccc;
  width: 0.5rem;
  height: 0.5rem;
  top: 50%;
  left: 50%;
  margin-top: -0.25rem;
  margin-left: -0.25rem;
}
#fileBox img {
  width: 1rem;
  height: 1rem;
  position: absolute;
}
</style>