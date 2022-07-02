<template>
  <Layout>
    <Title title="员工打卡"></Title>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="今日未打卡" name="PENDING_LEVEL_1">
          <div v-if="unclocked.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="unclocked" :type="1" @refresh="getClock()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="今日已打卡" name="PENDING_LEVEL_2">
          <div v-if="clocked.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="clocked" :type="2" @refresh="getClock()"/>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import ClockList from "./components/ClockList";

export default {
  name: 'EmployeeDailyAttendance',
  components: {
    Layout,
    Title,
    ClockList
  },
  data() {
    return {
     activeName: 'PENDING_LEVEL_1',
     clockList: [],
     unclocked: [],
     clocked: [],
    }
  },
  mounted() {
    
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>
