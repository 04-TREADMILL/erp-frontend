<template>
  <Layout>
    <Title title="进货退货管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定进货退货单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="pendingLevel1List" :type="1" @refresh="getPurchaseReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="pendingLevel2List" :type="2" @refresh="getPurchaseReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="创建进货退货单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="purchaseReturnForm" label-width="100px" ref="purchaseReturnForm">
          <el-form-item label="进货单id: " prop="purchaseSheetId">
            <el-select v-model="purchaseReturnForm.purchaseSheetId"
                       placeholder="请选择关联的进货单id"
                       @change="selectPurchase(completedPurchase.filter(item => item.id === purchaseReturnForm.purchaseSheetId))">
              <el-option
                v-for="(item, index) in completedPurchase"
                :key="item.id"
                :label="item.id"
                :value="item.id">
                <el-popover
                  placement="right"
                  width="800"
                  trigger="hover">
                  <el-table :data="completedPurchase[index].purchaseSheetContent">
                    <el-table-column width="100" property="id" label="id"></el-table-column>
                    <el-table-column width="200" property="pid" label="pid"></el-table-column>
                    <el-table-column width="100" property="unitPrice" label="单价"></el-table-column>
                    <el-table-column width="100" property="quantity" label="数量"></el-table-column>
                    <el-table-column width="100" property="totalPrice" label="总价"></el-table-column>
                    <el-table-column property="remark" label="备注"></el-table-column>
                  </el-table>
                  <span slot="reference">{{ item.id }}</span>
                </el-popover>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进货单清单: " v-if="this.purchaseReturnForm.purchaseReturnsSheetContent.length === 0">
            暂无数据!
          </el-form-item>
          <el-form-item label="进货单清单: " v-else>
            <div
              v-for="(item, index) in purchaseReturnForm.purchaseReturnsSheetContent"
              :key="index">
              <el-row>
                <el-col :span="8">
                  <span>id: {{item.pid}}</span>
                </el-col>
                <el-col :span="8">
                  数量: <el-input v-model="item.quantity" size="mini" style="width: 120px"></el-input>
                </el-col>
                <el-col :span="8">
                  单价: <el-input v-model="item.unitPrice" size="mini" style="width: 120px"></el-input>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="purchaseReturnForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('purchaseReturnForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import purchaseReturnList from "./components/PurchaseReturnList"
import { getAllPurchaseReturn,
         getAllPurchase,
         createPurchaseReturn } from '../../network/purchase'
export default {
  name: 'PurchaseReturnView',
  components: {
    Layout,
    Title,
    purchaseReturnList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      purchaseReturnList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      purchaseReturnForm: {
        purchaseReturnsSheetContent: []
      },
      completedPurchase: []
    }
  },
  async mounted() {
    this.getPurchaseReturn()
    await getAllPurchase({ params: { state: 'SUCCESS' } }).then(_res => {
      this.completedPurchase = _res.result
    })
    // console.log(this.completedPurchase);
  },
  methods: {
    getPurchaseReturn() {
      getAllPurchaseReturn({}).then(_res => {
        this.purchaseReturnList = _res.result
        this.pendingLevel1List = this.purchaseReturnList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.purchaseReturnList.filter(item => item.state === '待二级审批')
        this.successList = this.purchaseReturnList.filter(item => item.state === '审批完成')
        this.failureList = this.purchaseReturnList.filter(item => item.state === '审批失败')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.purchaseReturnForm = {}
          this.purchaseReturnForm.purchaseReturnsSheetContent = []
          done();
        })
        .catch(_ => {});
    },
    selectPurchase(content) {
      this.purchaseReturnForm.purchaseReturnsSheetContent = content[0].purchaseSheetContent
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.purchaseReturnForm.id = null
          this.purchaseReturnForm.operator = sessionStorage.getItem("name")
          this.purchaseReturnForm.totalAmount = null
          this.purchaseReturnForm.state = null
          this.purchaseReturnForm.createTime = null
          this.purchaseReturnForm.purchaseReturnsSheetContent.forEach(item => {
            item.unitPrice = Number(item.unitPrice)
            item.quantity = Number(item.quantity)
            item.totalPrice = item.unitPrice * item.quantity
          })
          createPurchaseReturn(this.purchaseReturnForm).then(_res => {
            if (_res.msg == 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.purchaseReturnForm = {}
              this.purchaseReturnForm.purchaseReturnsSheetContent = []
              this.getPurchaseReturn()
            }
          })
        }
      })
    }
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