<template>
  <Layout>
    <Title title="销售管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定销售单</el-button>
    <el-button type="primary" size="medium" @click="CustomerInquiryDialogVisible = true">获取某个销售人员某段时间内消费总金额最大的客户</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="pendingLevel1List" :type="1" @refresh="getSale()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="pendingLevel2List" :type="2" @refresh="getSale()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      title="创建销售单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="saleForm" label-width="100px" ref="saleForm" :rules="rules">
          <el-form-item label="销售商: " prop="supplier">
            <el-select v-model="saleForm.supplier" @change="selectcustomer(saleForm.supplier)" placeholder="请选择销售商">
              <el-option
                v-for="item in sellers"
                :key="item.id"
                :label="item.name"
                :value="item.id"
               >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣: " prop="discount">
            <el-input v-model="saleForm.discount"></el-input>
          </el-form-item>
          <el-form-item label="代金券总额: " prop="voucherAmount">
            <el-input v-model="saleForm.voucherAmount"></el-input>
          </el-form-item>
          <el-form-item
            v-for="(item, index) in saleForm.saleSheetContent"
            :key="index"
            :label="'商品' + index">
            <div>
              <el-select v-model="item.pid" placeholder="请选择商品id" style="width: 40%; margin-right: 5%" @change="selectcommodity(item.pid)">
                <el-option
                  v-for="item1 in commodityList"
                  :key="item1.id"
                  :label="item1.id"
                  :value="item1.id">
                </el-option>
              </el-select>
              <el-input v-model="item.quantity" style="width: 25%; margin-right: 5%" placeholder="请输入商品数量"></el-input>
              <el-input v-model="item.unitPrice" style="width: 25%;" placeholder="请输入商品单价"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-input v-model="item.remark" style="width: 70%; margin-right: 10%" placeholder="请填写备注"></el-input>
              <el-button type="text" size="small" @click="addProduct" v-if="index === saleForm.saleSheetContent.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
        <el-form-item label="促销策略">
            <el-input   readonly v-model="this.currentpromotion.mode"></el-input>
       </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="saleForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('saleForm')">立即创建</el-button>
      </span>
    </el-dialog>

    <el-dialog
    title = "获取某个销售人员某段时间内消费总金额最大的客户"
    :visible.sync = "CustomerInquiryDialogVisible"
    width="40%"
    :before-close="InquiryClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form  label-width="100px" :rules="inquiryRules">
          <el-form-item label="销售人员: " prop="salesman">
            <el-select v-model="salesmanName" placeholder="请选择销售人员">
              <el-option
                v-for="item in salesmanList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择一个时间段： ">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getData()">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitInquiry('saleForm')">立即查询</el-button>
      </span>
    </el-dialog>

    <el-dialog
    title = "获取交易金额最大的客户"
    :visible.sync = "AlertdialogDialogVisible"
     width="40%"
    :before-close="AlertClose">
        客户编号: {{alertInfo.id}} <br>
        客户名称: {{alertInfo.name}} <br>
        销售金额: {{alertInfo.price}}
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SaleList from './components/SaleList'
import { getAllSale, createSale,getMaxAmountCustomerOfSalesmanByTime,getcombinepromotion,gettotalpromotion,getcustomerpromotion} from '../../network/sale'

import { getAllCustomer } from '../../network/purchase'
import { getAllCommodity } from '../../network/commodity'
import { formatDate } from "@/common/utils";
export default {
  name: 'SaleView',
  components: {
    Layout,
    Title,
    SaleList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      saleList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      CustomerInquiryDialogVisible: false,
      AlertdialogDialogVisible:false,
      salesmanName: '',
      alertInfo:{
        name:"",
        price:"",
        id:""
      },
      date: '',
      saleForm: {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      },
      sellers: [],
      rules: {
        supplier: [
          { required: true, message: '请选择一个销售商', trigger: 'change' }
        ],
        discount: [
          { required: true, message: '请输入折扣', trigger: 'change' }
        ],
        voucherAmount: [
          { required: true, message: '请输入代金券总额', trigger: 'change' }
        ]
      },
      inquiryRules: {
        salesman: [
          {required: true, message: '请选择一位销售人员', trigger: 'change'}
        ]
      },
      commodityList: [],
      salesmanList: [],

      currentpromotion:{},
    }
  },
  mounted() {
    this.currentpromotion = {mode:"总额促销"}
    this.getSale()
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({ id: item.id }))
    })
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
     // console.log(_res);
      this.sellers = _res.result
    })
  },
  methods: {
    getSale() {
      getAllSale({}).then(_res => {
        this.saleList = _res.result
       // console.log(this.saleList)
        var s = new Set();
        var ss = new Set();
        for(var i=0;i<this.saleList.length;i++) s.add(this.saleList[i].operator);
        for (var x of s) { ss.add({name: x});}//去重之后
        this.salesmanList = ss; 
        
        this.pendingLevel1List = this.saleList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.saleList.filter(item => item.state === '待二级审批')
        this.successList = this.saleList.filter(item => item.state === '审批完成')
        this.failureList = this.saleList.filter(item => item.state === '审批失败')
      })
    },
    getData() {},
    selectcustomer(supplier){
      for(var i=0;i<this.sellers.length;i++){
        if(this.sellers[i].id == supplier){
          getcustomerpromotion({params:{level:this.sellers[i].level}}).then(_res=>{
              console.log(_res.result)
              var begin = _res.result.beginTime.substr(0,10)
              var end   = _res.result.endTime.substr(0,10)
              var date =this.timestampToTime(new Date().getTime())
              if(this.compareTime(date,end) && this.compareTime(begin,date)){
                this.currentpromotion.mode = "客户促销"
              }
          })
        }
      }
      
    },
    timestampToTime(timestamp){
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1) + ' ';
      var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':' ;
      var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':' ;
      var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
      return Y+M+D;
    },
   compareTime(startTime,endTime) {  
//          var start_time=startTime.replace(/-|\s|:|\//g,'').replace(' ', ''); //用这个加强版也可以
            var start_time = startTime.replace(/-|\s|:|\//g,''); 
            var end_time = endTime.replace(/-|\s|:|\//g,'');  
            if (start_time < end_time) { return true; }
	    else { return false; }
            
   },
    selectcommodity(pid){
      getcombinepromotion({params:{pids:pid}}).then(_res=>{
              //console.log(_res.result)
              if(_res.result!=null){
              //console.log(_res.result)
              var begin = _res.result.beginTime.substr(0,10)
              var end   = _res.result.endTime.substr(0,10)
              var date =this.timestampToTime(new Date().getTime())
              if(this.compareTime(date,end) && this.compareTime(begin,date)){
                this.currentpromotion.mode = "组合促销"
              }
            }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.resetForm()
          done();
        })
        .catch(_ => {});
    },
    InquiryClose(done){
      this.$confirm('确认关闭？').
      then(_=>{
        done();
      }).catch(_=>{});
    },
    AlertClose(done){
          this.$confirm('确认').
      then(_=>{
        done();
      }).catch(_=>{});
    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saleForm.id = null
          this.saleForm.operator = sessionStorage.getItem("name")
          this.saleForm.salesman = sessionStorage.getItem("name")
          this.saleForm.state = null
          this.saleForm.rawTotalAmount = null
          this.saleForm.finalAmount = null
          this.saleForm.discount = Number(this.saleForm.discount)
          this.saleForm.voucherAmount = Number(this.saleForm.voucherAmount)
          this.saleForm.saleSheetContent.forEach((item) => {
            item.id = null
            item.purchaseSheetId = null
            item.quantity = parseInt(item.quantity)
            item.unitPrice = parseInt(item.unitPrice)
            item.totalPrice = item.quantity * item.unitPrice
          })
          createSale(this.saleForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getSale()
            }else{
              this.$message.error("创建失败!")
            }
          })
        }
      })
    },
    submitInquiry(){
      const config = {
        params: {
          beginDateStr: formatDate(this.date[0]),
          endDateStr:  formatDate(this.date[1]),
          salesman: this.salesmanName
        }
      }
  
      getMaxAmountCustomerOfSalesmanByTime(config).then(_res=>{
        console.log(_res)
        this.alertInfo.name =  _res.result.name
        this.alertInfo.price = _res.result.totalFinalAmount
        this.alertInfo.id = _res.result.id
      })
      this.AlertdialogDialogVisible = true;
    },
    resetForm() {
      this.saleForm = {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      }
    },
    addProduct() {
      this.saleForm.saleSheetContent.push({});
    },
    removeProduct(item) {
      var index = this.saleForm.saleSheetContent.indexOf(item)
      if (index !== -1) {
        this.saleForm.saleSheetContent.splice(index, 1)
      }
    }
  }
}
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