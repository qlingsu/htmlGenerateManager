<style scoped>
.widget-div {
  width: 90%;
  min-height: 140px;
  background-color: #ffffff;
  margin: 10px auto;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  position: relative;
}
/* widget占位 */
.widget-position {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -7px;
  margin-left: -18px;
  width: 36px;
  height: 14px;
  font-size: 14px;
}
</style>
<template>
  <!--框架的输入框，用于装图表组件-->
  <div class="widget-div" :id="item.id">
    <dom-list :components="item.components"></dom-list>
  </div>
</template>
<script>
export default {
  name: "widget-div",
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          id: "",
          components: [
            {
              name: "div",
              style: {
                color: "#e1e1e1",
              },
              slot: "拖动到此处",
            },
          ],
        };
      },
    },
  },
};
</script>