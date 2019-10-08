<template>
  <el-container>
    <el-aside width="200px">
      <el-menu router :default-active="$route.path">
        <el-menu-item index="/">
          <i class="el-icon-house"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-tickets"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="/category">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>控制台</el-dropdown-item>
            <el-dropdown-item>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>超级管理员</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  background: #fff;
  border-right: solid 1px #e6e6e6;
  .el-menu {
    border: 0;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  }
};
</script>