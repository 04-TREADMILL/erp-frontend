<template>
  <Layout>
    <Title title="商品分类管理"></Title>
    <div class="classification-body">
      <el-tree
        :data="classificationList"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="edit(data)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="append(data.id)"
              v-if="data.parentId !== 0">
              +
            </el-button>
            <el-button
              type="text"
              size="mini"
              v-if="node.isLeaf"
              @click="remove(data)">
              -
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 新增商品分类 -->
    <el-dialog
      title="新增商品分类"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="addForm">
        <el-form-item label="编 号" :label-width="'60px'">
          <el-input v-model="addForm.parentId" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名 称" :label-width="'60px'">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAdd(false)">取 消</el-button>
        <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改商品分类信息 -->
    <el-dialog
      title="修改商品分类信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="editForm">
        <el-form-item label="编 号" :label-width="'60px'">
          <el-input v-model="editForm.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名 称" :label-width="'60px'">
          <el-input v-model="editForm.name"></el-input>
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
  import { getAllCommodityClassification,
           createCommodityClassification,
           deleteCommodityClassification,
           updateCommodityClassification } from "../../network/commodity";
  export default {
    components: {
      Layout,
      Title
    },
    data() {
      return {
        classificationList: [],
        addDialogVisible: false,
        addForm: {
          parentId: 0,
          name: ''
        },
        editDialogVisible: false,
        editForm: {
          id: 0,
          name: ''
        }
      }
    },
    mounted() {
      this.getAll();
    },
    methods: {
      // 获取所有商品分类
      getAll() {
        getAllCommodityClassification({}).then(_res => {
          this.classificationList = _res.result;
          this.classificationList = JSON.parse(JSON.stringify(this.arrayToTree(this.classificationList, 0)));
          console.log(this.classificationList);
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '获取商品分类列表失败!'
          });
        })
      },
      // 将数组转为tree
      arrayToTree(list, rootValue) {
        var arr = []
        list && list.forEach(item => {
          if (item.parentId === rootValue) {
            arr.push(item);
            const child = this.arrayToTree(list, item.id);
            if (child.length) {
              item.children = child;
            }
          }
        })
        return arr;
      },
      // 添加商品分类
      append(id) {
        this.addForm.parentId = id;
        this.addDialogVisible = true;
      },
      // 处理添加商品分类
      handleAdd(type) {
        if (type === false) {
          this.addDialogVisible = false;
          this.addForm.name = "";
        } else if (type === true) {
          let config = {
            params: {
              parentId: this.addForm.parentId,
              name: this.addForm.name
            }
          };
          createCommodityClassification(config).then(_res => {
            if (_res.code === "A0001") {
              this.$message({
                type: 'error',
                message: '当前父分类下存在商品 无法添加分类!'
              });
            } else {
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
            }
            this.addForm = {};
            this.addDialogVisible = false;
            this.getAll();
          })
        }
      },
      // 删除一个商品分类
      remove(data) {
        let config = {
          params: {
            id: data.id
          }
        }
        this.$confirm('是否删除该商品分类？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCommodityClassification(config).then(_res => {
            console.log(_res);
            if (_res.code === 'A0006') {
              this.$message({
                type: 'error',
                message: _res.msg
              });
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAll();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 编辑商品分类
      edit(data) {
        this.editForm.id = data.id;
        this.editForm.name = data.name;
        this.editDialogVisible = true;
      },
      // 处理编辑商品分类
      handleEdit(type) {
        if (type === false) {
          this.editForm = {};
          this.editDialogVisible = false;
        } else if (type === true) {
          let config = {
            params: {
              id: this.editForm.id,
              name: this.editForm.name
            }
          };
          updateCommodityClassification(config).then(_res => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.editForm = {};
            this.editDialogVisible = false;
            this.getAll();
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '修改失败!' + err
            });
          });
        }
      },
      close() {
        this.addForm = {};
        this.editForm = {};
      }
    }
  };
</script>

<style>
.classification-body {
  width: 80%;
  margin: 0 auto;
}
.el-tree {
  background-color: transparent;
}
.el-tree-node__content:hover {
  background-color: #eff7ff;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 8px;
}
</style>
