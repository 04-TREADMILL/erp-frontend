<template>
  <Layout>
    <Title title="促销策略"></Title>
      <el-button type="primary" size="medium" @click="add_total_promotion">新增总价促销</el-button>
      <el-button type="primary" size="medium" @click="add_customer_promotion">新增客户促销</el-button>
     <div style="margin-top: 10px">
      <el-table ref="table"
        :data="totalpromotionList"
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
          prop="beginTime"
          label="开始时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="condition"
          label="条件"
          width="100">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          width="100">
        </el-table-column>
      </el-table>
    </div>
     <div style="margin-top: 10px">
      <el-table ref="table"
        :data="customerpromotionList"
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
          prop="beginTime"
          label="开始时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          width="300">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣"
          width="100">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="100">
        </el-table-column>
      </el-table>
    </div>

  <el-dialog
      title="新增总价促销"
      :visible.sync="addDialogVisible_of_Total"
      width="30%"
      @close="close()">
      <el-form :model="addFormTotal" :label-width="'100px'" size="mini">
         <el-form-item label="i d">
          <el-input v-model="addFormTotal.id" placeholder="请输入活动id" type="number"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 ">
           <el-date-picker v-model="addFormTotal.beginTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="结束时间 ">
          <el-date-picker v-model="addFormTotal.endTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker> 
        </el-form-item>
        <el-form-item label="条 件">
          <el-input v-model="addFormTotal.condition" placeholder="请输入促销条件" type="number"></el-input>
        </el-form-item>
         <el-form-item label="金 额">
          <el-input v-model="addFormTotal.amount" placeholder="请输入促销金额" type="number"></el-input>
        </el-form-item>

        
             
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd_total(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd_total(true)">确 定</el-button>
      </div>
  </el-dialog>

   <el-dialog
      title="新增客户促销"
      :visible.sync="addDialogVisible_of_Customer"
      width="30%"
      @close="close()">
      <el-form :model="addFormCustomer" :label-width="'100px'" size="mini">
         <el-form-item label="i d">
          <el-input v-model="addFormCustomer.id" placeholder="请输入活动id" type="number"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 ">
           <el-date-picker v-model="addFormCustomer.beginTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="结束时间 ">
          <el-date-picker v-model="addFormCustomer.endTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker> 
        </el-form-item>
        <el-form-item label="折 扣">
          <el-input v-model="addFormCustomer.discount" placeholder="请输入促销条件" type="number"></el-input>
        </el-form-item>
         <el-form-item label="金 额">
          <el-input v-model="addFormCustomer.amount" placeholder="请输入促销金额" type="number"></el-input>
        </el-form-item>

        <el-form-item label="级 别">
          <el-input v-model="addFormCustomer.level" placeholder="请输入客户级别" type="number"></el-input>
        </el-form-item>
        

        
             
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd_customer(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd_customer(true)">确 定</el-button>
      </div>
  </el-dialog>

  </Layout>


  
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
addtotalpromotion,addcustomerpromotion,showpromotion
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
      addDialogVisible_of_Total:false,
      addDialogVisible_of_Customer:false,

      totalpromotionList:[],
      customerpromotionList:[],


      addFormTotal:{
        id:0,
        beginTime:"",
        endTime:"",
        condition:100,
        amount:10  
      },
      addFormCustomer:{
        id:0,
        beginTime:"",
        endTime:"",
        discount:100,
        amount:10,
        level:1
      }

    }
  },
  mounted() {

    showpromotion({params:{promotionType:"total"}}).then(_res=>{
        this.totalpromotionList = _res.result
    })
    setTimeout(()=>{
        //反异步
        for(var i =0;i<this.totalpromotionList.length;i++){
          this.totalpromotionList[i].beginTime = this.totalpromotionList[i].beginTime.substr(0,10)
          this.totalpromotionList[i].endTime = this.totalpromotionList[i].endTime.substr(0,10)
        }
    },800)
    showpromotion({params:{promotionType:"customer"}}).then(_res=>{
        this.customerpromotionList = _res.result

        for(var i =0;i<this.customerpromotionList.length;i++){
          this.customerpromotionList[i].beginTime = this.customerpromotionList[i].beginTime.substr(0,10)
          this.customerpromotionList[i].endTime = this.customerpromotionList[i].endTime.substr(0,10)
        }
    })

  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    getAll(){
      showpromotion({param:{promotionType:"total"}}).then(_res=>{
          this.totalpromotionList = _res.result
      })
      showpromotion({param:{promotionType:"customer"}}.then(_res=>{
        this.customerpromotionList = _res.result
      }))

    },
    add_total_promotion(){
        this.addDialogVisible_of_Total = true;
    },
    handleAdd_total(type){
      if (type === false) {
          this.addDialogVisible_of_Total = false;
          this.addFormTotal = {};
        } else if (type === true) {

          var t1 = Date.parse(this.addFormTotal.beginTime)
          var t2 = Date.parse(this.addFormTotal.endTime)
          let config = this.addFormTotal
          config.beginTime = t1
          config.endTime = t2
          console.log(config)
          addtotalpromotion(config).then(_res => {
            // console.log(_res.code);
            console.log(_res);
            if (_res.code === "A0002") {
              this.$message({
                type: 'error',
                message: _res.msg
              });
            } else {
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
              this.addFormTotal = {};
              this.addDialogVisible_of_Total = false;
              this.getAll();
            }
          })
          
        }
    },
    add_customer_promotion(){
      this.addDialogVisible_of_Customer =  true
    },
    handleAdd_customer(type){
         if (type === false) {
          this.addDialogVisible_of_Customer = false;
          this.addFormCustomer = {};
        } else if (type === true) {

          var t1 = Date.parse(this.addFormCustomer.beginTime)
          var t2 = Date.parse(this.addFormCustomer.endTime)
          let config = this.addFormCustomer
          config.beginTime = t1
          config.endTime = t2
          console.log(config)

          addcustomerpromotion(config).then(_res => {
            // console.log(_res.code);
            console.log(_res);
            if (_res.code === "A0002") {
              this.$message({
                type: 'error',
                message: _res.msg
              });
            } else {
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
              this.addFormCustomer = {};
              this.addDialogVisible_of_Customer = false;
              this.getAll();
            }
          })
          
        }
    },

   
    close(){
        this.addFormTotal = {}
        this.addFormCustomer = {}
    },
  }
}
</script>

<style lang="scss" scoped>