<style lang="scss" scoped>
</style>
<template>
  <div>
    <zq-title>用户管理</zq-title>
    <div style="margin-bottom:20px;">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        style="width: 300px; float: left"
      >
      </el-input>
      <el-button type="primary" style="margin-left: 20px">搜索</el-button>
      <el-button
        type="primary"
        style="margin-left: 20px; float: right;"
        icon="el-icon-plus"
        @click="addUserDialog"
        >新增用户</el-button
      >
    </div>

    <el-table
      header-cell-class-name="global-table-header"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column fixed prop="name" label="用户名称"> </el-table-column>

      <el-table-column prop="dept" label="所属部门"> </el-table-column>

      <el-table-column prop="auth" label="用户权限级别"> </el-table-column>

      <el-table-column prop="date" label="创建时间"> </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <el-dialog
      title="新增用户"
      :visible.sync="addUserDialogVisible"
      width="600"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="form.dept"></el-input>
        </el-form-item>
        <el-form-item label="用户权限">
          <el-input v-model="form.auth"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.telphone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 100,
      searchInput: "",
      addUserDialogVisible: false,
      form: {
        name: "",
        dept: "",
        auth: "",
        telphone: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          dept: "事业部1",
          auth: "省市县",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          dept: "事业部1",
          auth: "省市县",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          dept: "事业部1",
          auth: "省市县",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          dept: "事业部1",
          auth: "省市县",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          dept: "事业部1",
          auth: "省市县",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          dept: "事业部1",
          auth: "省市县",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          dept: "事业部1",
          auth: "省市县",
        },
      ],
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit(row) {
      const self = this;
      self.form = row;
      self.addUserDialogVisible = true;
    },
    addUserDialog() {
      const self = this;
      self.form = {
        name: "",
        dept: "",
        auth: "",
        telphone: "",
      };
      self.addUserDialogVisible = true;
    },
  },
};
</script>