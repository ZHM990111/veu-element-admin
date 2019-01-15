<template>
    <div class="login-container">
        <el-form
            ref="registerForm"
            :model="registerForm"
            :rules="registerRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">{{ $t('login.retitle') }}</h3>
                <lang-select class="set-language"/>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user"/>
                </span>
                <el-input
                    v-model="registerForm.username"
                    :placeholder="$t('login.username')"
                    name="username"
                    type="text"
                    auto-complete="on"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"/>
                </span>
                <el-input
                    :type="passwordType"
                    v-model="registerForm.password"
                    :placeholder="$t('login.password')"
                    name="password"
                    auto-complete="on"
                    @keyup.enter.native="handleRegister"
                />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="eye"/>
                </span>
            </el-form-item>
            <el-form-item prop="phone">
                <span class="svg-container">
                    <i class="el-icon-mobile-phone"></i>
                </span>
                <el-input
                    v-model="registerForm.phone"
                    name="phone"
                    type="tel"
                    auto-complete="on"
                     @keyup.enter.native="handleRegister"
                />
            </el-form-item>
            <el-button
                type="primary"
                style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleRegister"
            >{{ $t('login.register') }}</el-button>
        </el-form>
    </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./socialsignin";

export default {
  name: "Register",
  components: { LangSelect, SocialSign },
  data() {
    //名字
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const Username = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("用户名应大于4位"));
      } else {
        callback();
      }
    };

    //密码
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        username: "请输入用户名",
        password: "请输入密码",
        phone: "请输入手机号"
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: "请填写用户名" }
        ],
        password: [{ required: true, trigger: "blur", message: "请填写密码" }],
        phone: [{ required: true, trigger: "blur", message: "请填写手机号" }]
      },
      passwordType: "text",
      loading: false,
      showDialog: false,
      redirect: undefined
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },

  methods: {
    showPwd() {
      if (this.passwordType === "text") {
        this.passwordType = "password";
      } else {
        this.passwordType = "text";
      }
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
            console.log('校验成功')
          this.$store
            .dispatch("registerByUserName", this.registerForm)
            .then(res=>{
                console.log('res',res)
                this.$message({
                message:res,
                center:true,
                type:'success'
              })
            }).catch(error=>{
              this.$message({
                message:error,
                center:true,
                type:'error'
              })
            })
        } else {
          console.log("error");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>

