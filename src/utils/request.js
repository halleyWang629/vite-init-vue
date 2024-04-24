import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "@/utils/auth.js";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
})

service.interceptors.request.use(config => {
  const notToken = (config.headers || {}).isToken === false
  if(getToken() && !notToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
})
service.interceptors.response.use(res => {
  const code = res.data.code
  const msg = res.data.msg
  if(code == 401) {
    return Promise.reject('无效会话，或会话已过期，请重新登录！')
  }else if(code == 500) {
    ElMessage({ message: msg, type: 'error'})
    return Promise.reject(new Error(msg))
  }else if(code != 200) {
    return Promise.reject(msg)
  }else {
    return res.data
  }
})

export default service