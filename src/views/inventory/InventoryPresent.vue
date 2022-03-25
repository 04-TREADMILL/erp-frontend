<template>
  <Layout activePath="/inventoryOperation">
    <Title title="库存赠送单"></Title>
    （库存赠送单，选择一些库存中的商品进行赠送，单据提交后从库存中减去这些商品。）
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
    beforeMount() {
      if(this.$route.params.payload == null) { // 未携带参数, 跳转回库存盘点页面
        this.$router.push("/inventoryOperation")
      }
    }
  };
</script>

<style scoped>
</style>
