<template>
  <div>
    <el-input v-model="userName"></el-input>
    <el-input v-model="password" type="password"></el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "用户管理" });
    },
  },
};
</script>