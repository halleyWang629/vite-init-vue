import request from '@/utils/request'

export function getCodeImg() {
  return request({
    url: '/captchaImage', // @@TODO查询一下到底为啥不能访问？？？？？
    Headers: {
      isToken: false
    },
    method: 'get'
  })
}

export function login(params) {
  return request({
    url: '/login', // @@TODO查询一下到底为啥不能访问？？？？？
    Headers: {
      isToken: false
    },
    method: 'post',
    data: params
  })
}

export function getInfo() {
  return request({
    url: '/getInfo', 
    method: 'get'
  })
}