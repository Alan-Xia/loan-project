<template>
  <div class="loan">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <!--个人基本信息 -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>个人基本信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker type="datetime" v-model="form.birthday" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" class="filter-item" placeholder="Please select">
                <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="身份证" prop="identity_card">
              <el-input v-model.number="form.identity_card" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="婚姻状态" prop="marriage">
              <el-select v-model="form.marriage" class="filter-item" placeholder="Please select">
                <el-option v-for="item in marriageOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="教育程度" prop="education">
              <el-select v-model="form.education" class="filter-item" placeholder="Please select">
                <el-option v-for="item in educationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住地址" prop="address1">
              <el-input v-model="form.address1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="户籍地址" prop="address2">
              <el-input v-model="form.address2" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住电话" prop="phone">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="mobile_phone">
              <el-input v-model="form.mobile_phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!--职业信息 -->
      <el-card class="job-info">
        <div slot="header" class="clearfix">
          <span>职业信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="现职公司" prop="company">
              <el-input v-model="form.company" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属行业" prop="trade">
              <el-select v-model="form.trade" class="filter-item" placeholder="请选择">
              <el-option v-for="item in companyOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司地址" prop="address3">
              <el-input v-model="form.address3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="公司类型" prop="company_type">
              <el-input v-model="form.company_type" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司邮箱" prop="company_email">
              <el-input v-model="form.company_email" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司电话" prop="company_phone">
              <el-input v-model="form.company_phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 收支情况 -->
      <el-card class="job-info">
        <div slot="header" class="clearfix">
          <span>收支情况</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="收支情况" prop="income">
              <el-input v-model="form.income" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 家庭联系人 -->
      <el-card class="job-info">
        <div slot="header" class="clearfix">
          <span>家庭联系人</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="关系1" prop="contact">
              <el-input v-model="form.contact" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="contact_name">
              <el-input v-model="form.contact_name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机" prop="contact_phone">
              <el-input v-model="form.contact_phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 工作证明人 -->
      <el-card class="job-info">
        <div slot="header" class="clearfix">
          <span>工作证明人</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="关系2" prop="contact2">
              <el-input v-model="form.contact2" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="contact2_name">
              <el-input v-model="form.contact2_name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机" prop="contact2_phone">
              <el-input v-model="form.contact2_phone" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="部门" prop="contact2_dep">
              <el-input v-model="form.contact2_dep" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位" prop="contact2_pos">
              <el-input v-model="form.contact2_pos" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注信息" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      <el-button @click="resetForm('form')">重置</el-button>     
    </div>
  </div>
</template>

<script>
import {createLoan} from '@/plugins/api'
  const sexOptions = [
    { key: 'man', display_name: '男' },
    { key: 'woman', display_name: '女' }
  ]
  const educationOptions = [
    { key: 'college', display_name: '大学' },
    { key: 'highschool', display_name: '高中' }
  ]
  const marriageOptions = [
    { key: 'married', display_name: '已婚' },
    { key: 'unmarried', display_name: '未婚' }
  ]
  const companyOptions = [
  { key: 'education', display_name: '教育' },
  { key: 'finance', display_name: '金融' }
  ]
  export default {
    data() {
      let checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        setTimeout(() => {
          if (!Number(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value.length < 11 || value.length > 11) {
              callback(new Error('手机号码必须是11位'));
            } else {
              callback()
            }
          }
        }, 300)
      }
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        setTimeout(() => {
          if (!Number(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value.length < 7) {
              callback(new Error('电话号码必须大于7位'));
            } else {
              callback()
            }
          }
        }, 300)
      }
      return {
        form: {
          name:'',//姓名
          identity_card:'',//身份证
          birthday:'',//出生日期
          sex:'',//性别
          marriage:'',//婚姻状态
          education:'',//教育程度
          address1:'',//居住地址
          address2:'',//户籍地址
          phone:'',//居住电话
          mobile_phone:'',//手机号
          company:'',//现职公司全称
          trade:'',//所属行业
          position:'',//职位
          address3:'',//公司地址
          company_type:'',//公司类型
          company_email:'',//公司邮箱
          company_phone:'',//公司电话
          income:'',//收支情况
          contact:'',//关系1
          contact_name:'',//姓名
          contact_phone:'',//手机
          contact2:'',//关系2
          contact2_name:'',//姓名
          contact2_phone:'',//手机
          ontact2_dep:'',//部门
          contact2_pos:'',//职位
          remark:''//备注
        },
        rules: {
          name: [
          { required: true, message: '请输姓名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
          ],
          birthday: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          identity_card: [
            {type: 'number', required: true, message: '请输入身份证', trigger: 'change',min:6}
          ],
          marriage: [
            { required: true, message: '请选择婚姻状态', trigger: 'change' }
          ],
          education: [
            { required: true, message: '请选择教育程度', trigger: 'change' }
          ],          
          address1: [
            { required: true, message: '请输入居住地址', trigger: 'blur' }
          ],
          address2: [
            { required: true, message: '请输入户籍地址', trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          mobile_phone: [
            {validator: checkMobile, trigger: 'blur' }
          ],
          company: [
            { required: true, message: '请输入现职公司', trigger: 'blur' }
          ],
          trade: [
            { required: true, message: '请输入行业', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '请输入职位', trigger: 'blur' }
          ],
          address3: [
            { required: true, message: '请输入公司地址', trigger: 'blur' }
          ],
          company_type: [
            { required: true, message: '请输入公司类型', trigger: 'blur' }
          ],
          company_email: [
            { required: true, message: '请输入公司邮箱', trigger: 'blur' }
          ],
          company_phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          income: [
            { required: true, message: '请输入收入情况', trigger: 'blur' }
          ],
          contact:[
            { required: true, message: '请输入关系1', trigger: 'blur' }
          ],
          contact_name:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          contact_phone:[
            {validator: checkMobile,  trigger: 'blur' }
          ],
          contact2:[
            { required: true, message: '请输入关系2', trigger: 'blur' }
          ],
          contact2_name:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          contact2_phone:[
            {validator: checkMobile,  trigger: 'blur' }
          ],
          contact2_dep:[
            { required: true, message: '请输入部门', trigger: 'blur' }
          ],
          contact2_pos:[
            { required: true, message: '请输入职位', trigger: 'blur' }
          ]
        },
        sexOptions,
        marriageOptions,
        educationOptions,
        companyOptions
      }
    },
    methods: {
      //提交
    submitForm(formName){
       this.$refs[formName].validate((valid) => {
        if (valid) {
          createLoan(this.form).then(res => {
            this.$router.push("/apply/index")
            this.$notify({
              title: 'success',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          }).catch(error => {
            console.log(error)
          })
        } else {
            console.log('error submit!!');
            return false;
          }
      })
    },
      //重置
      resetForm(formName){
        this.$refs[formName].resetFields()
        this.form={}
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>