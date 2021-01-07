<style scoped lang="scss">
.zq-charts-container {
  border: 1px solid #{$borderColor};
  border-radius: 5px;
  width: #{$clientWidth + "px"};
  margin-left: 20px;
}
</style>
<template>
  <div>
    <div >
      <zq-title>{{ title }}</zq-title>
      <div style="padding: 20px; display: flex;">
        <div>
          <zq-table>
            <zq-table-column>
              <template slot="label">图表ID</template>
              <template slot="content">
                <el-input v-model="form.id" placeholder=""></el-input>
              </template>
            </zq-table-column>

            <zq-table-column>
              <template slot="label">图表名称</template>
              <template slot="content">
                <el-input
                  v-model="form.name"
                  placeholder="请输入图表名称"
                ></el-input>
              </template>
            </zq-table-column>

            <zq-table-column>
              <template slot="label">图表描述</template>
              <template slot="content">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入图表描述"
                  v-model="form.describe"
                >
                </el-input>
              </template>
            </zq-table-column>

            <zq-table-column>
              <template slot="label">使用组件</template>
              <template slot="content">
                <el-select v-model="form.componentName" placeholder="请选择">
                  <el-option
                    v-for="item in form.componentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </zq-table-column>

            <zq-table-column>
              <template slot="label">接口A</template>
              <template slot="content">
                <el-select v-model="form.interface1" placeholder="请选择">
                  <el-option
                    v-for="item in form.interface1Option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </zq-table-column>

            <zq-table-column>
              <template slot="label">接口B</template>
              <template slot="content">
                <el-select v-model="form.interface2" placeholder="请选择">
                  <el-option
                    v-for="item in form.interface2Option"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </zq-table-column>

          </zq-table>

          <el-button type="primary" style="margin-top: 20px">确定</el-button>
        </div>

        <div class="zq-charts-container">
          <dom-list :components="components"></dom-list>
        </div>
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
      form: {
        id: "",
        name: "",
        describe: "",
        componentName: "",
        componentOptions: [],
        interface1: "",
        interface1Option: [
          { value: 1, label: "接口1" },
          { value: 2, label: "接口2" },
        ],
        interface2: "",
        interface2Option: [
          { value: 1, label: "接口1" },
          { value: 2, label: "接口2" },
        ],
      },
      components: [],
    };
  },
  watch: {
    $route: {
      handler() {
        this.title = this.$route.params.chartsName;
      },
      immediate: true,
    },
    "form.componentName"(val) {
      console.log("componentName = ", val);
      this.components = [
        {
          name: val,
        },
      ];
    },
  },
  mounted() {
    const self = this;
    componentApi.getComponentsGroup().then((result) => {
      console.log("allcomponents = ", result);
      var componentOptions = [];
      result.forEach((group) => {
        componentApi
          .getComponentsByGroup({
            groupId: group.id,
          })
          .then((res) => {
            res.components.forEach((charts) => {
              componentOptions.push({
                value: charts.name,
                label: charts.alias || charts.name,
              });
            });
          });
      });
      self.form.componentOptions = componentOptions;
    });
  },
};
</script>