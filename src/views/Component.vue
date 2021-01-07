<style lang="scss" scoped>
.zq-charts-item {
  width: 285px;
  border: 1px solid #ccc;
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
}
.zq-charts-item:hover {
  background-color: #{$mainColor};
  color: #ffffff;
}
</style>
</script>
<template>
  <div>
    <zq-title>{{ title }}</zq-title>
    <div style="display: flex; flex-wrap: wrap;margin-left: 15px;">
      <div
          v-for="(charts, index) in components"
          :key="index"
          class="zq-charts-item"
        >
        <div>{{charts.alias||charts.name}}</div>
        <dom-list :components="[charts]"></dom-list>
        
      </div>
    </div>
  </div>
</template>
<script>
import componentApi from "@/api/componentApi";
export default {
  data() {
    return {
      title: "",
      componentId: "",
      components: [],
    };
  },
  watch: {
    $route: {
      handler() {
        const self = this;
        self.title = self.$route.params.componentName;
        self.componentId = self.$route.params.componentId;
        componentApi
          .getComponentsByGroup({ groupId: self.componentId })
          .then((result) => {
            console.log("result = ",result);
            self.components = result.components;
          });
      },
      immediate: true,
    },
  },
  mounted() {
    const self = this;
  },
};
</script>