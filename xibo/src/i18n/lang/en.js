/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  routeNmae: {
    home: 'home',
    slideManage: 'slideManage',
    pathological: 'pathological',
    inspection: 'inspection',
    consultation: 'consultation',
    myConsultation: 'myConsultation',
    consultationList: 'consultationList',
    pathologicalConsutation:'pConsutation',
    inspectionConsultation:'iConsultation',
    statistics: 'statistics',
    uploadDaily: 'uploadDaily',
    consultationDaily: 'consultationDaily',
    markDaily:'markDaily',
    slideStatistics: 'slideStatistics',

    addUser: 'addUser',
    editUser: 'editUser',
    userList: 'userList',
    userManage: 'userManage',
    editPassword: 'editPassword',

    systemSettings: 'systemSettings',
    navMenu: 'navMenu',
    systemManage: 'systemManage',
    roleManage: 'roleManage',
    systemSetting: 'systemSetting',
    editpassword:'editpassword',
    edituserinfo:'edituserinfo'
  },

  btns:{
    upload:'upload',
    download:'download',
    read:'read',
    add:'add',
    delete:'delete',
    mark:'mark',
    edit:'edit',
    consultation:'consultation',
    export:'export excel',
    uploadDaily:'uploadDaily',
    consultationDaily:'consultationDaily',
    markDaily:'markDaily',
    statistics:'statistics',
    initiating :'initiating',
    submit:'submit',
    cancel:'cancel',
    downloadSlide:'downloadSlide',
    fillDiagnostic:'fillDiagnostic',
    view:'view',
    userManage: 'userManage',
    roleManage: 'roleManage',
    pathological: 'pathological',
    inspection: 'inspection',
    allConsutation:'allConsutation',
    myConsultation:'myConsultation',
    pathologicalConsutation:'pathologicalConsutation',
    inspectionConsultation:'inspectionConsultation',
    systemManage: 'systemManage',
    editpassword:'editpassword',
    edituserinfo:'edituserinfo'
  },
  rightMenu: {
    close: 'close',
    closeOther: 'closeOther',
    closeAll: 'closeAll'
  },
  role: {
    superAdmin: 'superAdmin',
    admin: 'admin',
    ordinary: 'ordinary'
  },
  userDropdownMenu: {
    basicInfor: 'basicInfor',
    changePassword: 'changePassword',
    logout: 'logout'
  },

  ...enLocale //  合并element-ui内置翻译
}

export default en
