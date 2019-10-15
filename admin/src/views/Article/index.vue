<template>
  <div class="article">
    <el-form ref="searchForm" :model="searchInfo" :inline="true">
      <el-form-item>
        <el-input placeholder="文章标题" v-model="searchInfo.title" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchInfo.category" placeholder="文章分类" clearable>
          <el-option
            v-for="(item, index) in CategoryList"
            :key="index"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="文章作者" v-model="searchInfo.author" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="getArticleList">搜索</el-button>
        <el-button icon="el-icon-edit" type="primary" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="_id" label="文章ID"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column label="文章分类">
        <template slot-scope="scope">
          <div>{{scope.row.category.name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="作者">
        <template slot-scope="scope">
          <div>{{scope.row.author.username}}</div>
        </template>
      </el-table-column>
      <el-table-column label="新增时间">
        <template slot-scope="scope">
          <div>{{formatTime(scope.row.addTime)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="最后更新时间">
        <template slot-scope="scope">
          <div>{{formatTime(scope.row.updatedTime)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="commentNum" label="评论量"></el-table-column>
      <el-table-column prop="viewNum" label="阅读量"></el-table-column>
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
      width="50%"
      top="5vh"
      @close="handleClose"
    >
      <el-form ref="changeForm" :model="changeInfo" label-width="90px">
        <el-form-item label="文章标题：">
          <el-input v-model="changeInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类：">
          <el-select v-model="changeInfo.category" placeholder="文章分类" clearable>
            <el-option
              v-for="(item, index) in CategoryList"
              :key="index"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容：">
          <WangEditor v-model="changeInfo.content" />
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
import { formatTime } from "@/util/common.js";
import WangEditor from "@/components/wangEditor";

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      searchInfo: {
        currentPage: 1,
        pageSize: 10
      },
      CategoryList: [],
      changeInfo: {},
      dialogVisible: false,
      dialogTitle: "",
      handleChangeUrl: ""
    };
  },
  components: {
    WangEditor
  },
  mounted() {
    this.getArticleList();
    this.getCategoryList();
  },
  methods: {
    getArticleList() {
      this.$get(Api.ArticlePageApi, this.searchInfo).then(res => {
        this.tableData = res.data.result;
        this.total = res.data.total;
      });
    },
    getCategoryList() {
      this.$get(Api.CategoryPageApi).then(res => {
        this.CategoryList = res.data;
      });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "添加";
      this.handleChangeUrl = Api.ArticleAddApi;
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "修改";
      this.handleChangeUrl = Api.ArticleUpdateApi;
      this.$get(Api.ArticlePageApi, { _id: row._id }).then(res => {
        res.data.category = res.data.category._id;
        this.changeInfo = res.data;
      });
    },
    handleDel(row) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(Api.ArticleDelApi, {
          _id: row._id
        }).then(res => {
          if (res.code === "000000") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getArticleList();
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
          this.getArticleList();
        }
      });
    },
    handleCurrentChange(val) {
      this.searchInfo.currentPage = val;
      this.getArticleList();
    },
    handleClose() {
      this.changeInfo = {};
    },
    formatTime(date) {
      return formatTime(date, "s");
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
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