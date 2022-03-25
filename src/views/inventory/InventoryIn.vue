<template>
  <InventoryInOutCard
    :card_type="card_type"
    @handleSubmit="handleSubmit"
  ></InventoryInOutCard>
</template>

<script>
import InventoryInOutCard from "@/views/inventory/components/InventoryInOutCard";
import { warehouseInput } from "@/network/warehouse";

export default {
  name: "inventoryIn",
  components: {
    InventoryInOutCard,
  },
  data() {
    return {
      card_type: "入库",
    };
  },
  mounted() {
  },
  methods: {
    handleSubmit(submitInfo) {
      console.log("inventoryIn submitInfo", submitInfo); //打印 子组件传递过来的值
      //TODO My:vuex获取操作人姓名
      let tempList = [];
      tempList.push(submitInfo);

      warehouseInput({
        list: tempList,
        operator: "Leonezhurui"
      })
        .then(_res => {
          console.log(_res);
          this.$message({
            message: _res.result,
            type: "success"
          });
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
</style>
