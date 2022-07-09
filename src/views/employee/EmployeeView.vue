<template>
  <Layout>
    <Title title="员工管理"></Title>
        <el-button type="primary" size="medium" @click="addEmployee">新增员工</el-button>
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
          prop="birthday"
          label="出生日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          width="150">
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

        <el-table-column
          prop="salaryCalculatingMode"
          label="薪资计算方式"
          width="120">
        </el-table-column>

        <el-table-column
          prop="account"
          label="账户"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
             <template slot-scope="scope">
            <el-button
              @click="editEmployee(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="deleteEmployee(scope.row.id)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  <el-dialog
      title="新增员工信息"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="addForm" :label-width="'100px'" size="mini">

        <el-form-item label="姓 名">
          <el-input v-model="addForm.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="性 别 ">
              <el-select v-model= "addForm.gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="出生日期 ">
            <el-date-picker v-model="addForm.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="电 话">
          <el-input v-model="addForm.phone" placeholder="请输入员工电话"></el-input>
        </el-form-item>
        <el-form-item label="岗 位">
              <el-select v-model= "addForm.role" placeholder="请选择岗位">
              <el-option label="库存管理人员" value="INVENTORY_MANAGER"></el-option>
              <el-option label="人力资源人员" value="HR"></el-option>
              <el-option label="进货销售人员" value="SALE_STAFF"></el-option>
              <el-option label="财务人员" value="FINANCIAL_STAFF"></el-option>
              <el-option label="总经理" value="GM"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="addForm.basicSalary" placeholder="请输入基本工资"></el-input>
        </el-form-item>
        <el-form-item label="岗位工资">
          <el-input v-model="addForm.postSalary" placeholder="请输入岗位工资"></el-input>
        </el-form-item>
        <el-form-item label="薪资计算方式">
          <el-select v-model= "addForm.salaryCalculatingMode" placeholder="请输入工资计算方式">
              <el-option label="月薪制" value="default"></el-option>
              <el-option label="提成制" value="commission"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账 户">
          <el-input v-model="addForm.account" placeholder="请输入账户"></el-input>
        </el-form-item>
        
             
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
      </div>
  </el-dialog>


   <el-dialog
      title="修改客户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="editForm" :label-width="'100px'" size="mini">
      
        <el-form-item label="姓 名">
          <el-input v-model="editForm.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="性 别 ">
            <el-select v-model= "editForm.gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出生日期 ">
            <el-date-picker v-model="editForm.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"> </el-date-picker>   
        </el-form-item>
        <el-form-item label="电 话">
          <el-input v-model="editForm.phone" placeholder="请输入员工电话"></el-input>
        </el-form-item>
        <el-form-item label="岗 位">
            <el-select v-model= "editForm.role" placeholder="请选择岗位">
              <el-option label="库存管理人员" value="INVENTORY_MANAGER"></el-option>
              <el-option label="人力资源人员" value="HR"></el-option>
              <el-option label="进货销售人员" value="SALE_STAFF"></el-option>
              <el-option label="财务人员" value="FINANCIAL_STAFF"></el-option>
              <el-option label="总经理" value="GM"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="editForm.basicSalary" placeholder="请输入基本工资"></el-input>
        </el-form-item>
        <el-form-item label="岗位工资">
          <el-input v-model="editForm.postSalary" placeholder="请输入岗位工资"></el-input>
        </el-form-item>
        <el-form-item label="薪资计算方式">
          <el-select v-model= "editForm.salaryCalculatingMode" placeholder="请输入工资计算方式">
              <el-option label="月薪制" value="default"></el-option>
              <el-option label="提成制" value="commission"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="薪资发放方式">
          <el-input v-model="editForm.salaryGrantingMode" placeholder="请输入岗位工资"></el-input>
        </el-form-item> -->
        <el-form-item label="账 户">
          <el-input v-model="editForm.account"  readonly placeholder="请输入账户"></el-input>
        </el-form-item>   
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEdit(false)">取 消</el-button>
        <el-button type="primary" @click="handleEdit(true)">确 定</el-button>
      </div>
    </el-dialog>
  </Layout>


  
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { showEmployee } from "../../network/employee";
import { formatDate } from "@/common/utils";
import { 
  addEmployee,
  deleteEmployee,
  updateEmployee} from "../../network/employee";
export default {
  name: 'EmployeeView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      employeeList:[],
      addDialogVisible: false,
      editDialogVisible: false,
      editForm:{},
      addForm:{
        id:0,
        name:"未填",
        gender:"未填",
        birthday:'',
        phone:"未填",
        role:"",
        basicSalary:"",
        postSalary:"",
        salaryCalculatingMode:"",
        salaryGrantingMode:"",
        account:"",
      },
    }
  },
  mounted() {
    //获取员工
    showEmployee().then(_res=>{
       this.employeeList = _res.result;
       for(var i=0;i<_res.result.length;i++){
        this.employeeList[i].birthday = formatDate(_res.result[i].birthday).substr(0,10);
        if(this.employeeList[i].salaryCalculatingMode === "default") this.employeeList[i].salaryCalculatingMode="月薪制"
        else this.employeeList[i].salaryCalculatingMode ="提成制"
       }
    })
  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    //刷新页面
    getAll(){
        this.employeeList  = [];
        showEmployee().then(_res=>{
       this.employeeList = _res.result;
       for(var i=0;i<_res.result.length;i++){
        this.employeeList[i].birthday = formatDate(_res.result[i].birthday).substr(0,10);
        if(this.employeeList[i].salaryCalculatingMode === "default") this.employeeList[i].salaryCalculatingMode="月薪制"
        else this.employeeList[i].salaryCalculatingMode ="提成制"
       }
    })
    },
    //添加员工
    addEmployee(){
        this.addDialogVisible = true;
    },
    handleAdd(type){
        if (type === false) {
          this.addDialogVisible = false;
          this.addForm = {};
        } else if (type === true) {

          var name = this.addForm.name;
          var gender = this.addForm.gender;
          if(name == "") alert("姓名不能为空！");
          else if(gender=="") alert("性别不能为空！");
          else{
          if(this.addForm.salaryCalculatingMode === "月薪制") this.addForm.salaryCalculatingMode="default"
          else this.addForm.salaryCalculatingMode ="commission"
          addEmployee(this.addForm).then(_res => {
            if (_res.code === "A0002") {
              this.$message({
                type: 'error',
                message: _res.msg
              });
            } else {
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
              this.addForm = {};
              this.addDialogVisible = false;
              this.getAll();
            }
          })
          }
        }
    },
    //编辑员工
    editEmployee(id){
      this.editForm = this.employeeList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    },
    handleEdit(type){
    if(type === false){
        this.editDialogVisble = false;
        this.editForm = {};
      }else if(type === true){
        if(this.editForm.salaryCalculatingMode === "月薪制") this.editForm.salaryCalculatingMode="default"
        else this.editForm.salaryCalculatingMode ="commission"
        //更新信息
        updateEmployee(this.editForm).then(_res => {
            if (_res.code === 'B0003') {
              this.$message({
                type: 'error',
                message: _res.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.editForm = {};
              this.editDialogVisible = false;
              this.getAll();
            }
          })
      }
    },
    //删除员工
    deleteEmployee(id){
        let config = {
          params: {
            id: id
          }
        };

      this.$confirm('是否要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmployee(config).then(_res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAll();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //关闭窗口
    close(){
        this.addForm = {};
        this.editForm = {};
    },
  }
}
</script>

<style lang="scss" scoped>