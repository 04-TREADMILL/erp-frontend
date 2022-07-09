<template>
  <div class="card">
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>id: </strong>{{item.id}}</span>
            <el-button v-if="authorization() === 2" style="margin-left: 10px"
                       type="primary" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 2"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 2" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 3" effect="dark" type='danger'>审核未通过</el-tag>
            </span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="8"  >
            <span><strong>关联的账户名称: </strong>{{item.account}}</span>
          </el-col>
          <el-col :span="6" v-if = "check_type(item) === 3">
            <span><strong>员工id </strong>{{item.employeeId}}</span>
          </el-col>
         <el-col :span="10" v-if = "check_type(item) < 3">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="6" v-if = "check_type(item) === 2">
            <span><strong>供应商: </strong>{{item.supplier}}</span>
          </el-col>
          <el-col :span="6" v-if = "check_type(item) === 1">
            <span><strong>销售商: </strong>{{item.seller}}</span>
          </el-col>
          <el-col :span="6" v-if = "check_type(item) < 3">
            <span><strong>总金额:  </strong>{{item.totalAmount}}</span>
          </el-col>
          <el-col :span="6" v-if = "check_type(item) === 3">
            <span><strong>应发工资:  </strong>{{item.originalSalary}}</span>
          </el-col>
          <el-col :span="6" v-if = "check_type(item) === 3">
            <span><strong>实发工资:  </strong>{{item.realSalary}}</span>
          </el-col>
          <el-col :span="6" v-if = "check_type(item) === 3">
            <span><strong>扣除税款:  </strong>{{item.tax}}</span>
          </el-col>
          <el-col :span="16" v-if = "true">
            <span><strong>创建时间:  </strong>{{item.createTime}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="24" v-if = "check_type(item)===1 || check_type(item)===2">
            <span><strong>备注: </strong>{{item.comment}}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { approveReceipt } from '../../../network/receipt'
export default {
  name: "ReceiptList",
  props: {
    list: Array,
    type: Number,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    authorization() {
      if (this.type === 1 && sessionStorage.getItem('role') === 'GM') {
        return 2
      }
    },
    approval(id) {
      let config = {
        params: {
          receiptSheetId : id,
          state: 'SUCCESS'
        }
      }
      approveReceipt(config).then(res => {
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    },
    deny(id) {
      let config = {
        params: {
          receiptSheetId : id,
          state: 'FAILURE'
        }
      }
      approveReceipt(config).then(res => {
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    },
    check_type(item){
      console.log(item)
      if(item.id.substr(0,3)==="SKD"){
        return 1
      }
      else if(item.id.substr(0,3)==="FKD"){
        return 2
      }
      else if(item.id.substr(0,3)==="GZD"){
        return 3
      }
    }
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