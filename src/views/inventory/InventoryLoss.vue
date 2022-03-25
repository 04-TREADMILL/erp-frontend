<template>
  <Layout activePath="/inventoryOperation">
    <Title title="库存报损单"></Title>
    （当实际库房中的商品数量比系统中的少时要进行库存报溢，向系统库存中减少商品使一致。）
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
      console.log(this.$route.params)
      if(this.$route.params.payload == null) { // 未携带参数, 跳转回库存盘点页面
        this.$router.push("/inventoryOperation")
      }
    }
  };
</script>

<style scoped>
</style>
