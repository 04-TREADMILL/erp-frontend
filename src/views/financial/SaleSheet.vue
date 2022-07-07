<template>
  <Layout>
    <Title title="销售类单据"></Title>
    <!-- <el-button type="primary" size="medium" @click="dialogVisible = true">制定销售单</el-button> -->
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

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SaleList from '../sale/components/SaleList'
import { getAllSale, createSale,getMaxAmountCustomerOfSalesmanByTime } from '../../network/sale'
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
      salesmanName: '',
      date: '',
      commodityList: [],
      salesmanList: []
    }
  },
  mounted() {
    this.getSale()
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({ id: item.id }))
    })
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      console.log(_res);
      this.sellers = _res.result
    })
    
    this.getSaleReturn()
    getAllSale({ params: { state: 'SUCCESS' } }).then(_res => {
      this.completedSale = _res.result
    })
  },
  methods: {
    getSale() {
      getAllSale({}).then(_res => {
        this.saleList = _res.result
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
 
    getSaleReturn() {
      getAllSaleReturn({}).then(_res => {
        this.saleReturnList = _res.result
        this.pendingLevel1List = this.pendingLevel1List.concat(this.saleReturnList.filter(item => item.state === '待一级审批'))
        this.pendingLevel2List = this.pendingLevel2List.concat(this.saleReturnList.filter(item => item.state === '待二级审批'))
        this.successList = this.successList.concat(this.saleReturnList.filter(item => item.state === '审批完成'))
        this.failureList = this.failureList.concat(this.saleReturnList.filter(item => item.state === '审批失败'))
      })
    },
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