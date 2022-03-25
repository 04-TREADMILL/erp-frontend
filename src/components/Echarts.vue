<template>
  <div id="inventoryChart" :style="{ width: width, height: height }"></div>
</template>

<script>
const echarts = require("echarts/lib/echarts");
require("echarts/lib/component/title");
require("echarts/lib/component/grid");
require("echarts/lib/component/dataZoom");
require("echarts/lib/chart/bar");

export default {
  name: "Echarts",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },
    chartAxis: {
      type: Array,
      require: true
    },
    chartData: {
      type: Array,
      require: true
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("inventoryChart"));
      let dataAxis = this.chartAxis; //商品种类
      let data = this.chartData; //商品库存量
      const zoomSize = 2;

      // 绘制图表
      myChart.setOption({
        title: {
          text: "当前各商品的库存情况",
          subtext: "x轴-商品名称，y轴-商品库存数量"
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            // inside: true,
            // color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#999"
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            label: {
              show: true,
              position: "top"
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#9fa8da" },
                { offset: 0.5, color: "#9867d2" },
                { offset: 1, color: "#7e57c2" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#7e57c2" },
                  { offset: 0.7, color: "#703dab" },
                  { offset: 1, color: "#873cdc" }
                ])
              }
            },
            data: data
          }
        ]
      });

      myChart.on("click", function(params) {
        //绑定具体的点击时间
        myChart.dispatchAction({
          type: "dataZoom",
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)], //开始展示的位置
          endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)] //结束展示的位置
        });
      });
    }
  }
};
</script>

<style scoped></style>
