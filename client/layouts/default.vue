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
    <nuxt />
    <div class="copy">
      <div class="links">
        友情链接：
        <span>百度</span>
        <span>淘宝</span>
      </div>
      <div class="copy-info">浙ICP备16000810号-2</div>
    </div>
  </div>
</template>

<script>
import $axios from "@/api/request.js";
import Api from "@/api";
export default {
  data() {
    return {
      navList: []
    };
  },
  mounted() {
    this.getNavList();
  },
  methods: {
    getNavList() {
      $axios.get(Api.CategoryPageApi).then(res => {
        if (res.code === "000000") {
          res.data.unshift({
            name: "全部",
            url: "/"
          });
          this.navList = res.data;
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
  .copy {
    margin-top: 50px;
    font-size: 12px;
    .links {
      color: #444;
      margin-left: 10px;
      line-height: 50px;
      border-bottom: 1px solid #ededed;
      border-top: 1px solid #ededed;
      span {
        color: #686868;
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
