<template>
  <Layout>
    <Title title="库存查看"></Title>
    (设定一个时间段，查看此时间段内的出/入库数量/金额，销售/进货的数量/金额。库存数量要有合计，这一点统一于普适需求。）
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

<style scoped>
</style>
