<template>
  <Layout>
    <Title title="销售明细"></Title>
      <el-button type="primary" size="medium" @click="SearchDetail">查询销售明细</el-button>
      <el-button type="primary" style="margin-left:850px" size="medium" @click="exportAsExcel">导出 Excel</el-button>
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
          width="100">
        </el-table-column>
        <el-table-column
          prop="type"
          label="型号"
          width="400">
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
      close="close()">
      <el-form :model="SearchForm" :label-width="'100px'" size="mini">
      
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
        <el-form-item label="商 品">
            <el-select v-model="SearchForm.product" placeholder="请输入商品名称">
              <el-option
                  v-for="item in productList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
              </el-option>
            </el-select>
        </el-form-item>

        <!-- <el-form-item label="客 户">
            <el-select v-model="SearchForm.customerId" placeholder="请输入客户Id">
              <el-option
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
                <el-form-item label="业务员">
            <el-select v-model="SearchForm.salesman" placeholder="请输入业务员">
              <el-option
                  v-for="item in customerList"
                  :key="item.operator"
                  :label="item.operator"
                  :value="item.operator">
              </el-option>
            </el-select>
        </el-form-item> -->
     
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
  import {getSaledetail,getSaleDetailExport} from "../../network/finance";
  import {getAllCommodity} from "../../network/commodity";
  import { getAllCustomer } from "../../network/purchase";

  export default {
    components: {
        Layout,
        Title
    },

  data() {
    return{
      saleDetailList:[],
      SearchForm:{
        customerId: "",
        product:"",
        from:null,
        to: null,
        salesman: null
      },
      searchDialogVisible: false,
      customerList:[],
      productList:[],

    }
  },

  async mounted() {
    //获取销售明细
    await getSaledetail().then(_res=>{
      this.saleDetailList = _res.result
    })
    //获取销售商 and 供应商
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    //获取商品
    await getAllCommodity().then(_res=>{
      for(var i=0;i<_res.result.length;i++){
        let obj = {}
        obj.name = ""
        obj.name = _res.result[i].name
        this.productList.push(obj)
      }
    })
  },
  methods: {
    //导出EXCEL
    exportAsExcel() {
      if(this.saleDetailList.length===0){
         this.$message({
                type: 'error',
                message: '表单不可为空!'
              });
      }else{
      getSaleDetailExport({responseType:'blob'}).then(_res=>{
        let blob = new Blob([_res],{
          type:"application/vnd.ms.excel",
        });
        let filename = "Inventory.xls";
        var blobUrl = window.URL.createObjectURL(blob);
        var temp = document.createElement("a");
        temp.style.display = "none";
        temp.href = blobUrl;
        temp.setAttribute("download",filename);
        if(typeof temp.download == "undefined"){
          temp.setAttribute("target","_black");
        }
        document.body.appendChild(temp);
        temp.click();
        document.removeChild(temp);
        window.URL.revokeObjectURL(blobUrl);
      })
      }
    },
    //数据刷新
    getAll(){
      getSaledetail()
    },
    //弹出窗口
    SearchDetail(){
      this.searchDialogVisible = true
    },
    //处理数据
    handleSearch(type){
      if (type === false) {
          this.searchDialogVisible = false;
          this.SearchForm = {};
        } else if (type === true) {

          let t = this.SearchForm
          t.from = t.from.substr(0,4) + t.from.substr(5,7) + t.from.substr(8,10)
          t.to = t.to.substr(0,4) + t.to.substr(5,7) + t.to.substr(8,10)
          //时间格式处理
          
          getSaledetail(
           {params:{from:t.from,
           to:t.to,
           product:t.product,
        }}).then(_res => {
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
              //查询成功后 处理数据
              this.saleDetailList = _res.result
              this.dealwithTime()
              this.SearchForm = {};
              this.searchDialogVisible = false;
            }
          })
          
        }
    },
    //时间格式处理
    dealwithTime(){
      var t = this.saleDetailList
      for(var i=0;i<t.length;i++){
        var time = t[i].time.substr(0,10)
        t[i].time = time}
      this.saleDetailList = t
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
