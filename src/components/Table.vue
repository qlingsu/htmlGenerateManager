<style lang="scss">
.zq-table {
  border-top: 1px solid #{$borderColor};
  border-left: 1px solid #{$borderColor};
  border-collapse: collapse; /*设置单元格的边框合并为1*/
  th,
  td {
    border-bottom: 1px solid #{$borderColor};
    border-right: 1px solid #{$borderColor};
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
  }
  td:first-child {
    background-color: #f4f6f9;
    padding-left: 10px;
    padding-right: 80px;
    font-weight: bold;
  }
}
</style>
<template>
  <div>
    <table class="zq-table">
      <slot></slot>
    </table>
  </div>
</template>
<script>
export default {
  name: "zq-table",
  prop:{
      align:{//对齐方向
          type:String,
          default:"left"
      }
  }
};
</script>