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
}