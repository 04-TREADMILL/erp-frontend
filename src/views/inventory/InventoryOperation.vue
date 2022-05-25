<template>
  <Layout>
    <Title title="库存操作"></Title>


    <Echarts :chart-axis="chartAxis" :chart-data="chartData" v-if="product_data.length!==0"></Echarts>
    <!--上面v-if：异步请求到数据之后，computed再次计算，再完成实际表格内容的渲染-->
    <div class="operation_list">
      <div class="operation_wrapper">
        <div v-for="(item, index) in operation" :key="index" class="info-item">
          <info-card :info="item" @myClick="handleClick"></info-card>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import Echarts from "@/components/Echarts";
import infoCard from "@/views/inventory/components/operationCard";
import { findAllProduct } from "@/network/product";

export default {
  name: "InventoryOperation",
  components: { Echarts, Layout, Title, infoCard },
  data() {
    return {
      test_data: [
        {
          id: "0000000000400000",
          name: "戴尔电脑",
          categoryId: 4,
          type: "戴尔(DELL)Vostro笔记本电脑5410 金色 戴尔成就3500Vostro1625D",
          quantity: 3200,
          purchasePrice: 3000.0,
          retailPrice: 4056.0,
          recentPp: 3250.0,
          recentRp: null
        },
        {
          id: "0000000000500000",
          name: "iphone",
          categoryId: 5,
          type: "iphone14maxpro",
          quantity: 3650,
          purchasePrice: 6000.0,
          retailPrice: 10000.0,
          recentPp: 6750.0,
          recentRp: null
        },
        {
          id: "0000000000500001",
          name: "iphone",
          categoryId: 5,
          type: "iphone14普通版",
          quantity: 2600,
          purchasePrice: 4000.0,
          retailPrice: 8000.0,
          recentPp: 3900.0,
          recentRp: null
        },
        {
          id: "0000000000500002",
          name: "坚果",
          categoryId: 5,
          type: "pro3",
          quantity: 2900,
          purchasePrice: 2499.0,
          retailPrice: 3199.0,
          recentPp: null,
          recentRp: null
        }
      ],
      product_data: [],
      operation: [
        {
          type: "InventoryIn",
          title: "入库",
          content: "点击以入库",
          avatar: require("@/assets/pic/in.svg")
        },
        {
          type: "InventoryOut",
          title: "出库",
          content: "点击以出库",
          avatar: require("@/assets/pic/out.svg")
        },
        {
          type: "InventoryLoss",
          title: "库存报损",
          content: "点击以报损",
          avatar: require("@/assets/pic/loss.svg")
        },
        {
          type: "InventoryOverflow",
          title: "库存报溢",
          content: "点击以报溢",
          avatar: require("@/assets/pic/overflow.svg")
        },
        {
          type: "InventoryPresent",
          title: "库存赠送",
          content: "点击以赠送",
          avatar: require("@/assets/pic/present.svg")
        },
        {
          type: "InventoryWarning",
          title: "库存报警",
          content: "点击以报警",
          avatar: require("@/assets/pic/warning.svg")
        }
      ],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    chartData() {
      return this.product_data.map(item => item.quantity);
    },
    chartAxis() {
      return this.product_data.map(item => item.name);
    }
  },
  methods: {
    fetchData() {
      findAllProduct()
        .then(_res => {
          console.log(_res);
          this.product_data = _res.result;
        })
        .catch(_err => {
          console.log(_err);
        });
    },
    handleClick(type) {
      console.log(type);
      this.$router.push({ name: type, params: { payload: {} } });
    },
  }
};
</script>

<style lang="scss" scoped>
.operation_list {
  margin: 30px 250px;
  width: 1000px; //TODO My:不要写成固定值
  overflow: hidden;

  .operation_wrapper {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .info-item {
      margin-right: 100px;
      margin-bottom: 60px;
    }
  }
}
</style>
