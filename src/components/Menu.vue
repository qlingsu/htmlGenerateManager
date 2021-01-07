<style lang="scss" scoped>
.zq-menu {
  width: #{$menuWidth + "px"};
  //   height: calc(100vh - #{$titleHeight+"px"});
  height: 100%;
  box-shadow: 20px 0px 10px -10px #{$boxShadow};
  overflow-y: auto;
}
.zq-menu::-webkit-scrollbar {
  width: 0 !important;
}
.zq-menu {
  -ms-overflow-style: none;
}
.zq-menu {
  overflow: -moz-scrollbars-none;
}
.zq-menu-item {
  height: #{$eachMenuHeight + "px"};
  line-height: #{$eachMenuHeight + "px"};
  padding-left: 10px;
  padding-right: 10px;
  color: #ffffff;
  background-color: #{$mainColor};
  border-bottom: 1px solid #ffffff;
}
.expand-icon {
  cursor: pointer;
  float: right;
}
.menu-icon {
  float: left;
  margin-right: 10px;
}
.search-input {
  border-radius: 20px;
  width: #{$menuWidth * 0.8+"px"};
  margin: 10px #{$menuWidth * 0.1+"px"};
}
</style>
<template>
  <div class="zq-menu">
    <div v-for="menu in menus" :key="menu.name">
      <div class="zq-menu-item">
        <span :class="'menu-icon icon iconfont ' + menu.icon"></span>
        <span>{{ menu.name }}</span>
        <span
          class="icon iconfont iconjiantoushang expand-icon"
          v-show="!!menu.showSubMenu"
          @click="handleShowSubMenu(menu)"
        ></span>
        <span
          class="icon iconfont iconai-arrow-down expand-icon"
          v-show="!menu.showSubMenu"
          @click="handleShowSubMenu(menu)"
        ></span>
      </div>
      <div v-show="menu.showSubMenu">
        <el-input
          placeholder="请输入查询消息"
          suffix-icon="el-icon-search"
          @input="inputHandler(menu)"
          v-model="menu.filterText"
          v-show="menu.type == 'tree'"
          class="search-input"
        >
        </el-input>
        <el-tree
          :data="menu.children"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          :ref="menu.name + 'tree'"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.children" class="icon iconfont iconwenjianjia">
            </span>
            <span v-else class="icon iconfont iconwenjian"></span>
            <span style="margin-left: 5px">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import { routes } from "@/router";
export default {
  name: "zq-menus",
  data() {
    return {
      routes: routes,
      menus: [
        {
          path: "theme",
          name: "图表组主题",
          showSubMenu: false,
          filterText: "",
          type: "tree",
          icon: "iconshuxingzujian",
          children: [
            {
              name: "就业情况",
              children: [
                {
                  name: "湖北就业监控",
                  path: "/theme/1/湖北就业监控",
                },
                {
                  name: "经办情况监控",
                  path: "/theme/2/经办情况监控",
                },
              ],
            },
            {
              name: "社会保障",
              children: [
                {
                  name: "湖北就业监控",
                  path: "/theme/3/湖北就业监控",
                },
                {
                  name: "经办情况监控",
                  path: "/theme/4/经办情况监控",
                },
              ],
            },
            {
              name: "人才引育",
              children: [
                {
                  name: "湖北就业监控",
                },
                {
                  name: "经办情况监控",
                },
              ],
            },
          ],
        },
        {
          path: "component",
          name: "组件",
          showSubMenu: false,
          filterText: "",
          type: "list",
          icon: "icontupian",
          children: [
            {
              name: "饼图",
              path: "/component/1/饼图",
            },
            {
              name: "柱状图",
              path: "/component/2/柱状图",
            },
            {
              name: "折线图",
              path: "/component/3/折线图",
            },
            {
              name: "条形图",
              path: "/component/4/条形图",
            },
            {
              name: "概览",
              path: "/component/5/概览",
            },
          ],
        },
        {
          path: "source",
          name: "数据源",
          showSubMenu: false,
          filterText: "",
          type: "tree",
          icon: "iconpeizhishujuyuan",
          children: [
            {
              name: "就业情况",
              children: [
                {
                  name: "数据源1",
                  path: "/source/1/数据源1",
                },
                {
                  name: "数据源2",
                  path: "/source/2/数据源2",
                },
              ],
            },
            {
              name: "社会保障",
              children: [
                {
                  name: "数据源3",
                  path: "/source/3/数据源3",
                },
                {
                  name: "数据源4",
                  path: "/source/4/数据源4",
                },
              ],
            },
          ],
        },

        {
          path: "charts",
          name: "图表",
          showSubMenu: false,
          filterText: "",
          type: "tree",
          icon: "icontubiao-01",
          children: [
            {
              name: "就业情况",
              children: [
                {
                  name: "就业人员分布",
                  path: "/charts/1/就业人员分布",
                },
                {
                  name: "就业人员行业类别",
                  path: "/charts/2/就业人员行业类别",
                },
              ],
            },
            {
              name: "社会保障",
              children: [
                {
                  name: "就业人员分布",
                },
                {
                  name: "就业人员行业类别",
                },
              ],
            },
            {
              name: "人才引育",
              children: [
                {
                  name: "就业人员分布",
                },
                {
                  name: "就业人员行业类别",
                },
              ],
            },
            {
              name: "劳动关系",
              children: [
                {
                  name: "就业人员分布",
                },
                {
                  name: "就业人员行业类别",
                },
              ],
            },
            {
              name: "人才服务",
              children: [
                {
                  name: "就业人员分布",
                },
                {
                  name: "就业人员行业类别",
                },
              ],
            },
          ],
        },
        {
          path: "user",
          name: "用户管理",
          showSubMenu: false,
          filterText: "",
          type: "list",
          icon: "iconyonghuguanli",
          children: [
            {
              name: "用户管理",
              path: "/user",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },

  mounted() {
    console.log(this.routes);
    const self = this;
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      if (data.path) {
        this.$router.push(data.path);
      }
    },
    handleShowSubMenu(menu) {
      const self = this;
      console.log();
      menu.showSubMenu = !menu.showSubMenu;
    },
    inputHandler(menu) {
      const self = this;
      const filterText = menu.filterText;
      self.$refs[menu.name + "tree"][0].filter(filterText);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
  },
};
</script>