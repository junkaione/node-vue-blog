<template>
  <div class="user">
    <el-form ref="searchForm" :model="searchInfo" :inline="true">
      <el-form-item>
        <el-input placeholder="用户名" v-model="searchInfo.username" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.type" placeholder="用户类型" clearable>
          <el-option label="超级管理员" :value="1"></el-option>
          <el-option label="普通用户" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
        <el-button icon="el-icon-edit" type="primary">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="用户名" width="300"></el-table-column>
      <el-table-column prop="type" label="用户类型" width="300"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          username: "2016-05-02",
          type: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          username: "2016-05-04",
          type: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          username: "2016-05-01",
          type: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ],
      searchInfo: {}
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>