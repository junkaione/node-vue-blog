import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Index from '../views/Index/index.vue'
import User from '../views/User/index.vue'
import Article from '../views/Article/index.vue'
import Category from '../views/Category/index.vue'
import Comment from '../views/Comment/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index,
        },
        {
          path: 'user',
          name: 'user',
          component: User,
        },
        {
          path: 'article',
          name: 'article',
          component: Article,
        },
        {
          path: 'category',
          name: 'category',
          component: Category,
        },
        {
          path: 'comment',
          name: 'comment',
          component: Comment,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ]
})
