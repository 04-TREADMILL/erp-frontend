<template>
  <Layout>
    <Title title="年终奖"></Title>
  <div style="margin-top: 10px">
      <el-table ref="table"
        :data="employeeList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="70">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="80"
          :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.gender === '男' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.gender}}
            </el-tag>
          </template>
        </el-table-column>
       
        <el-table-column
          prop="role"
          label="工作岗位"
          width="150">
        </el-table-column>
        <el-table-column
          prop="basicSalary"
          label="基本工资"
          width="100">
        </el-table-column>
        <el-table-column
          prop="postSalary"
          label="岗位工资"
          width="100">
        </el-table-column>
        <!-- <el-table-column
          prop="lineOfCredit"
          label="岗位级别"
          width="120">
        </el-table-column> -->
        <el-table-column
          prop="salaryCalculatingMode"
          label="薪资计算方式"
          width="120">
        </el-table-column>
        <!-- <el-table-column
          prop="salaryGrantingMode"
          label="薪资发放方式"
          width="120">
        </el-table-column> -->
    
        <el-table-column
          prop="allocated"
          label="发放"
          width="200">
            <template slot-scope="scope">
            <el-button type="success"   :disabled="false" @click="handleallocate(scope.row.id)">发放年终奖</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="年终奖金额"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="close()">
      <el-form  :label-width="'100px'" size="mini">
        <el-form-item label="金额">
          <el-input v-model="bonus" placeholder="请输入金额"></el-input>
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
import { allocateAnnualBonus,showAnnualBonus, showEmployee } from "../../network/employee";
export default {
  name: 'AnnualBonus',
  components: {
    Layout,
    Title
  },
  data() {
    return {
     employeeList:[],
     bonus:0,
     addDialogVisible:false,
     cur_id:0
    }
  },
  mounted() {
    //获取员工
    showEmployee().then(_res=>{
        this.employeeList = _res.result
        //初始化年终奖
        for(var i=0;i<_res.result.length;i++){
            this.employeeList[i].allocated = true
        }
    })
    //Js异步处理
    setTimeout(()=>{
        for(let i=0;i<this.employeeList.length;i++){
            let config = {params:{id:this.employeeList[i].id}}
            showAnnualBonus(config).then(_res=>{
              console.log(_res)
                if(_res.result){
                    this.employeeList[i].allocated = false;
                }
            })
        }
    },400)
  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    //发放年终奖
    handleAdd(type){
        if (type === false) {
          this.addDialogVisible = false;
          this.bonus = 0;
        } else if (type === true) {
            let check = true;
            //判断是否具备发放资格
            for(var i=0;i<this.employeeList.length;i++){
                if(this.employeeList[i].id==this.cur_id){
                    if(this.employeeList[i].allocated){
                        check = false
                        this.$message({
                        type: 'error',
                        message: '不可重复发放!'
                    });
                    }
                }
            }
            if(check){
              //发放年终奖
            allocateAnnualBonus({params:{id:this.cur_id,extraBonus:this.bonus}}).then(_res => {
              if (_res.code === "A0002") {
                this.$message({
                  type: 'error',
                  message: _res.msg
                });
              } else {
              this.$message({
                type: 'success',
                message: '发放成功!'
              });
              this.bonus = 0;
              this.addDialogVisible = false;
              //刷新前端界面，但是避免全局刷新
                for(var i=0;i<this.employeeList.length;i++){
                    if(this.employeeList[i].id === this.cur_id) this.employeeList[i].allocated = true;
                }
            }
          })
            }
        }
    },
    //弹出年终奖窗口
    handleallocate(id){
        this.addDialogVisible = true;
        this.cur_id = id
    },
    //关闭窗口
    close(){
        this.bonus = 0;
    },
  }
}
</script>

<style lang="scss" scoped>