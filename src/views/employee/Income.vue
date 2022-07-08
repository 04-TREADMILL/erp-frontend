<template>
  <Layout>
    <Title title="薪酬规则制定"></Title>
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
          width="100">
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
          prop="role"
          label="工作岗位"
          width="200">
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
     
        <el-table-column
          prop="salaryCalculatingMode"
          label="薪资计算方式"
          width="120">
        </el-table-column>
      
        <el-table-column
          prop="account"
          label="账户"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
             <template slot-scope="scope">
            <el-button
              @click="changeMode(scope.row.id,scope.row.salaryCalculatingMode)"
              type="text"
              size="small">
              修改薪资规则
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {changeSalaryMode} from "../../network/salary";
import { showEmployee } from "../../network/employee";

export default {
  name: 'Income',
  components: {
    Layout,
    Title
  },
  data() {
    return {
     dialogVisible: false,
     employeeList: []
    }
  },
  mounted() {
      showEmployee().then(_res=>{
        this.employeeList = _res.result
        for(var i=0;i<_res.result.length;i++){
        if(this.employeeList[i].salaryCalculatingMode === "default") this.employeeList[i].salaryCalculatingMode="月薪制"
        else this.employeeList[i].salaryCalculatingMode ="提成制"
        }
      })
  },
  methods: {
    changeMode(id,mode){

      if(mode === "月薪制"){

        changeSalaryMode({params:{id:id,mode:"commission"}}).then(_res=>{
        showEmployee().then(_res=>{
        this.employeeList = _res.result
        for(var i=0;i<_res.result.length;i++){
        if(this.employeeList[i].salaryCalculatingMode === "default") this.employeeList[i].salaryCalculatingMode="月薪制"
        else this.employeeList[i].salaryCalculatingMode ="提成制"
        }
      })
      })
      }
      else{
      changeSalaryMode({params:{id:id,mode:"default"}}).then(_res=>{
      showEmployee().then(_res=>{
        this.employeeList = _res.result
        for(var i=0;i<_res.result.length;i++){
        if(this.employeeList[i].salaryCalculatingMode === "default") this.employeeList[i].salaryCalculatingMode="月薪制"
        else this.employeeList[i].salaryCalculatingMode ="提成制"
        }
      })
      })
      }
               this.$message({
                type: 'success',
                message: '修改成功!'
              });

    }
  }
}
</script>

<style lang="scss" scoped>