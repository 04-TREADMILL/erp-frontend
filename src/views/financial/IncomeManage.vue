<template>
  <Layout>
    <Title title="工资管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定工资单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="pendingList" :type="1" @refresh="getSalary()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="successList" :type="2"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="failureList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建工资单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="salaryForm" label-width="100px" ref="salaryForm" :rules="rules">
          <el-form-item label="员工: " prop="employeeId">
            <el-select v-model="salaryForm.employeeId" placeholder="请选择员工">
              <el-option
                  v-for="item in employees"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行账户: " prop="account">
            <el-select v-model="salaryForm.account" placeholder="请选择关联的银行账户">
              <el-option
                  v-for="item in accountList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('salaryForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  addSalary,
  showSalary} from "../../network/salary";
import { showAccount } from "../../network/account";
import { showEmployee } from "../../network/employee";
import SalaryList from "./compoents/SalaryList";
export default {
  components: {
    SalaryList,
    Layout,
    Title
  },
  data(){
    return{
      activeName: 'PENDING',
      salaryList:[],
      accountList:[],
      pendingList: [],
      successList: [],
      failureList: [],
      employees: [],
      dialogVisible: false,
      salaryForm:{
        employeeId: null,
        account:null
      },
      rules: {
        employeeId: [
          { required: true, message: '请选择一个员工' ,trigger: 'change'}
        ],
        account: [
          { required: true, message: '请选择一个银行账户', trigger: 'change' }
        ]
      },
    }
  },
  mounted() {
    this.getSalary();
    showAccount().then(_res=>{
      this.accountList = _res.result;
    })
    showEmployee().then(_res => {
      this.employees = _res.result;
    })
  },
  methods:{
    filterTag(value, row) {
      return row.type === value
    },
    getSalary(){
      this.salaryList = [];
      showSalary().then(_res=>{
        this.salaryList = _res.result;
        this.pendingList = this.salaryList.filter(item => item.state === '待审批')
        this.successList = this.salaryList.filter(item => item.state === '审批完成')
        this.failureList = this.salaryList.filter(item => item.state === '审批失败')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.salaryForm = {}
            done();
          })
          .catch(_ => {});
    },
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.salaryForm.id = null,
          this.salaryForm.originalSalary = null,
          this.salaryForm.tax = null,
          this.salaryForm.realSalary = null,
          this.salaryForm.state = null,
          this.salaryForm.createTime = null,
          this.salaryForm.name = null,
          addSalary(this.salaryForm).then(_res => {
            if (_res.msg == 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.salaryForm = {}
              this.getSalary()
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
