<style lang="scss" scoped>
.zq-operater-container {
  // box-shadow: 0px 0px 10px 10px #{$boxShadow};
  width: 375px;
  height: 100%;
  border: 1px solid #{$borderColor};
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 10px;
}
.zq-operater {
  height: 776px;
  overflow-y: auto;
}
.zq-operater::-webkit-scrollbar {
  width: 0 !important;
}
.zq-operater {
  -ms-overflow-style: none;
}
.zq-operater {
  overflow: -moz-scrollbars-none;
}
.zq-charts-container {
  min-height: 905px;
  width: calc(100% - 400px);
  margin-left: 20px;
  // border-left: 1px solid #ccc;
}
.zq-charts-item {
  width: 285px;
  border: 1px solid #{$borderColor};
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
}
.zq-charts-item:hover {
  background-color: #{$mainColor};
}

.chart-move-div {
  opacity: 0.85;
  border: 2px solid #e1e1e1;
  background-color: #ffffff;
  position: fixed;
  width: #{$clientWidth + "px"};
}
</style>
<template>
  <div style="display: flex">
    <div class="zq-operater-container">
      <zq-title style="margin: 10px 0px">{{ title }}</zq-title>
      <div
        style="
          margin-bottom: 10px;
          display: flex;
          justify-content: space-around;
        "
      >
        <el-button
          type="primary"
          @click="showChooseDialog"
          style="width: 120px"
        >
          <span class="icon iconfont iconmoban" style="margin-right: 5px"></span
          >模板选择
        </el-button>
        <el-button type="danger" style="width: 120px">
          <span class="icon iconfont iconmoban" style="margin-right: 5px"></span
          >保存
        </el-button>
      </div>

      <div class="zq-operater">
        <dom-list :components="resultArr"></dom-list>
      </div>
    </div>

    <div class="zq-charts-container">
      <el-select
        style="margin-left: 15px; margin-top: 10px"
        v-model="selectValue"
        placeholder="请选择"
        @change="selectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <div
        style="
          display: flex;
          flex-wrap: wrap;
          margin-left: 10px;
          margin-top: 15px;
        "
      >
        <div
          v-for="(charts, index) in chartsComponents"
          :key="index"
          class="zq-charts-item"
          v-zqmove="[charts]"
          v-zqmove-mousemove="mouseMoveFunction"
          v-zqmove-mouseup="mouseUpFunction"
        >
          <dom-list :components="[charts]"></dom-list>
        </div>
      </div>
    </div>

    <el-dialog title="模板展示" :visible.sync="dialogVisible" width="auto">
      <el-radio-group v-model="radio" style="display: flex; overflow-x: auto">
        <el-radio
          :label="theme.id"
          v-for="theme in themeComponents"
          :key="theme.id"
        >
          <div style="width: 375px; height: 776px; overflow-y: auto">
            <dom-list :components="theme.components"></dom-list>
          </div>
        </el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlerChooseTheme">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Utils from "@/plugin/ChartsModel/utils/utils.js";
import chartApi from "@/api/chartApi";
export default {
  data() {
    return {
      title: "",
      dialogVisible: false,
      radio: "",
      themeComponents: [], //所有的主题
      resultArr: [],
      chartsComponents: [], //所有的图表
      options: [],
      selectValue: "all",
    };
  },
  watch: {
    $route: {
      handler() {
        this.title = this.$route.params.themeName;
      },
      immediate: true,
    },
  },
  mounted() {
    let self = this;
    chartApi.getFrames().then((frames) => {
      frames.forEach((frame, index) => {
        self.themeComponents.push({
          id: index,
          components: [frame],
        });
      });
    });
    self.getChartsGroup();
  },
  methods: {
    //获取所有的图表组
    getChartsGroup() {
      let self = this;
      chartApi.getChartsGroup().then((charts) => {
        console.log("charts = ", charts);
        self.options.push({
          value: "all",
          label: "所有",
        });
        charts.forEach((chart) => {
          self.options.push({
            value: chart.value,
            label: chart.name,
          });
        });
        self.selectChange("all");
      });
    },
    selectChange(groupId) {
      let self = this;
      chartApi
        .getCharts({
          groupId: groupId,
        })
        .then((charts) => {
          self.chartsComponents = charts;
        });
    },
    //鼠标移动事件回调
    mouseMoveFunction(x, y, vdom) {
      console.log("mouseMoveFunction");
      let self = this;
      let id = self.inFrameReturnId(x, y, "move");
    },
    //鼠标弹起事件回调
    mouseUpFunction(x, y, vdom) {
      console.log("mouseUpFunction");
      let self = this;
      let id = self.inFrameReturnId(x, y, "up");
      if (id) {
        self.insertChartntoResult(id, vdom);
      }
    },
    //在框架中,返回框架的id，否则返回空
    inFrameReturnId(x, y, state) {
      let self = this;
      let targetDiv = document.getElementsByClassName("zq-operater")[0];
      // if(!targetDiv) return;
      let widgetDivs = targetDiv.getElementsByClassName("widget-div");
      let id = "";
      Array.prototype.forEach.call(widgetDivs, function (widgetDiv) {
        let rect = widgetDiv.getBoundingClientRect();
        widgetDiv.style.border = "none";
        if (
          x > rect.left &&
          x <= rect.left + rect.width &&
          y > rect.top &&
          y <= rect.top + rect.height
        ) {
          id = widgetDiv.id; //当前鼠标落点的id
          if (state == "move") {
            //如果鼠标在移动状态
            widgetDiv.style.border = "2px dotted #50a0f9";
          }
        }
      });
      return id;
    },
    //从结果中删除一个样例
    deleteFromResult(id) {
      let self = this;
      self.resultArr.forEach((frame, i) => {
        frame.props.widgetArr.forEach((widgetDiv, j) => {
          if (widgetDiv.id == id) {
            widgetDiv.components = [];
          }
        });
      });
    },
    //插入到结果中
    insertChartntoResult(insertId, vdom) {
      const self = this;
      if (!insertId) {
        return;
      }
      const chartCloseBtn = "close-btn_"; //关闭按钮
      //要插入的虚拟dom结构
      const tempVNode = {
        name: "div",
        attrs: {
          id: "target-container_" + insertId,
        },
        children: [
          {
            name: "div",
            style: {
              position: "relative",
            },
            children: [
              vdom,
              {
                name: "chart-close",
                on: {
                  closeThisChart: function (id) {
                    let deleteId = id.replace(chartCloseBtn, "");
                    self.deleteFromResult(deleteId);
                  },
                },
                props: {
                  id: chartCloseBtn + insertId,
                },
              },
            ],
          },
        ],
      };

      if (insertId && vdom && vdom.length == 1) {
        self.resultArr.forEach((theme, i) => {
          theme.props &&
            theme.props.widgetArr.forEach((widgetDiv, j) => {
              if (widgetDiv.id == insertId) {
                widgetDiv.components = [tempVNode];
              }
            });
        });
      }
    },
    showChooseDialog() {
      const self = this;
      self.dialogVisible = true;
    },
    handlerChooseTheme() {
      const self = this;
      self.resultArr = [];
      self.themeComponents.forEach((theme) => {
        if (self.radio == theme.id) {
          self.resultArr = Utils.deepClone(theme.components);
        }
      });
      // console.log(self.resultArr);
      self.dialogVisible = false;
    },
  },
};
</script>