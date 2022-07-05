<template>
  <Layout>
    <Title title="员工管理"></Title>
        <el-button type="primary" size="medium" @click="addEmployee">新增员工</el-button>
     <div style="margin-top: 10px">
      <el-table ref="table"
        :data="employeeList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="70">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="80"
          :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.gender === '男' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.gender}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          width="150">
        </el-table-column>
        <el-table-column
          prop="role"
          label="工作岗位"
          width="150">
        </el-table-column>
        <el-table-column
          prop="basicSalary"
          label="基本工资"
          width="100">
        </el-table-column>
        <el-table-column
          prop="postSalary"
          label="岗位工资"
          width="100">
        </el-table-column>
        <!-- <el-table-column
          prop="lineOfCredit"
          label="岗位级别"
          width="120">
        </el-table-column> -->
        <el-table-column
          prop="salaryCalculatingMode"
          label="薪资计算方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="salaryGrantingMode"
          label="薪资发放方式"
          width="120">
        </el-table-column>
        <el-table-column
          prop="account"
          label="账户"
          width="120">
        </el-table-column>

      </el-table>
    </div>



  </Layout>


  
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
    gettotalpromotion,
    getcustomerpromotion,
    addpromotion,
    deletepromotion,
    showpromotion,
    } from "../../network/sale";
import { formatDate } from "@/common/utils";

export default {
  name: 'EmployeeView',
  components: {
    Layout,
    Title
    
  },
  data() {
    return {
      promotionsList:[]
    }
  },
  mounted() {
    showpromotion({params:{promotionType:"TotalPromotion"}}).then(_res=>{
        console.log(_res);
    })
       
  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    getAll(){
       
    },
    addEmployee(){
        
    },
    handleAdd(type){
      
    },
   
    close(){
        this.addForm = {};
        this.editForm = {};
    },
  }
}
</script>

<style lang="scss" scoped>