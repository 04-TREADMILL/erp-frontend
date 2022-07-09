<template>
  <Layout>
    <Title title="财务类单据"></Title>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <receipt-list :list="pendingList" :type="1" @refresh="getReceipt()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <receipt-list :list="successList" :type="2"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <receipt-list :list="failureList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {showReceipt} from "../../network/receipt";
import {showSalary} from "../../network/salary";
import {showPayment } from "../../network/payment";
import {showAccount} from "../../network/account";
import {getAllCustomer} from "../../network/purchase";
import ReceiptList from "./compoents/ReceiptList";
import { showEmployee } from "../../network/employee";

export default {
  components: {
    ReceiptList,
    Layout,
    Title
  },
  data(){
    return{
      activeName: 'PENDING',
      receiptList:[],
      accountList:[],

      pendingList: [],
      successList: [],
      failureList: [],
      sellers: [],

      
    }
  },
  mounted() {
    //获取收款单
    this.getReceipt();
    //加载账号
    showAccount().then(_res=>{
      this.accountList = _res.result;
    })
    //加载销售商
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.sellers = _res.result;
    })
    //获取工资单
    this.getSalary();
    showAccount().then(_res=>{
      this.accountList = _res.result;
    })
    //加载员工
    showEmployee().then(_res => {
      this.employees = _res.result;
    })
    this.getPayment();
    //加载供应商
    getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.suppliers = _res.result;
    })

  },
  methods:{
    //收款单获取
    getReceipt(){
      this.receiptList = [];
      showReceipt().then(_res=>{
        this.receiptList = _res.result;
        this.pendingList = this.receiptList.filter(item => item.state === '待审批')
        this.successList = this.receiptList.filter(item => item.state === '审批完成')
        this.failureList = this.receiptList.filter(item => item.state === '审批失败')
      })
    },
    //工资单获取
    getSalary(){
      this.salaryList = [];
      showSalary().then(_res=>{
        this.salaryList = _res.result;
        this.pendingList = this.pendingList.concat(this.salaryList.filter(item => item.state === '待审批'))
        this.successList = this.successList.concat(this.salaryList.filter(item => item.state === '审批完成'))
        this.failureList = this.failureList.concat(this.salaryList.filter(item => item.state === '审批失败'))
      })
    },
    //付款单获取
    getPayment(){
      this.paymentList = [];
      showPayment().then(_res=>{
        this.paymentList = _res.result;
        this.pendingList = this.pendingList.concat(this.paymentList.filter(item => item.state === '待审批'))
        this.successList = this.successList.concat(this.paymentList.filter(item => item.state === '审批完成'))
        this.failureList = this.failureList.concat(this.paymentList.filter(item => item.state === '审批失败'))
      })
    },
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