import router from '@/router'
import { getToken } from '@/utils/auth.js'
import useUserStore  from '@/store/modules/user'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if(getToken()) { // 有token放行
    if(to.path === '/login') {
      next({path: '/'})
    }
    else {
      if(useUserStore().roles.length === 0) {
        useUserStore().getInfo().then(res => {
          
        }).catch(err => {
          
        })
        next() // @@TODO 先放行
      }else {
        next()
      }
    }
  }else {  // 无token
    if(whiteList.indexOf(to.path)!==-1){
      next()
    }else{
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})