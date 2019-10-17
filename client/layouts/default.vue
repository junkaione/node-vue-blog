<template>
  <div class="nuxt-layout">
    <div class="head">
      <div class="title">张仿松个人博客</div>
      <div class="des">张仿松个人博客是一个关注PHP技术的个人博客，提供一个互联网从业者的学习成果和工作经验总结。</div>
    </div>
    <div class="nav">
      <nuxt-link
        :to="item.url"
        class="nav-item"
        v-for="(item, index) in navList"
        :key="index"
      >{{item.name}}</nuxt-link>
    </div>
    <div class="main">
      <div class="content">
        <nuxt />
      </div>
      <div class="side">
        <div class="search">
          <input class="primary-input" type="text" placeholder="搜索" />
          <button class="primary-btn">搜索</button>
        </div>
        <div class="hot-article">
          <div class="title">热门文章</div>
          <div class="list">
            <nuxt-link
              class="item"
              :to="item.category.url + '/' + item._id"
              v-for="(item, index) in hotArticleList"
              :key="index"
            >{{item.title}}</nuxt-link>
          </div>
        </div>
        <div class="updated-article">
          <div class="title">最新文章</div>
          <div class="list">
            <nuxt-link
              class="item"
              :to="item.category.url + '/' + item._id"
              v-for="(item, index) in updatedArticleList"
              :key="index"
            >{{item.title}}</nuxt-link>
          </div>
        </div>
        <div class="category">
          <div class="title">分类目录</div>
          <div class="list">
            <nuxt-link
              class="item"
              :to="item.url"
              v-for="(item, index) in navList"
              :key="index"
            >{{item.name}}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="copy">
      <div class="links">
        友情链接：
        <a href="http://baidu.com">百度</a>
        <a href="http://taobao.com">淘宝</a>
      </div>
      <div class="copy-info">渝ICP备88888888号-1</div>
    </div>
  </div>
</template>

<script>
import $axios from "@/api/request.js";
import Api from "@/api";
export default {
  data() {
    return {
      navList: [],
      hotArticleList: [],
      updatedArticleList: []
    };
  },
  mounted() {
    this.getNavList();
    this.getHotArticleList();
    this.getUpdatedArticleList();
  },
  methods: {
    getNavList() {
      $axios.get(Api.CategoryPageApi).then(res => {
        if (res.code === "000000") {
          res.data.unshift({
            name: "首页",
            url: "/"
          });
          this.navList = res.data;
        }
      });
    },
    getHotArticleList() {
      $axios.get(Api.ArticlePageApi, { viewNum: -1, pageSize: 4 }).then(res => {
        if (res.code === "000000") {
          this.hotArticleList = res.data.result;
        }
      });
    },
    getUpdatedArticleList() {
      $axios.get(Api.ArticlePageApi, { updatedTime: -1 }).then(res => {
        if (res.code === "000000") {
          this.updatedArticleList = res.data.result;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/common.css";
.nuxt-layout {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
  .head {
    .title {
      color: #515151;
      font-size: 26px;
      font-weight: bold;
    }
    .des {
      color: #757575;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .nav {
    display: flex;
    margin-top: 20px;
    margin-bottom: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ededed;
    border-top: 1px solid #ededed;
    .nav-item {
      width: 100px;
      text-align: center;
      color: #6a6a6a;
      text-decoration: none;
    }
  }
  .main {
    display: flex;
    .content {
      width: 70%;
    }
    .side {
      width: 30%;
      .search {
        width: 260px;
        display: flex;
        justify-content: space-between;
      }
      .hot-article {
        .title {
          margin-top: 50px;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 15px;
          color: #636363;
        }
        .list {
          font-size: 13px;
          line-height: 30px;
          display: flex;
          flex-direction: column;
          .item {
            color: #757575;
          }
        }
      }
      .updated-article {
        .title {
          margin-top: 50px;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 15px;
          color: #636363;
        }
        .list {
          font-size: 13px;
          line-height: 30px;
          display: flex;
          flex-direction: column;
          .item {
            color: #757575;
          }
        }
      }
      .category {
        .title {
          margin-top: 50px;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 15px;
          color: #636363;
        }
        .list {
          font-size: 13px;
          line-height: 30px;
          display: flex;
          flex-direction: column;
          .item {
            color: #757575;
          }
        }
      }
    }
  }
  .copy {
    margin-top: 50px;
    font-size: 12px;
    .links {
      color: #444;
      margin-left: 10px;
      line-height: 50px;
      border-bottom: 1px solid #ededed;
      border-top: 1px solid #ededed;
      a {
        color: #686868;
        text-decoration: none;
      }
    }
    .copy-info {
      color: #444;
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
