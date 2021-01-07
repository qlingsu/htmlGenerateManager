<template>
  <div class="chart_box">
    <div class="chart_title">{{ title }}</div>
    <slot></slot>
    <div class="chart_panel">
      <!-- <v-chart :options="reloadOption" autoresize :style="{height:chartHeight+'px'}" /> -->

      <div :style="{ height: chartHeight + 'px' }">
        <canvas id="container" style="width: 100%; height: 100%" />
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import Utils from "../../utils/utils";

// import F2 from "@antv/f2";
import F2 from "@antv/f2/lib/index-all";
export default {
  name: "chart-pie-9",
  chartType: "pie",
  components: {
    "v-chart": ECharts,
  },
  // type:Array,Number,Boolean,String,Function,Object
  props: {
    data: {
      type: Array,
      default: () => {
        return [
          { value: 2, name: "示例1", scale: 0.2 },
          { value: 3, name: "示例2", scale: 0.3 },
          { value: 5, name: "示例3", scale: 0.5 },
        ];
      },
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chartHeight:
        ((window.clientWidth || document.documentElement.clientWidth) -
          40 +
          100) *
        0.5,
      // panelHeight: (document.documentElement.clientWidth - 40) * 3 / 4,
      panelHeight: this.chartHeight,
      option: {},
      arr: [
        {
          name: "",
          y: 0,
          const: "",
        },
      ],
    };
  },
  created() {
    // this.option.series.data = this.listData
    // this.setOptions()
  },
  computed: {
    sumNum() {
      let count = 0;
      this.data.forEach((res) => {
        count += res.value;
      });
      return count;
    },
    formatData() {
      let self = this;
      return self.data.map((item) => {
        return {
          ...item,
          y: item.value,
          const: "const",
        };
      });
    },
  },
  watch: {
    formatData: {
      handler: function (val) {
        let self = this;
        self.$nextTick(() => {
          self.draw(val);
        });
      },
      immediate: true,
    },
  },
  methods: {
    draw(val) {
      const self = this;
      const chart = new F2.Chart({
        id: "container",
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(val);
      chart.coord("polar", {
        transposed: true,
        radius: 0.75,
        inner: 0.5,
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);
      self.$nextTick(() => {
        // 添加饼图文本
        chart.pieLabel({
          sidePadding: 40,
          label1: function label1(data, color) {
            return {
              text: data.name,
              fill: "black",
            };
          },
          label2: function label2(data) {
            return {
              text:
                String(Math.floor(data.value * 100) / 100).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                ) +
                "件 占" +
                ((data.value * 100) / self.sumNum).toFixed(2) +
                "%",
              fill: "#808080",
              fontWeight: "bold",
            };
          },
        });

        chart
          .interval()
          .position("const*y")
          .color("name", [
            "#50A0F9",
            "#B8224E",
            "#9BD23C",
            "#FACC14",
            "#F04864",
          ])
          .adjust("stack");
        chart.render();
      });
    },
  },
};
</script>

<style scoped>
.chart_box {
  background: #fff;
  margin-bottom: 20px;
}

.chart_title {
  padding: 12px;
}

.chart_panel {
  width: 100%;
  padding: 0 0px;
  /*display: flex;*/
  /*flex-direction: row;*/
  /*justify-content: space-between;*/
}

.echarts {
  width: 100%;
  height: 180px;
  text-align: center;
}
</style>
