import axios from 'axios'
import { baseUrl as baseURL } from "@/config/config";
import store from '../store';

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL,
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log('请求拦截的数据', config)
    if (store.state.token) {
      // 将token设置在headers ['Authorization'] 上面
      config.headers['Authorization'] = `Bearer ${store.state.token}`
    }

    return config
  }, err => {
    return alert(err)
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, ({ response }) => {
    if (!response) return alert(`网络请求未响应`)
    const URL = response.config.baseURL + response.config.url
    if (response.status === 401) alert(`${URL}---401错误---请求未通过认证`)
    if (response.status === 404) alert(`${URL}---404错误---找不到资源`)
    if (response.status === 500) alert(`${URL}---500错误---服务器异常`)
    return Promise.reject(response)
  })

  // 3.发送真正的网络请求
  return instance(config)
}