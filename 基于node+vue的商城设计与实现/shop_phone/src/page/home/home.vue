<template>
  <div id="box"></div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as echarts from "echarts";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "catelist/list",
    }),
  },
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("box"));
        var option = {
          title: {
            text: "平台家用电器品牌数量",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              // bar 柱状图  line 折线图
              type: "bar",
              data: this.list.map((item) => item.children.length),
            },
          ],
        };
        myChart.setOption(option);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reqChangeList: "catelist/reqChangeList",
    }),
  },
  mounted() {
    this.reqChangeList();
    var myChart = echarts.init(document.getElementById("box"));
    var option = {
      title: {
        text: "各大电器品牌数量",
      },
      tooltip: {},
      legend: {
        data: ["数量"],
      },
      xAxis: {
        data: this.list.map((item) => item.catename),
      },
      yAxis: {},
      series: [
        {
          name: "数量",
          // bar 柱状图  line 折线图
          type: "bar",
          data: this.list.map((item) => item.children.length),
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>
<style scoped>
#box {
  margin: 0.3rem;
  width: 4rem;
  height: 3rem;
  border: 3px solid black;
}
</style>