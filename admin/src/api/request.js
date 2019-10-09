import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

// 默认超时设置
axios.defaults.timeout = 50000;

// 相对路径设置
axios.defaults.baseURL = '';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // 获取token
    const token = localStorage.getItem('token');

    // 添加token到headers
    if (token) {
      config.headers.token = token
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    //一些统一code的返回处理
    if (response.data.code === '999999') {
      // 登录验证
      //做了个示例跳转项目中登录，并记录下相对路径
      router.push({
        name: 'login',//从哪个页面跳转
        query: {
          retUrl: window.location.href.split('#')[1] || '',
          is_new_user_url: 1
        }
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
);

/* 封装get请求 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        if (response.data.code === '000000') {
          //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          resolve(response.data);
        } else {
          //错误处理
          Message({
            type: 'warning',
            message: response.data.msg
          })
        }
      })
      .catch(err => {
        reject(err);
        let message = '请求失败！请检查网络';
        //错误返回
        if (err.response) message = err.response.data.msg;
        Message({
          type: 'warning',
          message
        })
      })
  })
}

/* 封装post请求 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.data.code === '000000') {
          resolve(response.data);
        } else {
          //错误处理
          Message({
            type: 'warning',
            message: response.data.msg
          })
        }
      }, err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if (err.response) message = err.response.data.msg;
        Message({
          type: 'warning',
          message
        })
      })
  })
}