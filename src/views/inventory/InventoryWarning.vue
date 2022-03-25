<template>
  <Layout activePath="/inventoryOperation">
    <Title title="库存报警单"></Title>
    （设置一个警戒数量，当库存数量低于该数值时进行提示，向仓库管理员发送消息。）
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
