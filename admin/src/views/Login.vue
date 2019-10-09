<template>
  <div class="login">
    <div class="content">
      <div class="title">博客后台登录</div>
      <el-form ref="loginForm" :model="loginInfo">
        <el-form-item>
          <el-input v-model="loginInfo.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginInfo.password" show-password prefix-icon="el-icon-unlock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginInfo: {}
    };
  },
  methods: {
    handleLogin() {
      this.$post("http://localhost:3000/user/login").then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d3a4b;
  .content {
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      margin: 20px 0;
    }
    height: 200px;
    width: 350px;
    text-align: center;
    .el-button {
      width: 100%;
    }
  }
}
</style>