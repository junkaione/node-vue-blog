<template>
  <div class="comment">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="_id" label="评论ID" width="300"></el-table-column>
      <el-table-column label="文章名" width="300">
        <template slot-scope="scope">
          <div>{{scope.row.article.title}}</div>
        </template>
      </el-table-column>
      <el-table-column label="评论用户" width="300">
        <template slot-scope="scope">
          <div>{{scope.row.user.username}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="评论内容" width="300"></el-table-column>
      <el-table-column prop="updatedTime" label="最后更新时间" width="300">
        <template slot-scope="scope">
          <div>{{formatTime(scope.row.updatedTime)}}</div>
        </template>
      </el-table-column>
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
        <el-form-item label="评论内容：">
          <WangEditor v-model="changeInfo.comment" />
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
    this.getCommentPage();
  },
  methods: {
    getCommentPage() {
      this.$get(Api.CommentPageApi, this.searchInfo).then(res => {
        this.tableData = res.data.result;
        this.total = res.data.total;
      });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "添加";
      this.handleChangeUrl = Api.CommentAddApi;
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.dialogTitle = "修改";
      this.handleChangeUrl = Api.CommentUpdateApi;
      this.changeInfo = JSON.parse(JSON.stringify(row));
    },
    handleDel(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(Api.CommentDelApi, {
          _id: row._id
        }).then(res => {
          if (res.code === "000000") {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.getCommentPage();
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
          this.getCommentPage();
        }
      });
    },
    handleCurrentChange(val) {
      this.searchInfo.currentPage = val;
      this.getCommentPage();
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
.comment {
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