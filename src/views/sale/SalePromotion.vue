<template>
  <Layout>
    <Title title="促销策略"></Title>
      <el-button type="primary" size="medium" @click="add_total_promotion">新增总价促销</el-button>
      <el-button type="primary" size="medium" @click="add_customer_promotion">新增客户促销</el-button>
      <el-button type="primary" size="medium" @click="add_combine_promotion">新增组合促销</el-button>

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
          width="200">
        </el-table-column>
          <el-table-column
          prop= ""
          label="级别"
          width="100">all
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
          width="200">
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="100">
        </el-table-column>
      </el-table>
    </div>
         <div style="margin-top: 10px">
      <el-table ref="table"
        :data="combinepromotionList"
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
          prop="pidList"
          label="商品组合"
          width="100"
          >
          <template slot-scope="scope">
            <div v-for="item in scope.row.pidList" :key="item">
            {{item}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          width="200">
        </el-table-column>
          <el-table-column
          prop= ""
          label="级别"
          width="100">all
        </el-table-column>
      </el-table>
    </div>

  <el-dialog
      title="新增总价促销"
      :visible.sync="addDialogVisible_of_Total"
      width="30%"
      @close="close()">
      <el-form :model="addFormTotal" :label-width="'100px'" size="mini">
         <!-- <el-form-item label="i d">
          <el-input v-model="addFormTotal.id" placeholder="请输入活动id" type="number"></el-input>
        </el-form-item> -->
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
         <!-- <el-form-item label="i d">
          <el-input v-model="addFormCustomer.id" placeholder="请输入活动id" type="number"></el-input>
        </el-form-item> -->
        <el-form-item label="开始时间 ">
           <el-date-picker v-model="addFormCustomer.beginTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="结束时间 ">
          <el-date-picker v-model="addFormCustomer.endTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker> 
        </el-form-item>
        <el-form-item label="折 扣">
          <el-input v-model="addFormCustomer.discount" placeholder="请输入促销条件"></el-input>
        </el-form-item>
         <el-form-item label="金 额">
          <el-input v-model="addFormCustomer.amount" placeholder="请输入促销金额" type="number"></el-input>
        </el-form-item>
        <!-- <el-form-item label="级 别">
          <el-input v-model="addFormCustomer.level" placeholder="请输入客户级别" type="number"></el-input>
        </el-form-item> -->
        <el-form-item label="级别">
          <el-select v-model="addFormCustomer.level" placeholder="请选择级别">
              <el-option
                  v-for="item in levelslist"
                  :key="item.level"
                  :label="item.level"
                  :value="item.level">
              </el-option>
            </el-select>
        </el-form-item>

        
             
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd_customer(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd_customer(true)">确 定</el-button>
      </div>
  </el-dialog>

  <el-dialog
      title="新增组合促销"
      :visible.sync="addDialogVisible_of_Combine"
      width="30%"
      @close="close()">
     <el-form :model="addFormCombine" :label-width="'100px'" size="mini">
        <!-- <el-form-item label="i d">
          <el-input v-model="addFormCombine.id" type="number" placeholder="设置id"></el-input>
        </el-form-item> -->
        <el-form-item label="开始时间 ">
           <el-date-picker v-model="addFormCombine.beginTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="结束时间 ">
          <el-date-picker v-model="addFormCombine.endTime" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"> </el-date-picker> 
        </el-form-item>
        <el-form-item label="商品组合">
          <el-select v-model="addFormCombine.pidList"  multiple placeholder="请选择">
            <el-option
              v-for="item in this.comodityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
       </el-form-item>
         <el-form-item label="金 额">
          <el-input v-model="addFormCombine.amount" placeholder="请输入促销金额" type="number"></el-input>
        </el-form-item>

        
             
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd_combine(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd_combine(true)">确 定</el-button>
      </div>
  </el-dialog>
  </Layout>


  
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {addtotalpromotion,
        addcustomerpromotion,
        addcombinepromotion,
        showpromotion
    } from "../../network/sale";
import { getAllCommodity } from '../../network/commodity'

export default {
  name: 'EmployeeView',
  components: {
    Layout,
    Title
    
  },
  data() {
    return {
      comodityList:[],
      addDialogVisible_of_Total:false,
      addDialogVisible_of_Customer:false,
      addDialogVisible_of_Combine:false,

      totalpromotionList:[],
      customerpromotionList:[],
      combinepromotionList:[],
      levelslist:[{level:1},{level:2},{level:3},{level:4},{level:5}],

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
      },
      addFormCombine:{
        id:0,
        beginTime:"",
        endTime:"",
        pidList:[],
        amount:10,
      },


    }
  },
  mounted() {
    //获取商品
    getAllCommodity().then(_res=>{
      this.comodityList = _res.result
    })
    //获取促销策略
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
    showpromotion({params:{promotionType:"combine"}}).then(_res=>{
        this.combinepromotionList = _res.result
        for(var i =0;i<this.combinepromotionList.length;i++){
          this.combinepromotionList[i].beginTime = this.combinepromotionList[i].beginTime.substr(0,10)
          this.combinepromotionList[i].endTime = this.combinepromotionList[i].endTime.substr(0,10)
        }
      })

  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    getAll(){

          //获取商品
    getAllCommodity().then(_res=>{
      this.comodityList = _res.result
    })
    //获取促销策略
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
    showpromotion({params:{promotionType:"combine"}}).then(_res=>{
        this.combinepromotionList = _res.result
        for(var i =0;i<this.combinepromotionList.length;i++){
          this.combinepromotionList[i].beginTime = this.combinepromotionList[i].beginTime.substr(0,10)
          this.combinepromotionList[i].endTime = this.combinepromotionList[i].endTime.substr(0,10)
        }
      })

    },
    //增加总价促销
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
          addtotalpromotion(config).then(_res => {
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
    //增加客户促销
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
         // console.log(config)
        
          addcustomerpromotion(config).then(_res => {
            // console.log(_res.code);
           // console.log(_res);
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
    //增加组合促销
    add_combine_promotion(){
       this.addDialogVisible_of_Combine =  true
    },
    handleAdd_combine(type){
     if (type === false) {
          this.addDialogVisible_of_Combine = false;
          this.addFormCombine = {};
        } else if (type === true) {

          var t1 = Date.parse(this.addFormCombine.beginTime)
          var t2 = Date.parse(this.addFormCombine.endTime)
          let config = this.addFormCombine
          config.beginTime = t1
          config.endTime = t2
      //    console.log(config)
          
          let arr = this.addFormCombine.pidList
          let list = []
          for(var i=0;i<arr.length;i++) list.push(arr[i]);
          config.pidList = list

          console.log(config)
          addcombinepromotion(config).then(_res => {
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
              this.addFormCombine = {};
              this.addDialogVisible_of_Combine = false;
              this.getAll();
            }
          })
          
        }
    },
    close(){
        this.addFormTotal = {}
        this.addFormCustomer = {}
        this.addFormCombine = {}
    },
  }
}
</script>

<style lang="scss" scoped>