<template>
  <div>
    <el-dialog :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="fileBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl">
            <input type="file" v-if="info.isShow" @change="changeFile">
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  bannerlist,
  banneradd,
  bannerinfo,
  banneredit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      // 用于渲染图片
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqChangeList: "bannerlist/reqChangeList",
    }),
    // 当上传框发生变化的时候
    changeFile(e) {
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大小超出限制");
        return;
      }
      // 将文件信息转换成一张具体的图片
      this.imgUrl = URL.createObjectURL(file);
      // 同时还要放到form中，因为后端也需要文件信息
      this.form.img = file;
    },
    // 点击取消
    cancel() {
      // 关闭add组件
      this.info.isShow = false;
      // 调用清空数据
      this.empty();
    },
    // 清空数据
    empty() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    // 添加
    submit() {
      banneradd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form数据
          this.empty();
          successAlert(res.data.msg);
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条信息
    getOne(id) {
      bannerinfo(id).then((res) => {
        if (res.data.code == 200) {
          // 1、将请求的数据赋值给form
          this.form = res.data.list;
          // 2、因为编辑的时候需要id，所以在这里补充一下id
          this.form.id = id;
          // 3、处理图片
          this.imgUrl = this.$imgUrl + this.form.img;
        }
      });
    },
    // 点击修改
    edit() {
      // console.log(this.form);
      banneredit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空form数据
          this.empty();
          // 关闭add这个组件
          this.info.isShow = false;
          // 重新渲染列表数据
          this.reqChangeList();
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
.fileBox {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.fileBox h3 {
  font-size: 40px;
  text-align: center;
  line-height: 150px;
  margin: 0;
}

.fileBox img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
}

.fileBox input {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
