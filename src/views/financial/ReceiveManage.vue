<template>
  <Layout>
    <Title title="收款管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定收款单</el-button>
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
    <el-dialog
        title="创建收款单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="receiptForm" label-width="100px" ref="ReceiptForm">
          <el-form-item label="销售商: " prop="supplier">
            <el-select v-model="receiptForm.supplier" placeholder="请选择销售商">
              <el-option
                  v-for="item in sellers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行账户: " prop="name">
            <el-select v-model="receiptForm.account"
                       placeholder="请选择关联的银行账户"
                       @change="selectAccount(accountList.filter(item => item. name === receiptForm.name))">
              <el-option
                  v-for="(item, index) in accountList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                <el-popover
                    placement="right"
                    width="800"
                    trigger="hover">
                  <el-table :data="accountList[index]">
                    <el-table-column width="200" property="name" label="name"></el-table-column>
                    <el-table-column width="200" property="amount" label="amount"></el-table-column>
                  </el-table>
                  <span slot="reference">{{ item.name }}</span>
                </el-popover>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转账金额: ">
            <el-input type="textarea" v-model="receiptForm.totalAmount"></el-input>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="receiptForm.comment"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('receiptForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>

  
</template>

<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import {
    addReceipt,
    showReceipt} from "../../network/receipt";
  import {showAccount} from "../../network/account";
  import {getAllCustomer} from "../../network/purchase";
  import ReceiptList from "./compoents/ReceiptList";
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
        dialogVisible: false,
        receiptForm:{
          comment:"",
        }
      }
    },
    async mounted() {
      this.getReceipt();
      showAccount().then(_res=>{
        this.accountList = _res.result;
      })
      getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
        this.sellers = _res.result
      })
    },
    methods:{
      getReceipt(){
        this.receiptList = [];
        showReceipt().then(_res=>{
          this.receiptList = _res.result;
          this.pendingList = this.receiptList.filter(item => item.state === '待审批')
          this.successList = this.receiptList.filter(item => item.state === '审批完成')
          this.failureList = this.receiptList.filter(item => item.state === '审批失败')
        })
      },
      selectAccount(content) {
        this.receiptForm.account = content[0];
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              this.receiptForm = {}
              done();
            })
            .catch(_ => {});
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.receiptForm.id = null
            this.receiptForm.operator = sessionStorage.getItem("name")
            this.receiptForm.state = null
            addReceipt(this.receiptForm).then(_res => {
              if (_res.msg == 'Success') {
                this.$message.success('创建成功!')
                this.dialogVisible = false
                this.receiptForm = {}
                this.getReceipt()
              }
            })
          }
        })
      }
    },
  };
</script>

<style scoped>
</style>
