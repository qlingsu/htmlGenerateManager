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
  name: "chart-bar-hroizontal-2",
  chartType:"bar-hroizontal",
  components: {
    'v-chart': ECharts
  },
  // type:Array,Number,Boolean,String,Function,Object
  props: {
    'data': {
      type: Array,
      default: () => {
        return [
          {
            name: "示例1",
            count: 10,
            value: "示例1",
            scale: 0.1,
        },{
            name: "示例2",
            count: 20,
            value: "示例2",
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
      chartHeight: 0,
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
  },
  computed: {
    reloadOption: function () {
      const colors = ['#0E8EFB', '#B8224E']
      let [nameList, countList] = [[], [], []]
      this.chartHeight = (window.clientWidth || document.documentElement.clientWidth) / 2 + this.data.length * 20
      this.data.forEach(res => {
        nameList.push(res.name)
        countList.push(res.count*100)
      })
      return {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '0',
          right: '40',
          bottom: '50',
          top: '20',
          containLabel: true
        },
        xAxis: [
          {
            name:'',
            type: 'value',
            splitNumber: 3,
            position: 'bottom',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            nameLocation: 'end',
            nameTextStyle: {
              padding: [60, 0, 0, -60]
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: false // 刻度线和标签对齐方式
            },
            data: nameList,
            axisLabel: {
              formatter: (value) => {
                const st = value.split('')
                st.length > 5 && st.splice(5, 0, '\n')
                return st.join('')
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: 10,
            data: countList,
            label: {
              show: true,
              position: 'right',
              formatter: (value) => {
                // console.log(value.value)
                return value.value.toFixed(2)+'%'
              }
            }
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
    padding: 0 0 0 10px;
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
