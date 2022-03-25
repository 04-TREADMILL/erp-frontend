<template>
  <div class="common-title">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
  export default {
    name: "Title",
    components: {},
    props: {
      title: String,
    },
    data() {
      return {};
    },
    created() {},
    mounted() {},
    methods: {},
    computed: {},
    watch: {},
  };
</script>

<style scoped>
h1 {
  font-weight: 400;
  font-family: Roboto,sans-serif;
  font-size: 3rem!important;
  line-height: 3.125rem;
  letter-spacing: normal!important;
  margin: 0px;
}
.common-title {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: solid 1px rgb(204, 204, 204);
}
</style>
