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
  width:#{$clientWidth + 'px'};
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
        >
          <dom-list :components="[charts]"></dom-list>
        </div>
      </div>
    </div>

    <!-- 模拟移动model -->
    <div class="chart-move-div" v-show="mousedownState">
      <dom-list :components="moveArr"></dom-list>
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
var mobile = "zq-operater";
var chartMoveDiv = "chart-move-div";
var chartCloseBtn = "close-btn_"; //关闭按钮

var offsetX = 0;
var offsetY = 0;

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
      moveArr: [],

      mousedownState: false, //鼠标按下状态
      mouseMoveAction: false, //鼠标移动动作
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
    window.onmousemove = self.mousemoveEvent;
    window.onmouseup = self.mouseupEvent;
  },
  beforeDestroy() {
    let self = this;
    window.onmousemove = null;
    window.onmouseup = null;
  },
  methods: {
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
          self.chartsComponents = self.setNativeOn(charts, "chart");
        });
    },
    //设置原生鼠标事件
    setNativeOn(arr, sourceVal) {
      let self = this;
      Array.isArray(arr) &&
        arr.map((component, i) => {
          if (component.nativeOn) {
            component.nativeOn = {
              ...component.nativeOn,
              mousedown: (e) => {
                self.source = sourceVal;
                self.mousedownEvent(e, i);
              },
            };
          } else {
            component.nativeOn = {
              mousedown: (e) => {
                self.source = sourceVal;
                self.mousedownEvent(e, i);
              },
            };
          }
        });
      return arr;
    },
    mousemoveEvent(e) {
      let self = this;
      if (self.mousedownState) {
        self.mouseMoveAction = true;
        self.moveModel(e);
      }
    },
    mouseupEvent(e) {
      let self = this;

      let mouseX = e.clientX;
      let mouseY = e.clientY;

      self.mouseMoveAction = false;
      //插入框架
      // if (self.source == "frame" && self.inTargetContainer(mouseX, mouseY)) {
      //   self.insertFramentoResult();
      // }
      //在结果区域内松的鼠标 且在占位上
      let id = self.inFrameReturnId(mouseX, mouseY);
      if (id) {
        self.insertChartntoResult(id);
      }

      offsetX = 0;
      offsetY = 0;
      self.mousedownState = false;

      //清空移动Model
      self.moveArr = [];
    },
    //判断坐标在不在手机模型结果框中
    inTargetContainer(x, y) {
      let self = this;
      //结果框坐标
      let targetDiv = document.getElementsByClassName(mobile)[0];
      let targetRectObj = targetDiv.getBoundingClientRect();
      if (
        x > targetRectObj.left &&
        x < targetRectObj.left + targetRectObj.width &&
        y > targetRectObj.top &&
        y < targetRectObj.top + targetRectObj.height
      ) {
        return true;
      } else {
        return false;
      }
    },
    mousedownEvent(e, index) {
      let self = this;
      // if (self.source == "chart") {
      //   self.moveArr = [Utils.deepClone(self.chartsArr[index])];
      // } else if (self.source == "frame") {
      //   self.moveArr = [Utils.deepClone(self.frameArr[index])];
      // } else if (self.source == "element") {
      //   self.moveArr = [Utils.deepClone(self.elementArr[index])];
      // }
      self.moveArr = [Utils.deepClone(self.chartsComponents[index])];
      function getStyle(obj, attr) {
        return obj.currentStyle
          ? obj.currentStyle[attr]
          : getComputedStyle(obj, false)[attr];
      }
      //如果内容物有width，则chart-move-div的宽度与之一致
      if (self.moveArr[0].attrs && self.moveArr[0].attrs.width) {
        let moveDiv = document.getElementsByClassName(chartMoveDiv)[0];
        moveDiv.style.width = self.moveArr[0].attrs.width;
      }
      //计算偏移值---这里不能直接用e.offseX 和e.offsetY 因为要计算点击的外壳div，而不是内容物div
      let rect = e.currentTarget.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      self.moveModel(e);
      self.mousedownState = true;
    },
    moveModel(e) {
      let self = this;
      let moveDiv = document.getElementsByClassName(chartMoveDiv)[0];
      moveDiv.style.left = e.clientX - offsetX + "px";
      moveDiv.style.top = e.clientY - offsetY + "px";

      //在结果区域内松的鼠标 且在占位上
      let id = self.inFrameReturnId(e.clientX, e.clientY);
    },
    //在框架中,返回框架的id，否则返回空
    inFrameReturnId(x, y) {
      let self = this;
      let targetDiv = document.getElementsByClassName(mobile)[0];
      let widgetDivs = targetDiv.getElementsByClassName("widget-div");
      let id = "";
      Array.prototype.forEach.call(widgetDivs, function (widgetDiv) {
        let rect = widgetDiv.getBoundingClientRect();
        widgetDiv.style.border = "none";
        // widgetDiv.style.backgroundColor = "#FFFFFF";
        if (
          x > rect.left &&
          x <= rect.left + rect.width &&
          y > rect.top &&
          y <= rect.top + rect.height
        ) {
          id = widgetDiv.id; //当前鼠标落点的id
          if (self.mouseMoveAction) {
            //如果鼠标在移动状态
            widgetDiv.style.border = "2px dotted #50a0f9";
            // widgetDiv.style.backgroundColor = "#50a0f9";
          }
        }
      });
      return id;
    },
    //插入框架到结果中
    insertFramentoResult() {
      let self = this;
      if (self.moveArr && self.moveArr.length == 1) {
        // self.resultArr.push(self.moveArr[0]);
        self.moveArr[0].nativeOn = {
          ...self.moveArr[0].nativeOn,
          mousedown: function () {},
        };
        self.resultArr = self.moveArr;
      }
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
    insertChartntoResult(insertId) {
      let self = this;
      if (!insertId) {
        return;
      }
      //要插入的虚拟dom结构
      let tempVNode = {
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
              self.moveArr[0],
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

      if (insertId && self.moveArr && self.moveArr.length == 1) {
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
      console.log(self.resultArr);
      self.dialogVisible = false;
    },
  },
};
</script>