<template>
  <div class="login">
    <el-form ref="loginRef" class="login-form" :rules="loginRules" :model="loginForm">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" size="large" placeholder="用户">
          <template #prefix>
            <el-icon :size="15">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" placeholder="密码">
          <template #prefix>
            <el-icon :size="15">
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" size="large" placeholder="验证码" style="width: 63%">
          <template #prefix>
            <el-icon :size="15">
              <Discount />
            </el-icon>
          </template>
        </el-input>
        <div class="login-code">
          <img class="login-code-img" :src="codeUrl" alt="" @click="getCode()" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.remberMe" class="record-password">记住密码</el-checkbox>
      <el-form-item>
        <el-button class="login-btn" size="large" @click="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  // import { ref, getCurrentInstance } from 'vue'
  import { getCodeImg } from '@/api/login'
  import useUserStore  from '@/store/modules/user'
  import { watch } from 'vue'

  const codeUrl = ref('')
  const loginForm = ref({
    username: 'admin',
    password: 'admin123',
    code: '',
    remberMe: false,
    uuid: ''
  })
  const route =  useRoute()
  const router = useRouter()
  const loginRules = {
    username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
    password: [{required: true, trigger: 'blur', message: '请输入密码'}],
    code: [{required: true, trigger: 'blur', message: '请输入验证码'}],
  }
  const { proxy } = getCurrentInstance()
  const useStore = useUserStore()
  const redirect = ref(undefined)
  
  watch(route, newRoute => {
    console.log('newRoute', newRoute)
    redirect.value = newRoute.query && newRoute.query.redirect
    console.log('redirect.value', redirect.value)
  }, { immediate: true })

  function handleLogin() {
    proxy.$refs.loginRef.validate(valid => {
      if(valid) {
        useStore.login({...loginForm.value}).then(res => {
          router.push(redirect.value || '/')
        }).catch(error => {
          console.log(error,'登录异常')
        })
      }
    })
  }
  function getCode() {
    getCodeImg().then(res => {
      codeUrl.value = "data:image/gif;base64," + res.img
      loginForm.value.uuid = res.uuid
    })
  }
  getCode()
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../assets/images/login-background.png');
    background-size: cover;
  }
  .login-form {
    border-radius: 6px;
    background: #fff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #C91717;
      font-weight: bolder;
      font-size: 25px;
    }
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .login-code {
      width: 33%;
      height: 40px;
      .login-code-img {
        height: 40px;
        padding-left: 12px;
        cursor: pointer;
      }
    }
    .record-password {
      color: #C91717;
      margin: 0 0 20px 0;
    }
    .login-btn {
      color: #fff;
      background-color: #C91717;
      width: 100%;
    }
  }
</style>