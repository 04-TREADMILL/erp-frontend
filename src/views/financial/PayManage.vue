
<template>
  <Layout>
    <Title title="付款管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定付款单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="pendingList" :type="1" @refresh="getPayment()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="successList" :type="2"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="failureList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建付款单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="paymentForm" label-width="100px" ref="paymentForm" :rules="rules">
          <el-form-item label="供应商: " prop="supplier">
            <el-select v-model="paymentForm.supplier" placeholder="请选择供应商">
              <el-option
                  v-for="item in suppliers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行账户: " prop="account">
            <el-select v-model="paymentForm.account"
                       placeholder="请选择关联的银行账户">
              <el-option
                  v-for="item in accountList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转账金额: ">
            <el-input type="textarea" v-model="paymentForm.totalAmount"></el-input>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="paymentForm.comment"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('paymentForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>


</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  addPayment,
  showPayment } from "../../network/payment";
import { showAccount } from "../../network/account";
import { getAllCustomer } from "../../network/purchase";
import PaymentList from "./compoents/PaymentList";
export default {
  components: {
    PaymentList,
    Layout,
    Title
  },
  data(){
    return{
      activeName: 'PENDING',
      paymentList:[],
      accountList:[],
      pendingList: [],
      successList: [],
      failureList: [],
      suppliers: [],
      dialogVisible: false,
      paymentForm:{
        comment:"",
      },
      rules: {
        supplier: [
          { required: true, message: '请选择一个供应商', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请选择一个银行账户', trigger: 'change' }
        ]
      },
    }
  },
  mounted() {
    //获取付款单
    this.getPayment();
    //获取账号
    showAccount().then(_res=>{
      this.accountList = _res.result;
    })
    //获取客户
    getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.suppliers = _res.result;
    })
  },
  methods:{
    //获取付款单
    getPayment(){
      this.paymentList = [];
      showPayment().then(_res=>{
        this.paymentList = _res.result;
        this.pendingList = this.paymentList.filter(item => item.state === '待审批')
        this.successList = this.paymentList.filter(item => item.state === '审批完成')
        this.failureList = this.paymentList.filter(item => item.state === '审批失败')
      })
    },
    //筛选账号
    selectAccount(content) {
      this.paymentForm.account = content[0];
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.paymentForm = {}
            done();
          })
          .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.paymentForm.id = null
          this.paymentForm.operator = sessionStorage.getItem("name")
          this.paymentForm.state = null
          addPayment(this.paymentForm).then(_res => {
            if (_res.msg == 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.paymentForm = {}
              this.getPayment()
            }
          })
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>
