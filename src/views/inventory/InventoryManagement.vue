<template>
  <Layout>
    <Title title="出入库确认"></Title>

    <Echarts :chart-axis="chartAxis" :chart-data="chartData" v-if="product_data.length!==0"></Echarts>
    <!--上面v-if：异步请求到数据之后，computed再次计算，再完成实际表格内容的渲染-->

    <div class="table-body">
      <el-table
        :data="draft_list"
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed type="index" label="行号" min-width="12%">
        </el-table-column>
        <el-table-column prop="id" label="Id" min-width="13%">
        </el-table-column>
        <el-table-column label="订单Id" min-width="13%" >
          <template slot-scope="scope">
            <el-button type="text" @click="showSaleSheet(scope.row)" v-if="scope.row.type === '入库'">{{ scope.row.purchaseSheetId }}</el-button>
            <el-button type="text" @click="showSaleSheet(scope.row)" v-else-if="scope.row.type === '出库'">{{ scope.row.saleSheetId }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" min-width="10%">
        </el-table-column>
        <el-table-column prop="batchId" label="批次" min-width="10%">
          <template slot-scope="scope">
            <span v-if="scope.row.type === '入库'">{{scope.row.batchId}}</span>
            <span v-else-if="scope.row.type === '出库'">无</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="20%">
        </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-check"  circle size="mini" @click="confirm(scope.row, 'SUCCESS')"></el-button>
            <el-button type="danger" icon="el-icon-close" circle size="mini" @click="confirm(scope.row, 'FAILURE')"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
      <div>
        <purchase-list :list="successList" :type="5" v-if="cur_row.type === '入库'"/>
        <sale-list :list="successList" :type="5" v-if="cur_row.type === '出库'"/>
      </div>

    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getWarehouseInputSheet,
  getWarehouseOutputSheet,
  warehouseInputSheetApprove,
  warehouseOutputSheetApprove
} from "@/network/warehouse";
import { getPurchaseBySheetId } from "@/network/purchase";
import PurchaseList from "@/views/purchase/components/PurchaseList";
import { findAllProduct } from "@/network/product";
import Echarts from "@/components/Echarts";
import { getSaleBySheetId } from "@/network/sale";
import SaleList from "@/views/sale/components/SaleList";
export default {
  components: {
    SaleList,
    Echarts,
    PurchaseList,
    Layout,
    Title
  },
  created() {
    getWarehouseInputSheet({ //获取进货单草稿
      params : {
        state: "DRAFT",
      }
    }).then(res => {
      console.log(res);
      this.draft_list = res.result.map(item => { //加入标识
        item["type"] = "入库";
        return item;
      });

      getWarehouseOutputSheet({ //获取销售单草稿
        params : {
          state: "DRAFT",
        }
      }).then(res => {
        console.log(res);
        this.draft_list = this.draft_list.concat(res.result.map(item => { //加入标识；拼接数组
          item["type"] = "出库";
          return item;
        }));

        this.cur_row = this.draft_list[0]; //默认获取第一个元素
      })
    })

    this.fetchEchartsData(); //获取商品信息
  },
  data(){
    return {
      draft_list: [], //出入库草稿列表
      dialogVisible: false,
      cur_row: {}, //当前行
      successList: [], //当前需要展示的进货单或者销售单
      product_data: [], //echarts数据
    }
  },
  computed: {
    dialogTitle(){ //确认dialog的标题
      if(this.cur_row) {
        if(this.cur_row.type === "入库") {
          return "确认进货单内容";
        }else if(this.cur_row.type === "出库") {
          return "确认销售单内容";
        }
      }
      return "确认订单内容";
    },
    chartData() {
      return this.product_data.map(item => item.quantity);
    },
    chartAxis() {
      return this.product_data.map(item => item.name);
    }

  },
  methods: {
    fetchEchartsData() {
      findAllProduct()
        .then(_res => {
          console.log("获取商品库存信息", _res);
          this.product_data = _res.result;
        })
        .catch(_err => {
          console.log(_err);
        });
    },
    showSaleSheet(row){
      //获取进货单或者销售单详情，在dialog中展示
      if(row.type === '入库') {
        console.log("进货单Id", row.purchaseSheetId);
        getPurchaseBySheetId({
          params: {
            id: row.purchaseSheetId,
          }
        }).then(_res => {
          console.log("fingBySheetId", _res);
          this.successList = [];
          this.successList.push(_res.result);
        })
      }else if(row.type === '出库'){
        console.log("销售单Id", row.saleSheetId);
        getSaleBySheetId({
          params: {
            id: row.saleSheetId,
          }
        }).then(_res => {
          console.log("fingBySheetId", _res);
          this.successList = [];
          this.successList.push(_res.result);
        })
      }
      this.cur_row = row; //更新当前行
      this.dialogVisible = true; //打开dialog
    },
    confirm(row, state) {
      //出入库确认操作
      //TODO 确认之后响应式更新echarts
      this.$confirm('请确认'+row.type+'操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.type === "出库") {
          warehouseOutputSheetApprove({
            params: {
              sheetId: row.id,
              state: state,
            }
          }).then(async res => {
            console.log("出库成功", res);
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.draft_list.splice(row.index, 1);
            await this.fetchEchartsData();
          })
        }else if (row.type === "入库"){
          warehouseInputSheetApprove({
            params: {
              sheetId: row.id,
              state: state,
            }
          }).then(async res => {
            console.log("出库成功", res);
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            this.draft_list.splice(row.index, 1);
            await this.fetchEchartsData();
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '操作失败'
        });
      });
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style scoped>
.table-body {
  width: 95%;
  margin: 20px auto;
}
</style>
