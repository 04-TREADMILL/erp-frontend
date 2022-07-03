<template>
  <Layout>
    <Title title="员工打卡"></Title>
    <el-button type="primary" size="medium" @click="addPunch">新增打卡记录</el-button>
    <!-- <div class="body">
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
    </div> -->
   <div style="margin-top: 10px">
      <el-table ref="table"
        :data="clockList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
         <el-table-column
          prop="id"
          label="打卡id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="eid"
          label="员工id"
          width="400">
        </el-table-column>
        <!-- <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column> -->
        <el-table-column
          prop="punchTime"
          label="打卡时间"
          width="300">
        </el-table-column>

      </el-table>
    </div>



      <el-dialog
      title="新增员工信息"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="addForm" :label-width="'100px'" size="mini">
      
        <!-- <el-form-item label="i d">
          <el-col :span="11">
            <el-input v-model="addForm.id" placeholder="请输入员工id" ></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="打卡id">
          <el-input v-model="addForm.id" placeholder="请输入打卡id"></el-input>
        </el-form-item>
        <el-form-item label="员工id">
          <el-input v-model="addForm.eid" placeholder="请输入员工id"></el-input>
        </el-form-item>
        <el-form-item label="打卡时间 ">
            <el-date-picker v-model="addForm.punchTime" type="datetime" placeholder="选择时间" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>   
        </el-form-item>     
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
      </div>
    </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {showEmployeepunch,addEmployeepunch,showEmployee} from "../../network/employee";
import { formatDate } from "@/common/utils";



export default {
  name: 'EmployeeDailyAttendance',
  components: {
    Layout,
    Title,
  },
  data() {
    return {
     idList:[],
     clockList: [],
     addDialogVisible: false,
     addForm:{
      id:0,
      eid:0,
      punchTime:"",
     }
    }
  },
  mounted() {
    this.addDialogVisible = false;
    showEmployee().then(_res=>{
      let ret = [];
      let punchret = []
      for(var i=0;i<_res.result.length;i++){
        let obj =_res.result[i];
        ret.push({
          id: obj.id
        })

        let config = {params:{id: obj.id}};
       
        showEmployeepunch(config).then(_res=>{
          // console.log(_res);
          punchret.push(..._res.result)
        })
      }
      this.idList = ret;
      this.clockList = punchret; 
    })
 setTimeout(()=>{
        //反异步
        for(var i=0;i<this.clockList.length;i++){
          this.clockList[i].punchTime = formatDate(this.clockList[i].punchTime);
        }
        this.clockList.sort(function(a, b){return b.id - a.id}); 
 },800)

  },
  methods: {

    getAll(){
      showEmployee().then(_res=>{
      let ret = [];
      let punchret = []
      for(var i=0;i<_res.result.length;i++){
        let obj =_res.result[i];
        ret.push({
          id: obj.id
        })
        let config = {params:{id: obj.id}};
        showEmployeepunch(config).then(_res=>{

          punchret.push(..._res.result)
        })
      }
      this.idList = ret;
      this.clockList = punchret;     
    })
     setTimeout(()=>{
          //反异步
          for(var i=0;i<this.clockList.length;i++){
            // console.log(this.clockList[i].punchTime)
            this.clockList[i].punchTime = formatDate(this.clockList[i].punchTime);
          }
      this.clockList.sort(function(a, b){return b.id - a.id}); 
 },800)
    },
    addPunch(){
        this.addDialogVisible = true;
    },
    handleAdd(type){
        // console.log(type);
        if (type === false) {
          this.addDialogVisible = false;
          this.addForm = {};
        } else if (type === true) {

          var id = this.addForm.id;
          var eid = this.addForm.eid;
          

          var time = this.addForm.punchTime
          this.addForm.punchTime =Date.parse(time)

          if(id == "") alert("打卡id不能为空！");
          else if(eid=="") alert("员工id不能为空！");
          else{
          addEmployeepunch(this.addForm).then(_res => {
            console.log(_res)
            if(_res.code === "A0004"){
              this.$message({
                type: 'error',
                message: _res.msg
              });
            } 
            else if(_res.code==="111111"){
                  this.$message({
                type: 'error',
                message: "打卡失败"
              });
            }else {
              this.$message({
                type: 'success',
                message: '打卡成功!'
              });
              this.addForm = {};
              this.addDialogVisible = false;
              this.getAll();
            }
          })
          }
        }
    },
    close(){
        this.addForm = {};
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
