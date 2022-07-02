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
            <clock-list :list="unclocked" :type="1" @refresh="getClock()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="今日已打卡" name="PENDING_LEVEL_2">
          <div v-if="clocked.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <clock-list :list="clocked" :type="2" @refresh="getClock()"/>
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
import {showEmployeepunch,addEmployeepunch,showEmployee} from "../../network/employee";


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
     idList:[],
     employeeList:[],
     clockList: [],
     unclocked: [],
     clocked: [],
    }
  },
  mounted() {
    showEmployee().then(_res=>{
      this.employeeList = _res.result;
      let res = []
      let unclockedlist = []

      _res.result.forEach((item, index) => {
            let obj = item
            res.push({
                id: obj.id,
            })
            unclockedlist.push({
              id: obj.id,
              name: obj.name,
              role: obj.role,
              gender: obj.gender
            })
      })
      // console.log(res)
      this.idList = res;
      this.unclocked = unclockedlist
    })

  },
  methods: {

  getClock(){

  },
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
