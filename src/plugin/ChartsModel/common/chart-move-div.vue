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
  <div
    class="chart-move-div"
    :id="id"
    v-show="mousedownState"
    @mousemove="mousemoveHandler"
    @mouseup="mouseupHandler"
  >
    <dom-list :components="components"></dom-list>
  </div>
</template>

<script>
export default {
  name: "chart-move-div",
  props: {
    components: {
      type: Array,
      default: function () {
        return [];
      },
    },
    mousedownState: {
      type: Boolean,
      default: false,
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    id:{
      type:String,
      default:"chartsDiv"
    }
  },
  data(){
    return {
      mouseMoveAction:false
    }
  },
  methods: {
    mousemoveHandler(e) {
      let self = this;
      if (self.mousedownState) {
        console.log("mousemoveEvent");
        let moveDiv = document.getElementById(self.id);
        moveDiv.style.left = e.clientX - self.offsetX + "px";
        moveDiv.style.top = e.clientY - self.offsetY + "px";
        self.mouseMoveAction = true;
        console.log(e.clientX, e.clientY);
        self.inFrameReturnId(e.clientX, e.clientY);
        
      }
    },
    mouseupHandler(e) {
      let self = this;
      self.mousedownState = false;
      self.mouseMoveAction = false;
      self.offsetX = 0;
      self.offsetY = 0;
      let id = self.inFrameReturnId(e.clientX, e.clientY );
      console.log("id = ",id);
    },
    //获取鼠标在的 widget-div 的id
    inFrameReturnId(x, y) {
      let self = this;
      let targetDiv = document.getElementsByClassName("zq-operater")[0];
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
          // if (self.mouseMoveAction) {
            //如果鼠标在移动状态
            console.log("widgetDiv.style",widgetDiv.style)
            widgetDiv.style.border = "2px dotted #50a0f9";
            // widgetDiv.style.backgroundColor = "#50a0f9";
          // }
        }
      });
      return id;
    },
  },
};
</script>