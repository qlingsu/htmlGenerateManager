<style lang="scss">
.global-table-header {
  background-color:#{$backgroundGray} !important;
  color: #000000;
}
//页码文字颜色更改
.el-pager li.active {
  color: #ffffff !important;
}
// 树节点高亮
.el-tree-node:focus > .el-tree-node__content {
  background-color: #{$backgroundGray} !important;
}
//树节点字体样式
.el-tree-node__label {
  // width: auto;
  // margin-top: 12px;
  // float: right;
  // font-size: 14px;
  // height: 40px;
  // line-height: 40px;
  // letter-spacing: 1px;
}

// //树节点高度
.el-tree-node__content{
  height: 40px !important;
  line-height: 40px !important;
}
</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
