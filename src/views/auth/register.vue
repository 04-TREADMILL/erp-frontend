<template>
  <div class="body">
    <div class="register">
      <div class="title">NJU ERP系统</div>
      <div class="form">
        <el-form :model="userInfo" :label-width="'100px'">
          <el-form-item label="用户名：">
            <el-input v-model="userInfo.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-select v-model="userInfo.role">
              <el-option
               v-for="item in roleList"
               :key="item.id"
               :label="item.name"
               :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="userInfo.password1" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="userInfo.password2" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="confirm">
        <el-button type="primary" size="small" @click="registerThis()">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/network/auth";
export default {
  data() {
    return {
      userInfo: {},
      roleList: [
        { id: 1, name: "库存管理人员", value: "INVENTORY_MANAGER"},
        { id: 2, name: "进货销售人员", value: "SALE_STAFF"},
        { id: 3, name: "财务人员", value: "FINANCIAL_STAFF"},
        { id: 4, name: "人力资源人员", value: "HR"},
        { id: 5, name: "总经理", value: "GM"}
      ]
    }
  },
  methods: {
    registerThis() {
      if (this.userInfo.password1 !== this.userInfo.password2) {
        this.$message({
          type: 'error',
          message: '两次密码输入不一致！'
        });
        this.userInfo.password1 = "";
        this.userInfo.password2 = "";
      } else {
        let params = {
          name: this.userInfo.name,
          role: this.userInfo.role,
          password: this.userInfo.password1
        };
        register(params).then(res => {
          // console.log(res);
          if (res.code === 'A0000') {
            this.$message({
              type: 'error',
              message: '用户名已存在！'
            });
            this.userInfo = {};
          } else {
            this.$message({
              type: 'success',
              message: '注册成功'
            });
            this.$router.push("/login");
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .register {
    width: 550px;
    height: 500px;
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