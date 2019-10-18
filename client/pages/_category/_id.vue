<template>
  <div class="detail">
    <div class="article-detail" v-if="articleDetail">
      <div class="title">{{articleDetail.title}}</div>
      <div class="content" v-html="articleDetail.content"></div>
      <div class="bottom-info">
        <span>发布于：{{formatTime(articleDetail.addTime)}}</span>
        <span>
          作者：
          <span v-if="articleDetail.author">{{articleDetail.author.username}}</span>
          <span v-else>暂无信息</span>
        </span>
        <span>属于：{{articleDetail.category.name}}分类</span>
        <span>阅读量：{{articleDetail.viewNum}}</span>
        <span>评论量：{{articleDetail.commentNum}}</span>
      </div>
      <div class="comment">
        <div class="item">
          <img src="@/assets/img/author.jpg" alt="" width="44px">
          <div class="info">
            <div class="username">kai45666</div>
            <div class="time">6分钟前</div>
          </div>
          <div class="content">1111</div>
        </div>
        <div class="item">
          <img src="@/assets/img/author.jpg" alt="" width="44px">
          <div class="info">
            <div class="username">kai45666</div>
            <div class="time">6分钟前</div>
          </div>
          <div class="content">1111</div>
        </div>
        <div class="item">
          <img src="@/assets/img/author.jpg" alt="" width="44px">
          <div class="info">
            <div class="username">kai45666</div>
            <div class="time">6分钟前</div>
          </div>
          <div class="content">1111</div>
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
      articleDetail: null,
      commentList: []
    };
  },
  mounted() {
    this.getArticleDetail();
    this.getCommentList();
  },
  methods: {
    getArticleDetail() {
      $axios
        .get(Api.ArticlePageApi, {
          _id: this.$route.params.id
        })
        .then(res => {
          if (res.code === "000000") {
            this.articleDetail = res.data;
          }
        });
    },
    getCommentList() {
      $axios
        .get(Api.CommentPageApi, {
          article: this.$route.params.id
        })
        .then(res => {
          if (res.code === "000000") {
            this.commentList = res.data.result;
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
.detail {
  .article-detail {
    width: 1000px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    .title {
      text-decoration: none;
      color: #21759b;
      font-size: 22px;
    }
    .content {
      margin: 20px 0;
      color: #444444;
      font-size: 14px;
      line-height: 24px;
    }
    .bottom-info {
      color: #757575;
      font-size: 13px;
    }
    .comment {
      margin-top: 50px;
      .item {
        display: flex;
        align-items: center;
        .info {
          width: 8%;
          margin-left: 10px;
          .username {
            font-size: 14px;
            color: #444;
          }
          .time {
            color: #5e5e5e;
            font-size: 12px;
          }
        }
        .content {
          font-size: 15px;
          color: #444;
        }
      }
    }
  }
}
</style>