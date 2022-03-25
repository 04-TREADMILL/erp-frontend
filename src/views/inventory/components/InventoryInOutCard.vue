<template>
  <Layout activePath="/inventoryOperation">
    <Title :title="type_info"></Title>

    <div class="select-wrapper">
      <el-autocomplete
        class="myAutocomplete"
        v-model="selected_product"
        :fetch-suggestions="querySearch"
        placeholder="请选择商品"
        @select="handleSelect"
        :popper-append-to-body="false"
      >
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          @click="handleIconClick"
        >
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="id">id: {{ item.id }}</span>
        </template>
      </el-autocomplete>
    </div>

    <product-info-card
      v-if="cur_product"
      class="info-card"
      :card_type="card_type"
      :product_info="cur_product"
      @handleSubmit="handleSubmit"
    ></product-info-card>
  </Layout>
</template>

<script>
import Title from "@/components/content/Title";
import Layout from "@/components/content/Layout";
import ProductInfoCard from "@/views/inventory/components/productInfoCard";
import { findAllProduct } from "@/network/product";

export default {
  name: "InventoryInOutCard",
  components: {
    Title,
    Layout,
    ProductInfoCard
  },
  props: {
    card_type: { // 根据该props值，确定是出库还是入库，出库、入库显示不同的界面
      type: String,
      default: "入库"
    }
  },
  data() {
    return {
      selected_product: "",
      cur_product: null,
      all_products: []
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    type_info() {
      if (this.card_type === "入库") {
        return "库存入库单";
      } else if (this.card_type === "出库") {
        return "库存出库单";
      }
      return "";
    }
  },
  methods: {
    fetchData() {
      findAllProduct()
        .then(_res => {
          console.log("fetchProduct", _res);
          this.all_products = _res.result;
        })
        .catch(_err => {
          console.log(_err);
        });
    },
    querySearch(queryString, cb) {
      let products = this.all_products.map(item => {
        return {
          value: item.name,
          id: item.id
        };
      });
      let results = queryString
        ? products.filter(
            item =>
              item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
          )
        : products; //注意这里的item.value
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      // name和id完全匹配，才确定了 当前的product
      this.cur_product = this.all_products.find(
        i => i.name === item.value && i.id === item.id
      );
    },
    handleIconClick(ev) {
      //TODO My:点击清空input中的值
      console.log(ev);
    },
    handleSubmit(submitInfo) {
      console.log("InventoryInOutCard submitInfo", submitInfo); //打印 子组件传递过来的值
      this.$emit("handleSubmit", submitInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  width: 980px;
  margin: 70px auto 30px auto;

  .myAutocomplete {
    width: 350px;

    ::v-deep li {
      padding: 10px 20px;
      line-height: 20px;

      .name {
        font-size: 14px;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .id {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .id {
        color: #ddd;
      }
    }
  }

  .info-card {
    margin-top: 100px;
  }
}
</style>
