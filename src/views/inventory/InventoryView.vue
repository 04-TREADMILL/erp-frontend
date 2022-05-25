<template>
  <Layout>
    <Title title="库存查看"></Title>
    <!-- (设定一个时间段，查看此时间段内的出/入库数量/金额，销售/进货的数量/金额。库存数量要有合计，这一点统一于普适需求。） -->
    <div>
      <span><strong>请选择一个时间段: </strong></span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getData()">
      </el-date-picker>
      <div v-if="date !== ''" class="mt15">
        <h4>{{beginDate}}&nbsp;至&nbsp;{{endDate}}内的</h4>
        <div class="mt15">
          <span><strong>入库数量合计为: </strong></span>
          <span>{{inputQuantity}}</span>
        </div>
        <div class="mt15">
          <span><strong>出库数量合计为: </strong></span>
          <span>{{outputQuantity}}</span>
        </div>
        <div class="mt15">
          <span><strong>出/入库商品信息</strong></span>
          <el-table
            :data="sheetContent"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            class="mt15">
            <el-table-column
              prop="type"
              label="类型"
              width="100"
              :filters="[{ text: '入库', value: 'warehouse_input' }, { text: '出库', value: 'warehouse_output' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type === 'warehouse_input' ? 'primary' : 'success'"
                  disable-transitions>{{transform(scope.row.type)}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="sheetId"
              label="id"
              width="200">
            </el-table-column>
            <el-table-column
              prop="productName"
              label="产品名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="categoryName"
              label="产品所属分类"
              width="200">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="数量"
              width="150">
            </el-table-column>
            <el-table-column
              prop="unitPrice"
              label="单价(元)"
              width="150">
            </el-table-column>
            <el-table-column
              prop="total_price"
              label="总价(元)"
              width="150">
            </el-table-column>
            <el-table-column
              label="时间">
              <template slot-scope="scope">
                {{formatDate(scope.row.createTime)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { formatDate } from "@/common/utils";
import { getWarehouseIODetailByTime,
         getWarehouseIPQByTime,
         getWarehouseOPQByTime } from "@/network/warehouse";
export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      date: '',
      inputQuantity: 0,
      outputQuantity: 0,
      sheetContent: []
    }
  },
  computed: {
    beginDate: function(){
      return this.date === '' ? '' : formatDate(this.date[0])
    },
    endDate: function() {
      return this.date === '' ? '' : formatDate(this.date[1])
    }
  },
  methods: {
    getData() {
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }
      getWarehouseIPQByTime(config).then(_res => {
        this.inputQuantity = _res.result
      })
      getWarehouseOPQByTime(config).then(_res => {
        this.outputQuantity = _res.result
      })
      getWarehouseIODetailByTime(config).then(_res => {
        this.sheetContent = _res.result
        if (this.sheetContent.length === 0) {
          this.$message.error('该时间段内无出入库记录!')
        } else {
          this.$message.success('查询成功!')
        }
      })
    },
    filterTag(value, row) {
      return row.type === value;
    },
    transform(type) {
      return type === 'warehouse_input' ? '入库' : '出库'
    },
    formatDate
  }
};
</script>

<style scoped lang="scss">
.mt15 {
  margin-top: 15px;
}
</style>
