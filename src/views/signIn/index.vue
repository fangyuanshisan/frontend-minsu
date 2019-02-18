<template>
  <div class="login-container">
    <el-form
      ref="signInForm"
      :model="signInForm"
      :rules="loginRules"
      auto-complete="on"
      status-icon
      class="login-form"
      center
    >
      <h1 class="title">
        {{ $t('signIn.signIn') }}
      </h1>
      <el-form-item prop="account">
        <div class="item-content">
          <span class="iconfont icon-sign-user" />
          <el-input
            v-model="signInForm.account"
            :placeholder="$t('signIn.account')"
            type="tel"
            name="account"
            auto-complete="off"
          />
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="item-content">
          <span class="iconfont icon-sign-pwd" />
          <el-input
            v-model="signInForm.password"
            :maxlength="15"
            :placeholder="$t('signIn.password')"
            :type="pType"
            auto-complete="new-password"
            name="password"
            @keyup.enter.native="loginIn"
          />
          <i
            :class="showIcon"
            class="show-pwd iconfont"
            @click="showPwd"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="loginIn"
        >
          {{ $t('signIn.signIn') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { signIn } from '@/api/signIn'
import { getSignInHash } from '@/api/common'

import { passwordEncrypt } from '@/utils/encrypt'

import configCode from '@/config/configCode'
import configPrompt from '@/config/configPrompt'
const { HTTP_RESPONSE_STATUS_SUCCESS } = configCode
const { SU_SIGIN } = configPrompt

const validatePassword: any = (rule: any, value: any, callback: any) => {
  // const regExp = /^(?!\D+$)(?![^a-zA-Z]+$).{8,15}$/
  if (value === '') {
    callback(new Error('登录密码不能为空!'))
  } else {
    callback()
  }
}
interface expectLoginRules {
  account: any[],
  password: any[]
}
@Component({})
export default class Layout extends Vue {
  loading: boolean = false
  pType: string = 'password'
  showIcon: string = 'icon-hide-pwd'
  signInForm: any = {
    // account: 'DYGQY833',
    // password: 'HJB18229057468',
    account: '',
    password: '',
    encryptedPassword: '',
    hash: ''
  }
  loginRules: expectLoginRules = {
    account: [{ required: true, message: '账户名不能为空', trigger: 'change' }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  }
  created() {
    this.getHash()
  }
  showPwd(): void {
    if (this.pType === 'password') {
      this.pType = 'text'
      this.showIcon = 'icon-show-pwd'
    } else {
      this.pType = 'password'
      this.showIcon = 'icon-hide-pwd'
    }
  }
  getHash(): void {
    getSignInHash().then(response => {
      if (parseInt(response.data.status) === 1) {
        this.signInForm.hash = response.data.data.hash
      }
    })
  }
  loginIn(): void {
    let form: any = this.$refs.signInForm
    form.validate((vaild: boolean) => {
      if (vaild) {
        this.loading = true
        const signinInfo = {
          account: this.signInForm.account,
          password: passwordEncrypt(
            this.signInForm.hash,
            this.signInForm.password
          ),
          passphtase: this.signInForm.hash
        }
        signIn(signinInfo).then(response => {
          this.loading = false
          const status = parseInt(response.data.status, 10)
          if (status === HTTP_RESPONSE_STATUS_SUCCESS) {
            this.$message({
              message: SU_SIGIN,
              type: 'success'
            })
            this.$router.push({ path: '/' })
          } else {
            try {
              this.$message({
                message: response.data.data.detail,
                type: 'error'
              })
            } catch (err) {
              console.log('err: ' + err)
            }
          }
        })
      }
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import '../../styles/mixin';
$bg: #2d3a4b;
$light_gray: #eee;
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    .el-input__inner {
      background-color: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 10px;
      color: $light_gray;
    }
  }
  .el-button {
    width: 90%;
    height: 37px;
    border-color: rgba(6, 202, 158, 0.6);
    background-color: rgba(6, 202, 158, 0.2);
    border: none;
    color: #fff;
    &:hover {
      background-color: rgba(6, 202, 158, 0.6);
    }
    &:visited {
      border: none;
    }
    @include transition(all, 0.3s, ease);
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/mixin';
.login-container {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 35px 25px 25px;
  max-width: 400px;
  background-color: rgba(16, 32, 66, 0.4);
  border-radius: 6px;
  $an1: (
    transform: translateY(-20%),
    opacity: 0
  );
  $an2: (
    transform: translateY(0),
    opacity: 1
  );
  $demo: (
    0%: $an1,
    100%: $an2
  );
  @include keyframes(guideac, $demo);
  @include animation(guideac 0.8s linear);
  .login-form {
    text-align: center;
    .title {
      margin-bottom: 1.2em;
      color: #fff;
      font-size: 1.4em;
    }
    .item-content {
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.1);
      text-align: left;
      .show-pwd {
        position: absolute;
        right: 0;
        top: 0;
        width: 37px;
        height: 37px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 414px) {
  .login-container {
    padding-top: 0;
    max-width: 85%;
    background-color: transparent;
  }
}
</style>

