<template>
  <div>
    <el-dialog :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <div class="block">
            <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="time">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in catelist" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类" @change='changeSecond'>
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in secondArr[0]" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <!-- 这里需要展示状态层的列表 -->
            <el-option v-for="item in goods" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
          </el-select>
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
  catelist,
  goodsList,
  seckadd,
  seckinfo,
  seckedit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        goodsid: "",
        status: 1,
      },
      // 用于渲染二级分类
      secondArr: [],
      // 用于渲染商品
      goods: [],
      time: [],
    };
  },
  computed: {
    ...mapGetters({
      // 一级分类 cate列表请求
      catelist: "catelist/list",
    }),
  },
  methods: {
    ...mapActions({
      // cate列表请求
      reqCateList: "catelist/reqChangeList",
      //秒杀列表请求
      reqSeckList: "secklist/reqChangeList",
    }),
    //清空数据
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        goodsid: "",
        status: 1,
        specsAttr: [],
      };
      this.time = "";
    },
    // 当一级分类发生变化的时候
    changeFirst() {
      catelist().then((res) => {
        this.secondArr = [];
        var list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          if (this.form.first_cateid === list[i].id) {
            this.secondArr.push(list[i].children);
          }
        }
      });
    },
    //当二级分类发生变化的时候
    changeSecond() {
      goodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goods = [];
        this.goods = res.data.list;
      });
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
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        goodsid: "",
        status: 1,
      };
    },
    // 添加
    submit() {
      // console.log(this.form);
      this.form.begintime = new Date(this.time[0]).getTime();
      this.form.endtime = new Date(this.time[1]).getTime();
      // console.log(this.time);
      // console.log(this.form);
      seckadd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.info.isShow = false;
          // 清空form数据
          this.empty();
          successAlert(res.data.msg);
          this.reqSeckList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条信息
    getOne(id) {
      // 每次点击清空time的数据
      this.time = [];
      seckinfo(id).then((res) => {
        if (res.data.code == 200) {
          // 1、将请求的数据赋值给form
          this.form = res.data.list;
          // 2、因为编辑的时候需要id，所以在这里补充一下id
          this.form.id = id;
          // 将获取的begintime endtime 像转化成数字 再格式化
          this.time.push(new Date(Number(res.data.list.begintime)));
          this.time.push(new Date(Number(res.data.list.endtime)));
          this.changeFirst();
          this.changeSecond();
          console.log(this.time);
        }
      });
    },
    //           this.time.push(this.formatter(res.data.list.begintime, "yyyy-MM-dd"));
    //       this.time.push(this.formatter(res.data.list.endtime, "yyyy-MM-dd"));
    // 点击修改
    edit() {
      seckedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空form数据
          this.empty();
          // 关闭add这个组件
          this.info.isShow = false;
          // 重新渲染列表数据
          this.reqSeckList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqCateList();
  },
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
