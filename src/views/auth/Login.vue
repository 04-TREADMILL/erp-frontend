<template>
  <div class="body">
    <div class="login">
      <div class="title">NJU ERP系统</div>
      <div class="form">
        <el-form :model="userInfo" :label-width="'100px'">
          <el-form-item label="用户名：">
            <el-input v-model="userInfo.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="userInfo.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="confirm">
        <el-button type="primary" size="small" @click="loginThis()">登录</el-button>
      </div>
      <div class="confirm" style="margin-top: 15px">
        <el-button type="text" size="small" @click="toRegister">暂无账号？立即注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, auth } from "@/network/auth";
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  methods: {
    loginThis() {
      console.log(this.userInfo);
      login(this.userInfo).then(_res => {
        if (_res.code === '00000') {
          let token = _res.result.token;
          if (token == null) {
            this.$message({
              type: 'error',
              message: '无效的用户'
            });
            return;
          } else {
            sessionStorage.setItem("token", token);
            let config = {
              params: {
                token: token
              }
            };
            auth(config).then(res2 => {
              // console.log(res2);
              sessionStorage.setItem("name", res2.result.name);
              sessionStorage.setItem("role", res2.result.role);
              this.$router.push("/");
            })
          }
        }
      })
      .catch(err => {
        console.error("获取token失败!", err);
      });
    },
    toRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 550px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
  }
  .title {
    text-align: center;
    margin: 50px 0 50px;
    font-size: 30px;
    font-weight: bold;
    color: #a486c7;
  }
  .form {
    width: 60%;
    margin: 0 auto;
  }
  .confirm {
    text-align: center;
  }
}
</style>
