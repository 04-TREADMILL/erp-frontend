<template>
  <Layout>
    <Title title="库存盘点"></Title>
    （盘点的是当天的库存快照，包括当天的各种商品的名称，型号，库存数量，库存均价，批次，批号，出厂日期，并且显示行号。要求可以导出Excel。
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";

export default {
  components: {
    Layout,
    Title
  },
};
</script>

<style scoped></style>
