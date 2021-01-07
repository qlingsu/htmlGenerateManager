<template>
  <div>
    <zq-title>{{ title }}</zq-title>
    <div style="padding: 20px">
      <zq-table>
        <zq-table-column>
          <template slot="label">数据组编号</template>
          <template slot="content">
            <el-input
              type="text"
              v-model="form.sourceGroupId"
              placeholder="请输入数据组编号"
            >
            </el-input>
          </template>
        </zq-table-column>

        <zq-table-column>
          <template slot="label">数据组名称</template>
          <template slot="content">
            <el-input
              type="text"
              v-model="form.sourceGroupName"
              placeholder="请输入数据组名称"
            >
            </el-input>
          </template>
        </zq-table-column>

        <zq-table-column>
          <template slot="label">数据源名称</template>
          <template slot="content"
            ><el-input
              type="text"
              v-model="form.sourceName"
              placeholder="请输入数据源名称"
            ></el-input
          ></template>
        </zq-table-column>

        <zq-table-column>
          <template slot="label">bean名称</template>
          <template slot="content"
            ><el-input
              type="text"
              v-model="form.beanName"
              placeholder="请输入bean名称"
            ></el-input
          ></template>
        </zq-table-column>

        <zq-table-column>
          <template slot="label">是否根据主题查询</template>
          <template slot="content">
            <el-radio-group v-model="form.themeQuery">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </template>
        </zq-table-column>

        <zq-table-column>
          <template slot="label">有效标志</template>
          <template slot="content">
            <el-radio-group v-model="form.effective">
              <el-radio label="有效"></el-radio>
              <el-radio label="无效"></el-radio>
            </el-radio-group>
          </template>
        </zq-table-column>

        <zq-table-column>
          <template slot="label">执行sql</template>
          <template slot="content">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入执行sql"
              v-model="form.sql"
            >
            </el-input
          ></template>
        </zq-table-column>
      </zq-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      sourceId: "",
      form: {
        sourceGroupId: "",
        sourceGroupName: "",
        sourceName: "",
        beanName: "",
        themeQuery: "",
        effective: "",
        sql: "",
      },
    };
  },
  watch: {
    $route: {
      handler() {
        const self = this;
        self.title = self.$route.params.sourceName;
        self.sourceId = self.$route.params.sourceId;
      },
      immediate: true,
    },
  },
};
</script>