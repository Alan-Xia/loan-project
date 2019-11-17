import request from '@/util/request'

// 登陆
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// 退出
export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

//新增贷款
export function createLoan (data) {
  return request({
    url: '/loan/create',
    method: 'post',
    data
  })
}

// 申请管理 -查询
export function loanList (data) {
  return request({
    url: '/loan/list',
    method: 'get',
    params: data
  })
}

// 申请管理 -编辑
export function loanUpdate (data) {
  return request({
    url: '/loan/update',
    method: 'put',
    data
  })
}

// 申请管理 -删除
export function loanDelete (id) {
  return request({
    url: `/loan/delete/${id}`,
    method: 'delete'
  })
}

// 申请管理 -提交审核
export function loanSubmit(data) {
  return request({
    url: '/loan/submitToApprove',
    method: 'post',
    data
  })
}

// 贷款审批 -初审-查询
export function careQuery(data) {
  return request({
    url: '/approve/first/list',
    method: 'get',
    params: data
  })
}

// 贷款审批 -初审-查看详情
export function queryLoanInfo(id) {
  return request({
    url: `/loan/query?id=${id}`,
    method: 'get'
  })
}

// 贷款审批 -初审-通过
export function firstPass(data) {
  return request({
    url: '/approve/first/pass',
    method: 'post',
    data
  })
}

// 贷款审批 -初审-拒绝
export function firstReject(data) {
  return request({
    url: '/approve/first/reject',
    method: 'post',
    data
  })
}

// 贷款审批 -终审-查询
export function endQuery(data) {
  return request({
    url: '/approve/end/list',
    method: 'get',
    params: data
  })
}

// 贷款审批 -终审-通过
export function endPass(data) {
  return request({
    url: 'approve/end/pass',
    method: 'post',
    data
  })
}

// 贷款审批 -终审-拒绝
export function endReject(data) {
  return request({
    url: 'approve/end/reject',
    method: 'post',
    data
  })
}

// 标的管理 -查询
export function contractQuery(data) {
  return request({
    url: '/contract/list',
    method: 'get',
    params: data
  })
}

// 标的管理 -生成合同
export function contractFile(data) {
  return request({
    url: '/contract/createFile',
    method: 'post',
    data: data
  })
}

// 标的管理 -下载合同
export function contractDownload(id) {
  return request({
    url: `/contract/download?id=${id}`,
    method: 'get'
  })
}

// 权限管理 -创建管理员
export function createUser(data) {
  return request({
    url: '/permission/createUser',
    method: 'post',
    data
  })
}

// 权限管理 -列表展示
export function userList() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}
