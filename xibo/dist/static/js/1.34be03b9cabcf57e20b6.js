webpackJsonp([1],{"Y+rR":function(e,t){},lLVo:function(e,t){},qsWe:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"roleManage",data:function(){return{tableData:[],dialogFormVisible:!1,dialogFormVisible2:!1,form:{name:"",describe:"",status:!0,permission:[]},formLabelWidth:"120px",defaultProps:{children:"children",label:"r_name",id:"r_id"},selectRoleId:"",selectData:[],filterText:""}},methods:{handleEdit:function(e,t){for(var s in t)this.form[s]=t[s];this.form.status="启用"===t.status,this.dialogFormVisible=!0},addRole:function(){this.form={name:"",describe:"",status:!0},this.dialogFormVisible=!0},addRoleSubmit:function(){var e=this,t=this;if(!this.form.name)return t.$message({showClose:!0,message:"角色名称不能为空",type:"error"}),!1;this.$axios.post("/permissions/addRole",this.form).then(function(s){t.$message({showClose:!0,message:s.data.message,type:"success"}),e.dialogFormVisible=!1,e.getList()}).catch(function(e){console.log(e)})},rolePermissionSubmit:function(){var e=this,t=this,s={selectPermission:t.$refs.permission.getCheckedKeys(),rid:t.selectRoleId};this.$axios.post("/permissions/rolePermissions",s).then(function(s){t.$message({showClose:!0,message:s.data.message,type:"success"}),e.dialogFormVisible=!1,e.getList()}).catch(function(e){console.log(e)})},roleEdit:function(e,t){console.log(e,t),this.selectRoleId=t.id,this.selectData=t.permission?t.permission.split(","):[],this.dialogFormVisible2=!0},setRoleData:function(){this.$refs.permission.setCheckedKeys([]),this.$refs.permission.setCheckedKeys(this.selectData)},handleDelete:function(e,t){console.log(e,t);var s=this;this.$axios.post("/permissions/delRole",{id:t.id}).then(function(e){console.log(e),s.$message({showClose:!0,message:e.data.message,type:"success"}),s.getList()}).catch(function(e){console.log(e)})},getList:function(){var e=this;this.$axios.post("/permissions/getRoleList").then(function(t){console.log(t);for(var s=0;s<t.data.rows.length;s++)t.data.rows[s].status?t.data.rows[s].status="启用":t.data.rows[s].status="禁用";e.tableData=t.data.rows}).catch(function(e){console.log(e)})},filterNode:function(e,t){return!e||-1!==t.r_name.indexOf(e)}},watch:{filterText:function(e){this.$refs.permission.filter(e)}},computed:{roleTree:function(){for(var e=this.$store.getters.addRouters,t=0;t<e.length;t++)"/404"===e[t].redirect&&e.splice(t,1);return e}},mounted:function(){this.getList()}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"cardshadow roleListTable"},[s("div",[s("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline",size:"mini"},on:{click:e.addRole}},[e._v("新增")])],1),e._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[s("el-table-column",{attrs:{type:"index"}}),e._v(" "),s("el-table-column",{attrs:{property:"name",label:"角色名"}}),e._v(" "),s("el-table-column",{attrs:{property:"describe",label:"角色描述"}}),e._v(" "),s("el-table-column",{attrs:{prop:"status",label:"状态","filter-placement":"bottom-end"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-tag",{attrs:{type:"启用"===t.row.status?"primary":"danger","disable-transitions":""}},[e._v(e._s(t.row.status)+"\n        ")])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",disabled:"超级管理员"==t.row.name},on:{click:function(s){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑\n        ")]),e._v(" "),s("el-button",{attrs:{size:"mini",disabled:"超级管理员"==t.row.name},on:{click:function(s){return e.roleEdit(t.$index,t.row)}}},[e._v("权限分配\n        ")]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"danger",disabled:"超级管理员"==t.row.name},on:{click:function(s){return e.handleDelete(t.$index,t.row)}}},[e._v("删除\n        ")])]}}])})],1),e._v(" "),s("el-dialog",{staticClass:"dialog1",attrs:{title:"角色信息",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[s("el-form",{attrs:{model:e.form}},[s("el-form-item",{attrs:{label:"角色名称","label-width":e.formLabelWidth}},[s("el-input",{attrs:{maxlength:"8","show-word-limit":"",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"角色描述","label-width":e.formLabelWidth}},[s("el-input",{attrs:{maxlength:"15","show-word-limit":"",autocomplete:"off"},model:{value:e.form.describe,callback:function(t){e.$set(e.form,"describe",t)},expression:"form.describe"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"是否开启","label-width":e.formLabelWidth}},[s("el-switch",{model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.addRoleSubmit}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{staticClass:"dialog2",attrs:{title:"权限分配",visible:e.dialogFormVisible2},on:{opened:e.setRoleData,"update:visible":function(t){e.dialogFormVisible2=t}}},[s("el-input",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"输入关键字进行过滤"},model:{value:e.filterText,callback:function(t){e.filterText=t},expression:"filterText"}}),e._v(" "),s("el-tree",{ref:"permission",attrs:{data:e.roleTree,"node-key":"r_id","show-checkbox":"","filter-node-method":e.filterNode,props:e.defaultProps}}),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.rolePermissionSubmit}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var l=s("VU/8")(o,i,!1,function(e){s("lLVo"),s("Y+rR")},"data-v-4ec0db81",null);t.default=l.exports}});
//# sourceMappingURL=1.34be03b9cabcf57e20b6.js.map