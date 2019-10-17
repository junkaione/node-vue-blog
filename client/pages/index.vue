<template>
  <div class="index">
    <div class="article-list">
      <div class="item" v-for="(item, index) in articleList" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="des">{{item.content}}</div>
        <div class="bottom-info">
          <span>发布于：2019-10-16</span>
          <span>作者：2019-10-16</span>
          <span>属于：Linux 分类</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $axios from "@/api/request.js";
import Api from "@/api";
export default {
  data() {
    return {
      articleList: []
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      $axios.get(Api.ArticlePageApi).then(res => {
        if (res.code === "000000") {
          this.articleList = res.data.result;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.index {
  .article-list {
    .item {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      &:not(:first-child) {
        margin-top: 20px;
      }
      .title {
        outline: none;
        color: #21759b;
        font-size: 22px;
      }
      .des {
        margin: 20px 0;
        color: #444444;
        font-size: 14px;
        line-height: 24px;
      }
      .bottom-info {
        color: #757575;
        font-size: 13px;
      }
    }
  }
}
</style>