<style scoped lang="scss">
.zq-header {
  background-color: #1e4fa3;
  height: #{$titleHeight + "px"};
  line-height: #{$titleHeight + "px"};
  color: white;
  font-weight: bold;
  font-size: 24px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
<template>
  <div class="zq-header">
    <div>
      <div style="float: left">{{ title }}</div>
      <div style="float: right; display: flex; font-size: 16px">
        <el-dropdown>
          <span>
            <span
              class="icon iconfont iconyonghu"
              style="color: #ffffff; font-size: 16px"
            ></span>
            <span
              class="el-dropdown-link"
              style="color: #ffffff; font-size: 16px"
            >
              {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>用户信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div
          style="
            color: #ffffff;
            font-size: 16px;
            margin-left: 20px;
            cursor: pointer;
          "
          @click="logout"
        >
          <span
            class="icon iconfont iconswticontuichu"
            style="color: #ffffff; font-size: 16px"
          ></span>
          退出
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zq-header",
  computed: {
    userName() {
      return this.$store.state.userInfo.name;
    },
  },
  data() {
    return {
      title: window.appConfig.title,
    };
  },
  methods:{
    logout(){
      this.$router.push({name:"登录页"})
    }
  }
};
</script>