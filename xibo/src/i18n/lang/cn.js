/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  routeNmae: {
    home: '主页',
    slideManage: '玻片管理',
    pathological: '病理玻片',
    inspection: '检验玻片',
    consultation: '会诊',
    myConsultation: '我的会诊',
    consultationList: '全部会诊',
    pathologicalConsutation:'病理会诊',
    inspectionConsultation:'检验会诊',
    statistics: '统计',
    uploadDaily: '上传日报',
    consultationDaily: '会诊日报',
    markDaily:'标注日报',
    slideStatistics: '玻片统计',
    userManage: '用户管理',
    addUser: '添加账号',
    editUser: '修改资料',
    userList: '用户列表',
    editPassword: '修改密码',
    systemSettings: '系统设置',
    navMenu: '导航菜单',
    systemManage: '管理',
    roleManage: '角色管理',
    systemSetting: '系统配置项'
  },
  btns:{
    upload:'上传数字切片',
    download:'下载数字切片',
    read:'阅览数字切片',
    delete:'删除数字切片',
    mark:'标注数字切片',
    edit:'编辑数字切片',
    uploadDaily:'上传日报',
    consultationDaily:'会诊日报',
    markDaily:'标注日报',
    statistics:'玻片统计',
    initiating :'发起会诊',
    submit:'提交会诊',
    cancel:'取消会诊',
    userManage: '用户管理',
    roleManage: '角色管理',
    pathological: '病理玻片',
    inspection: '检验玻片',
    pathologicalConsutation:'病理会诊',
    inspectionConsultation:'检验会诊',
    systemManage: '用户管理',
    statistics: '数据统计',
  },
  rightMenu: {
    close: '关闭',
    closeOther: '关闭其他',
    closeAll: '全部关闭'
  },
  role: {
    superAdmin: '超级管理员',
    admin: '管理员',
    ordinary: '普通用户'
  },
  userDropdownMenu: {
    basicInfor: '基本资料',
    changePassword: '修改密码',
    logout: '退出'
  },

  ...zhLocale //  合并element-ui内置翻译
}

export default cn
