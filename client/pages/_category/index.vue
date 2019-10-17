<template>
  <div class="category">
    <div class="article-list">
      <div class="item" v-for="(item, index) in articleList" :key="index">
        <nuxt-link class="title" :to="item.category.url + '/' + item._id">{{item.title}}</nuxt-link>
        <div class="des">{{item.des}}</div>
        <div class="bottom-info">
          <span>发布于：{{formatTime(item.addTime)}}</span>
          <span>
            作者：
            <span v-if="item.author">{{item.author.username}}</span>
            <span v-else>暂无信息</span>
          </span>
          <span>属于：{{item.category.name}} 分类</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $axios from "@/api/request.js";
import Api from "@/api";
import { formatTime } from "@/util/common.js";
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
      const navList = JSON.parse(sessionStorage.getItem("navList"));
      let activedCategory = navList.find((item, index) => {
        return item.url === this.$route.path;
      });
      $axios
        .get(Api.ArticlePageApi, {
          category: activedCategory._id
        })
        .then(res => {
          if (res.code === "000000") {
            this.articleList = res.data.result;
          }
        });
    },
    formatTime(date) {
      return formatTime(date, "s");
    }
  }
};
</script>

<style lang="scss">
.category {
  .article-list {
    .item {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      &:not(:first-child) {
        margin-top: 20px;
      }
      .title {
        text-decoration: none;
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