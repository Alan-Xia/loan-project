<template>
  <div class="subject">
    <div class="serach">
      <el-input v-model="query.name" placeholder="请输入用户名" clearable class="tab"  size="small" @input="getSubjectData"></el-input>
      <el-button type="primary" size="small" @click="getSubjectData">查询</el-button>
    </div>
    <div class="content">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="loan_name" label="姓名"></el-table-column>
        <el-table-column prop="loan_card" label="身份证号码"></el-table-column>
        <el-table-column prop="status" label="合同状态">
          <template slot-scope="{row}">
            <el-tag :type="row.file_path | statusStyle">{{row.file_path | dataStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" @click="createFile(row.id)" :disabled="row.file_path">生成合同</el-button>
            <el-button type="danger" size="small" @click="download(row.id)" :disabled="!row.file_path">下载合同</el-button>
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
  </div>
</template>

<script>
import {contractQuery,contractFile,contractDownload} from '@/plugins/api'
import {getToken} from '@/util/cookie'
import store from '@/store'
  export default {
    data() {
      return {
        query:{
          pageNo: 1,
          pageSize: 10,
          name: ''
        },
        rows: 1,
        pages:1,
        list: [],
        status: false
      }
    },
    created() {
      this.getSubjectData()
    },
    filters: {
      dataStatus (type) {
        return type ? '已生成合同' : '未生成合同'
      },
      statusStyle (type) {
        return type ? 'success' : 'danger'
      }
    },
    methods: {
      getSubjectData () {
        contractQuery(this.query).then(res =>{
          console.log(res)
          if (res.code == '20000') {
            this.list = res.data.data.data
            this.list.forEach(item => {
              item.status = false
            })
            this.rows = res.data.data.rows
            this.pages = res.data.data.pages
          }
          // console.log(this.list);
        })
      },
      handleSizeChange(val) {
        this.query.pageSize = val || this.query.pageSize
        this.getSubjectData()
      },
      handleCurrentChange(val) {
        this.query.pageNo = val
        this.getSubjectData()
      },
      createFile (id) {
        contractFile({id}).then(res => {
          if (res.code == '20000') {
            this.status = res.data.status
            if (this.status == true) {
              this.list.forEach(item => {
                if (item.id == id) {
                  item.status = this.status
                  console.log(item.status)
                  return 
                }
              })
            }
            this.$notify({
              title: 'success',
              message: '生成合同成功',
              type: 'success',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      download (id) {
        contractDownload({id:id}).then(res => {
          if (res.code == '20000') {
            this.$notify({
              title: 'success',
              message: '下载合同成功',
              type: 'success',
              duration: 2000
            })
            this.downUrl(store.getters.address + res.data.url)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      downUrl(url) {
        //下载需要权限才用这个方法体
        const xhr = new XMLHttpRequest()  // 定义http异步请求
        xhr.open('GET',url,true) // 发送地址
        xhr.withCredentials = true // 允许携带cookie
        xhr.responseType = 'blob' //响应类型  blob字节流
        xhr.setRequestHeader('token', getToken()) //传入token
        console.log(getToken())
        xhr.onload = () => {
          if (xhr.status === 200) {
            // 获取图片blob数据并保存   responseURL
            let fileName = xhr.responseURL.substring(xhr.responseURL.lastIndexOf('/') + 1)
            console.log(fileName,xhr.response)
            this.saveAs(fileName, xhr.response)
          }
        }
        xhr.send()
      },
      saveAs (name, data) {
        //代表二进制类型的大对象,就是Blob对象是二进制数据
        var blob = new Blob([data])
        //创建a标签
        var eleLink = document.createElement('a')
        //window对象的URL对象是专门用来将blob或者file读取成一个url的,通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
        eleLink.href = window.URL.createObjectURL(blob)
        eleLink.download = name
        eleLink.click()
      }
    }
  }
</script>

<style lang="scss" scoped>
.subject{
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