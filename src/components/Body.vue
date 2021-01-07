<style lang="scss" scoped>
.zq-body {
  width: 100vw;
  height: calc(100vh - #{$titleHeight+1+"px"});
  display: flex;
}
.zq-content {
  height: 100%;
  width: calc(100vw - #{$menuWidth + "px"});
  overflow-y: auto;
}
.router-view {
  margin: 20px;
  background-color: white;
  padding: 10px;
  min-height: calc(100% - 80px);
  box-shadow: 0px 0px 10px 10px #{$boxShadow};
}
</style>
<template>
  <div class="zq-body">
    <zq-menus></zq-menus>
    <div class="zq-content">
      <router-view class="router-view" />
    </div>
  </div>
</template>
<script>
export default {
  name: "zq-body",
};
</script>