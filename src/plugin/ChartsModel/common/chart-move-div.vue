<style lang="scss">
.chart-move-div {
  opacity: 0.85;
  border: 2px solid #e1e1e1;
  background-color: #ffffff;
  position: fixed;
  width: #{$clientWidth + "px"};
}
</style>
<template>
  <div class="chart-move-div" :id="id" v-show="mousedownState">
    <dom-list :components="componentsClone"></dom-list>
  </div>
</template>

<script>
import Utils from "..//utils/utils.js";
export default {
  name: "chart-move-div",
  props: {
    //模拟的用于移动的虚拟dom
    components: {
      type: Array,
      default: function () {
        return [];
      },
    },
    //鼠标按下的状态
    mousedownState: {
      type: Boolean,
      default: false,
    },
    //偏移值
    offsetX: {
      type: Number,
      default: 0,
    },
    //偏移值
    offsetY: {
      type: Number,
      default: 0,
    },
    //给移动div赋值id
    id: {
      type: String,
      default: "chartsDiv",
    },
    //鼠标移动的回调函数
    mouseMoveCallBack: {
      type: Function,
      default: () => {},
    },
    //鼠标弹起的时候回调函数
    mouseUpCallBack: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    componentsClone() {
      const self = this;
      return Utils.deepClone(self.components);
    },
  },
  data() {
    return {
      moveDiv: "",
    };
  },
  mounted() {
    const self = this;
    self.moveDiv = document.getElementById(self.id);
    window.onmouseup = function (e) {
      self.mousedownState = false;
      self.mouseUpCallBack(e.clientX, e.clientY, self.componentsClone);
      self.components = [];
    };
    window.onmousemove = function (e) {
      if (self.mousedownState) {
        self.moveDiv.style.left = e.clientX - self.offsetX + "px";
        self.moveDiv.style.top = e.clientY - self.offsetY + "px";
        self.mouseMoveCallBack(e.clientX, e.clientY, self.componentsClone);
      }
    };
  },
  methods: {
    // mousemoveHandler(e) {
    //   const self = this;
    //   if (self.mousedownState) {
    //     self.moveDiv.style.left = e.clientX - self.offsetX + "px";
    //     self.moveDiv.style.top = e.clientY - self.offsetY + "px";
    //     self.mouseMoveCallBack(e.clientX, e.clientY, self.componentsClone);
    //   }
    // },
    // mouseupHandler(e) {
    //   const self = this;
    //   self.mousedownState = false;
    //   self.mouseUpCallBack(e.clientX, e.clientY, self.componentsClone);
    // },
  },
};
</script>