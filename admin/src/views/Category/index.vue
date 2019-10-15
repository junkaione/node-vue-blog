<template>
  <div class="category">
    <el-form ref="searchForm" :model="searchInfo" :inline="true">
      <el-form-item>
        <el-input placeholder="分类名" v-model="searchInfo.name" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="getCategoryList">搜索</el-button>
        <el-button icon="el-icon-edit" type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="_id" label="分类ID" width="300"></el-table-column>
      <el-table-column prop="name" label="分类名" width="300"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="searchInfo.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog
      class="dialog"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%"
      @close="handleClose"
    >
      <el-form ref="changeForm" :model="changeInfo" label-width="90px">
        <el-form-item label="分类名：">
          <el-input v-model="changeInfo.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api";

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      searchInfo: {
        currentPage: 1,
        pageSize: 10
      },
      changeInfo: {},
      dialogVisible: false,
      dialogTitle: "",
      handleChangeUrl: ""
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      this.$get(Api.CategoryPageApi, this.searchInfo).then(res => {
        this.tableData = res.data.result;
        this.total = res.data.total;
      });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "添加";
      this.handleChangeUrl = Api.CategoryAddApi;
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "修改";
      this.handleChangeUrl = Api.CategoryUpdateApi;
      this.changeInfo = row;
    },
    handleDel(row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(Api.CategoryDelApi, {
          _id: row._id
        }).then(res => {
          if (res.code === "000000") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getCategoryList();
          }
        });
      });
    },
    handleSure() {
      this.$post(this.handleChangeUrl, this.changeInfo).then(res => {
        if (res.code === "000000") {
          this.dialogVisible = false;
          this.$message({
            type: "success",
            message: res.msg
          });
          this.getCategoryList();
        }
      });
    },
    handleCurrentChange(val) {
      this.searchInfo.currentPage = val;
      this.getCategoryList();
    },
    handleClose() {
      this.changeInfo = {};
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  .dialog {
    .el-form {
      padding: 0 50px;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>