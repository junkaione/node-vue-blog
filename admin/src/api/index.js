const Host = 'http://localhost:3000'

export default {
  LoginApi: `${Host}/user/login`, //用户登录
  UserPageApi: `${Host}/user/page`, //用户列表
  UserAddApi: `${Host}/user/reg`, //用户新增
  UserEditApi: `${Host}/user/update`, //用户修改
  UserDelApi: `${Host}/user/del`, //用户删除

  ArticlePageApi: `${Host}/article/page`, //文章列表
  ArticleAddApi: `${Host}/article/add`, //文章新增
  ArticleUpdateApi: `${Host}/article/update`, //文章修改
  ArticleDelApi: `${Host}/article/del`, //文章删除

  CategoryPageApi: `${Host}/category/list`, //分类列表
  CategoryAddApi: `${Host}/category/add`, //分类新增
  CategoryUpdateApi: `${Host}/category/update`, //分类修改
  CategoryDelApi: `${Host}/category/del`, //分类删除
}