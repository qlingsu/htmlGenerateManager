<style lang="scss" scoped>
.zq-title {
  height: 16px;
  line-height: 16px;
  font-size: 16px;
  padding: 20px 15px 20px 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
<template>
  <div class="zq-title">
    <span style="border-left: 4px solid blue; margin-right: 10px"></span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zq-title",
};
</script>