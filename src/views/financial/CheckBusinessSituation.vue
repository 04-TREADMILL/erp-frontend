<template>
  <Layout>
    <Title title="经营情况"></Title>
      <el-button type="primary" size="medium" @click="SearchDetail">查询经营情况</el-button>
      <el-button type="primary" size="medium" style="margin-left:850px" @click="CheckYear">查询年度经营</el-button>
  <div style="margin-top: 10px">
      <el-table ref="table"
        :data="saleDetailList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="incomingRaw"
          label="预计收入"
          width="200">
        </el-table-column>
                <el-table-column
          prop="incomingReal"
          label="真实收入"
          width="200">
        </el-table-column>
                <el-table-column
          prop="outgoingHuman"
          label="人力指出"
          width="200">
        </el-table-column>
                <el-table-column
          prop="outgoingPurchase"
          label="外购"
          width="200">
        </el-table-column>
                <el-table-column
          prop="profit"
          label="利润"
          width="200">
        </el-table-column>
       
      </el-table>
    </div>

      <el-dialog
      title="查询明细"
      :visible.sync="searchDialogVisible"
      width="30%"
      close="close()">
      <el-form :model="this.SearchForm" :label-width="'100px'" size="mini">
      
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
  import {getSaledetail,getSaleSituation} from "../../network/finance";
import { formatDate } from "@/common/utils";
  export default {
    components: {
        Layout,
        Title
    },

  data() {
    return{
      saleDetailList:[],
      SearchForm:{
        from: null,
        to: null,
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
    CheckYear(){
      let from = 20220000
      let to   = 20230000
      getSaleSituation(
          {params:{from:from,to:to}},
          ).then(_res => {
            //console.log("profit")
             //console.log(_res);
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
              this.saleDetailList = [_res.result]
              console.log(this.saleDetailList)
              this.SearchForm = {};
              this.searchDialogVisible = false;
            }
          })
          
    },
    handleSearch(type){
      if (type === false) {
          this.searchDialogVisible = false;
          this.SearchForm = {};
        } else if (type === true) {
          let t = this.SearchForm
          //console.log(this.SearchForm)
          let from = t.from.substr(0,4) + t.from.substr(5,2) + t.from.substr(8,2)
          let to = t.to.substr(0,4) + t.to.substr(5,2) + t.to.substr(8,2)

          getSaleSituation(
          {params:{from:from,to:to}},
          ).then(_res => {
            //console.log("profit")
             //console.log(_res);
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
              this.saleDetailList = [_res.result]
              console.log(this.saleDetailList)
              this.SearchForm = {};
              this.searchDialogVisible = false;
            }
          })
          
        }
    },
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
