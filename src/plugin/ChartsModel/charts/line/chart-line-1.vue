<template>
  <div class="chart_box">
    <div class="chart_title">
      {{ title }}
    </div>
    <slot></slot>
    <div class="chart_panel">
      <v-chart :options="reloadOption" autoresize :style="{height:chartHeight+'px'}"/>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/line'
import Utils from '../../utils/utils'

export default {
  name:"chart-line-1",
  chartType:"line",
  components: {
    'v-chart': ECharts
  },
  // type:Array,Number,Boolean,String,Function,Object
  props: {
    'data': {
      type: Array,
      default: () => {
        return [{
            name: "示例1",
            count: 10,
            value: "",
            scale: 0.1,
        },{
            name: "示例2",
            count: 20,
            value: "",
            scale: 0.2,
        }]
      }
    },
    'title': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      chartHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40 + 100) * .5,
      // panelHeight: ((window.clientWidth || document.documentElement.clientWidth) - 40) * 3 / 4,
      panelHeight: this.chartHeight,
      option: {}
    }
  },
  created () {
    // this.option.series.data = this.listData
    // this.setOptions()
  },
  methods: {
    setOptions () {
    },
    checkRadio (value) {
    }
  },
  computed: {
    sumNum () {
      let count = 0
      this.data.forEach((res) => {
        count += res.value
      })
      return count
    },
    reloadOption: function () {
      const colors = ['#0E8EFB', '#B8224E']
      let [nameList, countList, scaleList] = [[], [], []]
      this.data.forEach(res => {
        nameList.push(res.name)
        countList.push(res.count)
        scaleList.push(res.scale)
      })
      const titleList = ['数据值']
      return {
        color: colors,
        // 此处无用
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        // 图形位置
        grid: {
          top: 40,
          right: 0,
          bottom: 30,
          left: 10,
          containLabel: true
        },
        // 图例组件配置
        legend: {
          data: titleList,
          bottom: 10, // 图例位置
          right: 0,
          itemWidth: 10, // 图例的宽度
          itemHeight: 10 // 图例的高度
        },
        // 横坐标
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true // 刻度线和标签对齐方式
            },
            data: nameList,
            axisLabel: {
              interval: 0,
              formatter: function (value) {
                let arr = value.split('')
                arr.splice(-1, 0, '\n')

                return arr.join('')
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: titleList[0],
            splitNumber: 3,
            boundaryGap: [0, 1],
            position: 'left',
            nameTextStyle: {
              padding: [0, 0, 5, 30]
            },
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: (value)=>{
                return Utils.numberToUnits(value)
              },
            }
          }
        ],
        series: [
          {
            name: titleList[0],
            type: 'line',
            label: {
              show: true,
              position: 'top'
            },
            data: countList
          }
        ]
      }
    }
  }
}
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
