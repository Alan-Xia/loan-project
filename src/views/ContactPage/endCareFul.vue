<template>
  <div class="careful">
    <div class="serach">
      <el-input v-model="query.name" placeholder="请输入用户名" clearable class="tab"  size="small" @input="getFristCareData"></el-input>
      <el-button type="primary" size="small" @click="getFristCareData">查询</el-button>
    </div>
    <div class="content">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="loan_name" label="姓名"></el-table-column>
        <el-table-column prop="loan_card" label="身份证号码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" :disabled="row.result == 'pass'" @click="queryLoan(row.loan_id)">查看</el-button>
            <el-button type="success" size="small" :disabled="row.result == 'pass'" @click="passInfo(row.id,row.loan_id)">通过</el-button>
            <el-button type="danger" size="small"  :disabled="row.result == 'pass'" @click="rejectInfo(row.id,row.loan_id)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="demonstration">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rows">
      </el-pagination>
    </div>
    <div class="dialog">
      <el-dialog title="贷款审批-查看详情" :visible.sync="dialogInfoVisible" width="400px">
        <el-form :model="form">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" :disabled="showEdit"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" :disabled="showEdit"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth">
            <el-input v-model="form.modified" :disabled="showEdit"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别" :disabled="showEdit">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="教育程度" :label-width="formLabelWidth">
            <el-select v-model="form.education" placeholder="请选择教育程度"  :disabled="showEdit">
              <el-option v-for="item in educationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="居住地址" :label-width="formLabelWidth">
            <el-input v-model="form.address1" :disabled="showEdit"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.mobile_phone" :disabled="showEdit"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="form.identity_card" :disabled="showEdit"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogInfoVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {endQuery,queryLoanInfo,endPass,endReject} from '@/plugins/api'
const sexOptions = [
  { key: 'man', display_name: '男' },
  { key: 'woman', display_name: '女' }
]
const educationOptions = [
  { key: 'college', display_name: '大学' },
  { key: 'highschool', display_name: '高中' }
]
export default {
    data() {
      return {
        query:{
          pageNo: 1,
          pageSize: 10,
          name: ''
        },
        list: [],
        form: {},
        dialogInfoVisible: false,
        formLabelWidth: '100px',
        showEdit: true,
        rows: 1,
        pages:1,
        sexOptions,
        educationOptions
      }
    },
    created() {
      this.getFristCareData()
    },
    filters: {
      gender (type) {
        return type == 'woman' ? '女' : '男'
      }
    },
    methods: {
      getFristCareData () {
        endQuery(this.query).then(res =>{
          console.log(res)
          if (res.code == '20000') {
            this.list = res.data.data.data
            this.rows = res.data.data.rows
            this.pages = res.data.data.pages
          }
        })
      },
      queryLoan (id) {
        queryLoanInfo(id).then(res => {
          console.log(res);
          if (res.code == '20000') {
            this.form = res.data.data
            this.dialogInfoVisible = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      passInfo (id,loan_id) {
        endPass({appId:id,loanId:loan_id}).then(res => {
          if (res.code = '20000') {
            this.getFristCareData()
            this.$notify({
              title: 'success',
              message: '通过成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      rejectInfo (id,loan_id) {
        endReject({appId:id,loanId:loan_id}).then(res => {
          if (res.code = '20000') {
            this.getFristCareData()
            this.$notify({
              title: 'success',
              message: '拒绝成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleSizeChange(val) {
        this.query.pageSize = val || this.query.pageSize
        this.getFristCareData()
      },
      handleCurrentChange(val) {
        this.query.pageNo = val
        this.getFristCareData()
      }
    }
  }
</script>

<style lang="scss" scoped>
.careful{
  width: 100%;
  padding: 30px 18px;
  .serach{
    .tab{
      width: 200px;
    }
  }
  .content{
    margin: 30px 0;
  }
  .demonstration{
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>