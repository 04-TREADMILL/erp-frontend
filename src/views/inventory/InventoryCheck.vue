<template>
  <Layout>
    <Title title="库存盘点"></Title>
    （盘点的是当天的库存快照，包括当天的各种商品的名称，型号，库存数量，库存均价，批次，批号，出厂日期，并且显示行号。要求可以导出Excel。
    <el-button @click="exportAsExcel">导出Excel</el-button>
    <div class="table-body">
      <el-table
        :data="cur_list"
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed type="index" label="行号" min-width="12%">
        </el-table-column>
        <el-table-column label="商品Id" min-width="13%">
          <template slot-scope="scope">
            <el-button type="text" @click="showProduct(scope.row)">{{ scope.row.product.id }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" min-width="12%">
        </el-table-column>
        <el-table-column prop="batchId" label="批次" min-width="12%">
        </el-table-column>
        <el-table-column prop="purchasePrice" label="价格" min-width="12%">
        </el-table-column>
        <el-table-column prop="productionDate" label="日期" min-width="12%">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="商品详细信息"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <div>
        <el-table
          :data="cur_product"
          style="width: 100%;"
          :header-cell-style="{'text-align': 'center'}"
          :cell-style="{'text-align': 'center'}">
          <el-table-column
            fixed
            prop="id"
            label="编号"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            min-width="10%">
          </el-table-column>
          <el-table-column
            prop="type"
            label="型号"
            min-width="15%">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="库存数量"
            min-width="8%">
          </el-table-column>
          <el-table-column
            prop="purchasePrice"
            label="进价"
            min-width="8%">
          </el-table-column>
          <el-table-column
            prop="retailPrice"
            label="零售价"
            min-width="8%">
          </el-table-column>
          <el-table-column
            prop="recentPp"
            label="最近进价"
            min-width="8%">
          </el-table-column>
          <el-table-column
            prop="recentRp"
            label="最近零售价"
            min-width="8%">
          </el-table-column>
        </el-table>
      </div>

    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { 
  getWarehouseCounting,
  getExcelExport } from "@/network/warehouse";
import axios from "axios";

export default {
  components: {
    Layout,
    Title
  },
  data(){
    return {
      cur_list: [],
      cur_row: {},
      dialogVisible: false,
    }
  },
  computed: {
    cur_product() {
      let temp = [];
      temp.push(this.cur_row.product);
      return temp;
    }
  },
  mounted() {
    getWarehouseCounting().then(_res => {
      // console.log("库存盘点", _res);
      this.cur_list = _res.result;
      this.cur_row = this.cur_list[0];
    })

  },
  methods: {
    
    exportAsExcel() {
      //TODO 导出Excel
      console.log("EXCEL")
      // getExcelExport().then(_res=>{

      //   console.log(_res);
        
      // })
    // axios({
    //   url:'/api/warehouse/warehouse/exportExcel',
    //   method:'get',
    //   responseType:'blob'
    // }).then(res =>{
    //    let blob = new Blob([res.data],{type:'application/vnd.ms-excel'})
    //    let objectUrl = URL.createObjectURL(blob)
    //    console.log(blob);
    //    const a = document.createElement('a')
    //    a.download = 'xxx.xlsx'
    //    a.href = objectUrl
    //    a.click()
    //    a.remove()
    // })

     axios({
        method: "get",
        url: "/api/warehouse/warehouse/exportExcel",//这是接口地址
        data: {},
        responseType: "blob",
      }).then((response) => {
        downLoadXls(response);
        function downLoadXls(response) {
          const content = response.data;
          const blob = new Blob([content]);
          const fileName = "名单.xls";//这是设置表格的文件名
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        }
      });



/**
 * 导出
 * @param  {function} apiFn -导出文件的api接口名称
 * @param  {object} payload={} -接口要传的参数
 * @param  {string} title='test' -导出文件的名称
 * @param  {string} type='.xls' -导出文件的格式，后缀名
 */

    const excelExportFn1 = (apiFn, payload = {}, title = 'test', type = '.xls') => {
  return new Promise((resolve, reject) => {
    apiFn(payload).then(res => {
      let response = res.data // 这里根据你的接口格式写
      let blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      // for IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, title + type)
      } else {
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        let url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = title + type
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      }
      resolve()
    })
  })
}
    },
    showProduct(row) {
      this.cur_row = row;
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style scoped>

.table-body {
  width: 80%;
  margin: 20px auto;
}
</style>
