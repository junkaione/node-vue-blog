const Host = 'http://localhost:3000'

export default {
  LoginApi: `${Host}/user/login`, //用户登录
  UserPageApi: `${Host}/user/page`, //用户列表
  UserAddApi: `${Host}/user/reg`, //用户新增
  UserEditApi: `${Host}/user/update`, //用户修改
  UserDelApi: `${Host}/user/del` //用户删除
}