<template>
  <div>
    <InventoryInOutCard
      :card_type="card_type"
      @handleSubmit="handleSubmit"
    ></InventoryInOutCard>
    <el-dialog
      title="确认出货单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      v-if="inventoryOutConfirmList.length > 0"
    >
      <div class="basic-info">
        <div class="title">
          <h1>{{ product_info.name }}</h1>
          <span>ID: {{ product_info.id }}</span>
        </div>
        <div class="photo-box">
          <img src="@/assets/pic/dell.png" alt="dell computer" />
<!--          图片写死-->
        </div>
<!--        TODO My:使用v-for重写下面的代码；修改class="type"的样式-->
        <div class="type">
          <h3>类型</h3>
          <div>{{ product_info.type }}</div>
        </div>
        <div class="type">
          <h3>批次</h3>
          <div>{{ inventoryOutConfirmList[0].batchId }}</div>
        </div>
        <div class="type">
          <h3>购价</h3>
          <div>{{ inventoryOutConfirmList[0].purchasePrice }}</div>
        </div>
        <div class="type">
          <h3>选购数量</h3>
          <div>{{ inventoryOutConfirmList[0].selectedQuantity }}</div>
        </div>
        <div class="type">
          <h3>批次总量</h3>
          <div>{{ inventoryOutConfirmList[0].totalQuantity }}</div>
        </div>
        <div class="type">
          <h3>总金额</h3>
          <div>{{ inventoryOutConfirmList[0].sumPrice }}</div>
        </div>
        <div class="type">
          <h3>备注</h3>
          <div>{{ inventoryOutConfirmList[0].remark }}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>

</template>

<script>
import InventoryInOutCard from "@/views/inventory/components/InventoryInOutCard";
import { warehouseOutput, warehouseOutputPre } from "@/network/warehouse";

export default {
  name: "inventoryOut",
  components: {
    InventoryInOutCard
  },
  data() {
    return {
      card_type: "出库",
      inventoryOutConfirmList: [],
      dialogVisible: false,
      product_info: { // 写死的数据；TODO My:根据productId获取product的所有信息
        "id": "0000000000400000",
        "name": "戴尔电脑",
        "type": "戴尔(DELL)Vostro笔记本电脑5410 金色 戴尔成就3500Vostro1625D",
      }
    };
  },
  methods: {
    handleSubmit(submitInfo) {
      console.log("inventoryOut submitInfo", submitInfo); //打印 子组件传递的值

      warehouseOutputPre({ //先调用该接口，确认
        pid: submitInfo.pid,
        quantity: submitInfo.quantity,
        remark: submitInfo.remark
      })
        .then(_res => {
          console.log(_res);
          this.inventoryOutConfirmList = _res.result;
          this.$message({
            message: "出库查询操作成功",
            type: "success"
          });
          this.dialogVisible = true;
        })
        .catch(_err => {
          console.log(_err);
          this.$message({
            message: _err.result,
            type: "error"
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleConfirm() {
      // TODO My:获得库存管理员姓名
      warehouseOutput({
        list: this.inventoryOutConfirmList.map(item => {
          return {
            pid: item.productId,
            purchasePrice: item.purchasePrice,
            quantity: item.selectedQuantity,
            batchId: item.batchId,
            remark: item.remark,
          }
        }),
        operator: "Leonezhurui"
      })
        .then(_res => {
          console.log("warehouseOutput", _res);
          this.$message({
            message: _res.result,
            type: "success"
          });
          this.dialogVisible = false;
        })
        .catch(_err => {
          console.log(_err);
          this.$message({
            message: _err.result,
            type: "error"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-info {
  position: relative;

  .photo-box {
    position: absolute;
    top: 25px;
    right: 50px;
    img {
      width: 100px;
      height: 80px;
    }
  }
}
</style>
