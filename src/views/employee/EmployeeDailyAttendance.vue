



<template>
  <Layout>
    <Title title="员工打卡"></Title>

   <div style="margin-top: 10px">
      <el-table ref="table"
        :data="employeeList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
         <el-table-column
          prop="id"
          label="员工id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="lastmonthtimes"
          label="上个月打卡次数"
          width="200">
        </el-table-column>
        <el-table-column
          prop="thismonthpunch"
          label="本月打卡次数"
          width="150">
        </el-table-column>
        <el-table-column
          prop="latestpunch"
          label="最近一次打卡"
          width="300">
        </el-table-column>
        <el-table-column
          prop="punchdisable"
          label="打卡"
          width="200">
          <template slot-scope="scope">
            <el-button type="success"  :disabled="scope.row.punchdisable" @click="handlepunch(scope.row.id)">打卡</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>



  

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {addEmployeepunch,
        showEmployee,
        showlastmonthpunch,
        showthismonthpunch,
        showlatestpunch} from "../../network/employee";
export default {
  name: 'EmployeeDailyAttendance',
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      employeeList:[],
      today:"",
    }
  },
  mounted() {
    //获取员工
    this.getemployee()
  },
  methods: {
    getemployee(){
      let list = []
      showEmployee().then(_res=>{
          var date = new Date()
          this.today = this.formatDateTime(date) 
          //添加上月打卡，本月打卡，上次打卡属性
        for(var i=0;i<_res.result.length;i++){
          let obj = {}
          obj.id = _res.result[i].id
          obj.name = _res.result[i].name
          obj.thismonthpunch = ""
          obj.lastmonthtimes = ""
          obj.latestpunch = ""
          obj.punchdisable = false
          showlastmonthpunch({params:{id:obj.id}}).then(_res=>{
            obj.lastmonthtimes = _res.result
          })
          showthismonthpunch({params:{id:obj.id}}).then(_res=>{
            obj.thismonthpunch = _res.result
          })
          showlatestpunch({params:{id:obj.id}}).then(_res=>{
            obj.latestpunch = _res.result
          if(_res.result === this.today) obj.punchdisable = true
          else obj.punchdisable = false
          list.push(obj)
          })
        }
      })
        this.employeeList = list      
    },
    // 中国标准时间 转换成 年月日
    formatDateTime (date) {
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          var minute = date.getMinutes();
          minute = minute < 10 ? ('0' + minute) : minute;
          // return y + '-' + m + '-' + d+' '+h+':'+minute;
          console.log(y+m+d)
          return y +  ''+ m + '' + d
    },
    // 打卡
    handlepunch(id){
      var timestamp = Date.parse(new Date())
      addEmployeepunch({id:0,
                        eid:id,
                        punchTime:timestamp}).then(_res=>{
       // 刷新前端显示界面
        for(var i =0;i<this.employeeList.length;i++){
          if(this.employeeList[i].id === id) {this.employeeList[i].punchdisable = true
          this.employeeList[i].thismonthpunch = this.employeeList[i].thismonthpunch+1
          this.employeeList[i].latestpunch = this.today }
        }
          this.$message({
                type: 'success',
                message: '打卡成功!'
              });
      })
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
