<template>
  <Layout>
    <Title title="账户管理"></Title>
    <div> 
      <el-button style="" type="primary" size="medium" @click="addAccount">新增员工</el-button> 
      <el-input style="width: 50%; margin-left: 300px; margin-right: 20px;" v-model="inquiryId" placeholder="请输入账号名称"></el-input>
      <el-button type="primary" @click="getAccount()">立即查询</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table ref="table"
        :data="accountList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="name"
          label="账户名称">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="余额">
        </el-table-column>
        <el-table-column
          label="操作">
            <template slot-scope="scope">
            <el-button
              @click="deleteAccount(scope.row.name)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    

    <el-dialog
      title="新增账户信息"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="close()">

      <el-form :model="addForm" :label-width="'100px'" size="mini">
        <el-form-item label="账 户 名 称 ">
          <el-input v-model="addForm.name" placeholder="请输入账户名称"></el-input>
        </el-form-item>
        <el-form-item label="初 始 金 额 ">
          <el-input v-model="addForm.amount" placeholder="请输入初始金额"></el-input>
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
  import {
    addAccount,
    deleteAccount,
    showAccount,
    getAccount } from "../../network/account";
  export default {
    name: 'AccountManagement',
    components: {
        Layout,
        Title
    },
    data(){
      return{
        accountList : [],
        addDialogVisible: false,
        inquiryId : "",
        addForm: {
          name: "",
          amount: 0,
        }
      }
    },
    mounted(){
      showAccount().then(_res=>{
        this.accountList = _res.result;
        console.log(this.accountList);
      })
    },
    methods:{
      getAll(){
        this.accountList  = [];
        showAccount().then(_res=>{
          this.accountList = _res.result;
        })
      },
      //点击新增账户，弹出浮窗
      addAccount(){
        this.addDialogVisible = true;
      },
      getAccount(){
        var id = this.inquiryId.toString();
        console.log(id);
        if(id === ""){
          this.$message.error("查询名称不可为空！")
        }else{
          this.accountList = [];
          getAccount({ params : { key: id } }).then(_res=>{
            console.log(_res);
            this.accountList = _res.result;
          })
        }
        this.inquiryId = "";
      },
      //增加账户信息
      handleAdd(choice){
        if(choice === true){
          var name = this.addForm.name;
          var amount = this.addForm.amount;
          if(name == "") alert("姓名不能为空！");
          else if(amount < 0) alert("初始金额不能为负！");
          else{
            console.log(this.addForm)
            addAccount(this.addForm).then(_res=>{
              console.log(_res)
              if(_res.code === "114514"){
                this.$message({
                type: 'error',
                message: _res.msg
              });
              }else{
                this.$message({
                type: 'success',
                message: _res.msg
              });
              this.addForm = {};
              this.addDialogVisible = false;
              this.getAll();
              }
              
            })
          }
        }else{
          this.addDialogVisible = false;
          this.addForm = {};
        }
      },
      deleteAccount(name){
        let config = {
          params: {
            name: name.toString()
          }
        };
        this.$confirm('是否要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAccount(config).then(_res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getAll();
     
              // this.getAll();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      close(){
        this.addForm = {};
      }
    }
  }
</script>

<style scoped>
</style>
