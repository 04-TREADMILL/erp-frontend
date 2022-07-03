<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="addCustomer">新增客户</el-button>
    <div style="margin-top: 10px">
      <el-table ref="table"
        :data="customerList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '供应商' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="zipcode"
          label="邮编"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="lineOfCredit"
          label="应收额度(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="receivable"
          label="应收(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="payable"
          label="应付(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
             <template slot-scope="scope">
            <el-button
              @click="editCustomer(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="deleteCustomer(scope.row.id)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="新增客户信息"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="addForm" :label-width="'100px'" size="mini">
      
        <el-form-item label="i d">
          <el-col :span="11">
            <el-input v-model="addForm.id" placeholder="请输入客户id" ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓 名">
          <el-input v-model="addForm.name" placeholder="请输入客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="类 型">
              <el-select v-model= "addForm.type" placeholder="请选择类型">
              <el-option label="供应商" value="供应商"></el-option>
              <el-option label="销售商" value="销售商"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="级 别">
          <el-col :span="11">
            <el-input v-model="addForm.level" placeholder="请输入客户级别" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电 话">
          <el-input v-model="addForm.phone" placeholder="请输入客户电话"></el-input>
        </el-form-item>
        <el-form-item label="地 址">
          <el-input v-model="addForm.address" type="textarea" :rows="2" placeholder="请输入客户地址"></el-input>
        </el-form-item>
        <el-form-item label="邮 编">
          <el-input v-model="addForm.zipcode" placeholder="请输入客户邮编"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱">
          <el-input v-model="addForm.email" placeholder="请输入客户邮箱"></el-input>
        </el-form-item>
        <el-form-item label="应收额度">
          <el-input v-model="addForm.lineOfCredit" placeholder="请输入应收额度（元）"></el-input>
        </el-form-item>
        <el-form-item label="应收">
          <el-input v-model="addForm.receivable" placeholder="请输入应收（元）"></el-input>
        </el-form-item>
        <el-form-item label="应付">
          <el-input v-model="addForm.payable" placeholder="请输入应收（元）"></el-input>
        </el-form-item>
        <el-form-item label="操作员">
          <el-input v-model="addForm.operator" placeholder="请输入操作员"></el-input>
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
      
        <el-form-item label="i d">
          <el-col :span="11">
            <el-input v-model="editForm.id" placeholder="请输入客户id"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓 名">
          <el-input v-model="editForm.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="类 型">
              <el-select v-model= "editForm.type" placeholder="请选择类型">
              <el-option label="供应商" value="供应商"></el-option>
              <el-option label="销售商" value="销售商"></el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="级 别">
          <el-col :span="11">
            <el-input v-model="editForm.level" placeholder="请输入客户级别" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电 话">
          <el-input v-model="editForm.phone" placeholder="请输入客户电话"></el-input>
        </el-form-item>
        <el-form-item label="地 址">
          <el-input v-model="editForm.address" type="textarea" :rows="2" placeholder="请输入客户地址"></el-input>
        </el-form-item>
        <el-form-item label="邮 编">
          <el-input v-model="editForm.zipcode" placeholder="请输入客户邮编"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱">
          <el-input v-model="editForm.email" readonly></el-input>
        </el-form-item>
        <el-form-item label="应收额度">
          <el-input v-model="editForm.lineOfCredit" placeholder="请输入应收额度（元）"></el-input>
        </el-form-item>
        <el-form-item label="应收">
          <el-input v-model="editForm.receivable" placeholder="请输入应收（元）"></el-input>
        </el-form-item>
        <el-form-item label="应付">
          <el-input v-model="editForm.payable" placeholder="请输入应收（元）"></el-input>
        </el-form-item>
        <el-form-item label="操作员">
          <el-input v-model="editForm.operator" placeholder="请输入操作员"></el-input>
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
import { getAllCustomer } from "../../network/purchase";
import { 
  addCustomer,
  deleteCustomer,
  updateCustomer} from "../../network/customer";


export default {
  name: 'CustomerView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      customerList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editForm:{},
      addForm:{
        address:"",
        email:"",
        id: 1,
        level:1,
        lineOfCredit: 10000,
        name:"未填",
        operator:"未填",
        payable: 10000,
        phone:"未填",
        receivable: 10000,
        type:"未填",
        zipcode:"未填",
      },
    }
  },
  async mounted() {
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      
      this.customerList = this.customerList.concat(_res.result)
    })

    // console.log(this.customerList);
  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    getAll() {
      this.customerList = [];
      getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
      getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      
      this.customerList = this.customerList.concat(_res.result)
    })
      },
    addCustomer() {
      // TODO: 新增客户
      // alert('TODO: 新增客户')
      this.addDialogVisible = true;
    },
    handleAdd(type) {
      // console.log(type);
        if (type === false) {
          this.addDialogVisible = false;
          this.addForm = {};
        } else if (type === true) {

        
          var name = this.addForm.name;
          var email = this.addForm.email;
          var ty = this.addForm.type;
          if(name == ""){
            alert("姓名不能为空！");
          }
          else if(email == "") alert("邮箱不能为空！");
          else if(ty=="") alert("类型不能为空！");
          else{
          addCustomer(this.addForm).then(_res => {
            // console.log(_res.code);
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
    editCustomer(id) {
      // TODO: 修改客户信息
      // alert(`TODO: 修改${id}客户信息`)
      this.editForm = this.customerList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    },
    handleEdit(type){
      if(type === false){
        this.editDialogVisble = false;
        this.editForm = {};
      }else if(type === true){
        updateCustomer(this.editForm).then(_res => {
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
    deleteCustomer(id){
      let config = {
          params: {
            id: id
          }
        };

      // console.log(id);
      this.$confirm('是否要删除该？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCustomer(config).then(_res => {
            if (_res.msg === 'Success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAll();
            }
              // this.getAll();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
      close() {
        this.addForm = {};
        this.editForm = {};
      }
  }
}
</script>

<style>

</style>