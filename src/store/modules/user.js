import { login, getInfo } from '@/api/login'
import { setToken, getToken } from '@/utils/auth.js'
const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      roles: [],
      permissions: []
    }),
    actions: {
      login(userInfo) {
        return new Promise((resolve, reject) => {
          login({...userInfo}).then(res => {
            resolve(res)
            setToken(res.token)
            this.token = res.token
            console.log(this.token,'res')
          }).catch(err => {
            reject(err)
          })
        })
      },
      getInfo() {
        return new Promise((resolve, reject) => {
          getInfo().then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
  }
)

export default useUserStore