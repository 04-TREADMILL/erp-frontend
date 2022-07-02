<template>
<div class="card">员工</div>
</template>

<script>
import { unclocked_ls, clocked_ls } from '../../../network/employee'

export default {
  name: "CLockList",
  props: {
    list: Array,
    type: Number,
  },
  data() {
    return {
      showAll: [],
      
    }
  },
  mounted() {
    console.log("CLockLIst")
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  .button {
    float: right;
    padding: 3px 0
  }
}
.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>