<template>
  <Layout>
    <Title title="年终奖"></Title>
  <div style="margin-top: 10px">
      <el-table ref="table"
        :data="annualbonusList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓 名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="role"
          label="职 位"
          width="300">
        </el-table-column>
        <el-table-column
          prop="baseBonus"
          label="基础奖金"
          width="200">
        </el-table-column>
       <el-table-column
          prop="extraBonus"
          label="年终奖"
          width="200">
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { allocateAnnualBonus,showAnnualBonus, showEmployee } from "../../network/employee";
export default {
  name: 'ShowAnnualBonus',
  components: {
    Layout,
    Title
  },
  data() {
    return {
        employeeList:[],
        annualbonusList:[],
        showList:[]
    }
  },
  mounted() {
     showEmployee().then(_res=>{
        this.employeeList = _res.result
      //  console.log(_res.result)
    })
    setTimeout(()=>{
        for(var i=0;i<this.employeeList.length;i++){
            showAnnualBonus({params:{id:this.employeeList[i].id}}).then(_ret=>{
               // console.log(_ret)
                if(_ret.result.length===0){}
                else{
                    let obj = {}
                    obj.id = _ret.result[0].eid
                    obj.baseBonus = _ret.result[0].baseBonus
                    obj.extraBonus = _ret.result[0].extraBonus
                    obj.name = ""
                    obj.role = ""
                    for(let j=0;j<this.employeeList.length;j++){
                        if(this.employeeList[j].id==obj.id){
                            obj.name = this.employeeList[j].name
                            obj.role = this.employeeList[j].role
                        }
                    }
                this.annualbonusList.push(obj)
                }
            })
        }
     //   console.log(this.annualbonusList)    
    },400)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>