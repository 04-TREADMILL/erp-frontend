<template>
  <Layout>
    <Title title="销售明细"></Title>
      <el-button type="primary" size="medium" @click="SearchDetail">查询销售明细</el-button>
  <div style="margin-top: 10px">
      <el-table ref="table"
        :data="saleDetailList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="time"
          label="时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="type"
          label="型号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="unitPrice"
          label="单价"
          width="150">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="总额"
          width="100">
        </el-table-column>
<!--       
        <el-table-column
          label="操作">
             <template slot-scope="scope">
            <el-button
              @click="editCustomer(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="deleteCustomer(scope.row.id)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

      <el-dialog
      title="查询明细"
      :visible.sync="searchDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="addForm" :label-width="'100px'" size="mini">
      
        <!-- <el-form-item label="i d">
          <el-col :span="11">
            <el-input v-model="addForm.id" placeholder="请输入员工id" ></el-input>
          </el-col>
        </el-form-item> -->

        <el-form-item label="开始时间">
            <el-date-picker v-model="SearchForm.from" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker v-model="SearchForm.to" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="商品">
          <el-input v-model="SearchForm.product" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="客户id">
          <el-input v-model="SearchForm.customerId" placeholder="请输入客户Id"></el-input>
        </el-form-item>
         <el-form-item label="业务员">
          <el-input v-model="SearchForm.salesman" placeholder="请输入业务员"></el-input>
        </el-form-item>

        
        
             
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSearch(false)">取 消</el-button>
        <el-button type="primary" @click="handleSearch(true)">确 定</el-button>
      </div>
  </el-dialog>

  </Layout>
</template>

<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import {getSaledetail} from "../../network/finance";
  export default {
    components: {
        Layout,
        Title
    },

  data() {
    return{
      saleDetailList:[],
      SearchForm:{
        customerId:0,
        product:"",
        from:"",
        to:"",
        salesman:""
      },
      searchDialogVisible: false

    }
  },

  mounted() {
    
  },
  methods: {
    getAll(){
      getSaledetail()
    },
    SearchDetail(){
      this.searchDialogVisible = true
    },
    handleSearch(type){
      if (type === false) {
          this.searchDialogVisible = false;
          this.SearchForm = {};
        } else if (type === true) {

          let t = this.SearchForm
          console.log(t)
          getSaledetail(
          {param:{from:t.from}},
          {param:{to:t.to}},
          {param:{product:t.product}},
          {param:{salesman:t.salesman}},
          {param:{customerId:t.customerId}}).then(_res => {
             console.log(_res);
            if (_res.code === "A0002") {
              this.$message({
                type: 'error',
                message: _res.msg
              });
            } else {
              this.$message({
                type: 'success',
                message: '查询成功!'
              });
              this.saleDetailList = _res.result
              this.dealwithTime()
              this.SearchForm = {};
              this.searchDialogVisible = false;
            }
          })
          
        }
    },
    dealwithTime(){
      var t = this.saleDetailList
      for(var i=0;i<t.length;i++){
        var time = t[i].time.substr(0,10)
        t[i].time = time}
      this.saleDetailList = t
    }
  }





  
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
