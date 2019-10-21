<template>
  <div class="cardshadow roleListTable">
    <div>
      <el-button type="primary"
                 icon="el-icon-circle-plus-outline"
                 size="mini"
                 @click="addRole">新增</el-button>
    </div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column property="name"
                       label="角色名">
      </el-table-column>
      <el-table-column width="550"
                       label="角色权限">

        <template slot-scope="scope">
          <div v-if="scope.row.name==='超级管理员'">最高权限</div>
          <template v-else>
            <div class="btnBox"
                 v-for="btn in roleBtns"
                 :key="btn.b_name">
              <div class="btnHeader">{{ $t(`btns.${btn.b_name}`)}}:</div>
              <div class="btnList">
                <el-button :type="getBtnType(item,scope.row)"
                           @click="select(item,scope.row)"
                           v-for="item in btn.children"
                           :key="item.b_id"
                           size="mini">
                  {{$t(`btns.${item.b_name}`)}}</el-button>

              </div>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === '启用' ? 'primary' : 'danger'"
                  disable-transitions>{{scope.row.status}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">

        <template slot-scope="scope">
          <div>{{scope.row.createdAt}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     :disabled="scope.row.name=='超级管理员'"
                     @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="mini"
                     type="danger"
                     :disabled="scope.row.name=='超级管理员'"
                     @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色信息"
               class="dialog1"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    maxlength="8"
                    show-word-limit
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      :label-width="formLabelWidth">
          <el-input v-model="form.describe"
                    maxlength="15"
                    show-word-limit
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否开启"
                      :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary"
                   @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限分配"
               class="dialog2"
               @opened="setRoleData"
               :visible.sync="dialogFormVisible2">
      <el-input placeholder="输入关键字进行过滤"
                v-model="filterText"
                style="margin-bottom: 20px">
      </el-input>
      <el-tree :data="roleTree"
               node-key="r_id"
               show-checkbox
               ref="permission"
               :filter-node-method="filterNode"
               :props="defaultProps">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary"
                   @click="rolePermissionSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import roleBtns from "../../btnPermission";
export default {
  name: "roleManage",
  data() {
    return {
      roleBtns,
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        describe: "",
        status: true,
        permission: []
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "r_name",
        id: "r_id"
      },
      selectRoleId: "",
      selectData: [],
      filterText: "",
      rolePermissions: {},
      roleSelectPermission: {}
    };
  },
  methods: {
    getBtnType(btn, role) {
      if (
        this.roleSelectPermission[role.id] &&
        this.roleSelectPermission[role.id].indexOf(btn.b_id) !== -1
      ) {
        return "primary";
      }
      return "";
    },
    select(btn, role) {
      this.rolePermissions[role.id] = this.rolePermissions[role.id] || {};
      if (!this.rolePermissions[role.id][btn.b_id]) {
        this.rolePermissions[role.id][btn.b_id] = btn.router;
      } else {
        delete this.rolePermissions[role.id][btn.b_id];
      }
      this.roleSelectPermission[role.id] = [];

      for (let item in this.rolePermissions[role.id]) {
        this.roleSelectPermission[role.id].push(Number(item));
        this.rolePermissions[role.id][item].forEach(item => {
          if (this.roleSelectPermission[role.id].indexOf(item) === -1) {
            this.roleSelectPermission[role.id].push(item);
          }
        });
      }

      let rolePermissionData = {
        selectPermission: this.roleSelectPermission[role.id],
        rid: role.id
      };
      this.doPermissionSubmit(rolePermissionData);
    },
    handleEdit(index, row) {
      for (let item in row) {
        this.form[item] = row[item];
      }
      this.form.status = row.status === "启用" ? true : false;
      this.dialogFormVisible = true;
    },
    addRole() {
      this.form = {
        name: "",
        describe: "",
        status: true
      };
      this.dialogFormVisible = true;
    },
    addRoleSubmit() {
      let that = this;
      if (!this.form.name) {
        that.$message({
          showClose: true,
          message: "角色名称不能为空",
          type: "error"
        });
        return false;
      }
      this.$axios
        .post("/permissions/addRole", this.form)
        .then(res => {
          that.$message({
            showClose: true,
            message: res.data.message,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    rolePermissionSubmit() {
      let that = this;
      let rolePermissionData = {
        selectPermission: that.$refs.permission.getCheckedKeys(),
        rid: that.selectRoleId
      };
      this.$axios
        .post("/permissions/rolePermissions", rolePermissionData)
        .then(res => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    doPermissionSubmit(rolePermissionData) {
      this.$axios
        .post("/permissions/rolePermissions", rolePermissionData)
        .then(res => {
          this.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    roleEdit(index, row) {
      console.log(index, row);
      this.selectRoleId = row.id;
      this.selectData = row.permission ? row.permission.split(",") : [];
      this.selectData = this.selectData.filter(item => {
        return item.indexOf("1") === 0;
      });
      this.dialogFormVisible2 = true;
    },
    setRoleData() {
      this.$refs.permission.setCheckedKeys([]);
      this.$refs.permission.setCheckedKeys(this.selectData);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let that = this;
      this.$axios
        .post("/permissions/delRole", {
          id: row.id
        })
        .then(response => {
          console.log(response);
          that.$message({
            showClose: true,
            message: response.data.message,
            type: "success"
          });
          that.getList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      let that = this;
      this.$axios
        .post("/permissions/getRoleList")
        .then(function(response) {
          for (let i = 0; i < response.data.rows.length; i++) {
            if (response.data.rows[i].status) {
              response.data.rows[i].status = "启用";
            } else {
              response.data.rows[i].status = "禁用";
            }
          }
          that.tableData = response.data.rows;
          that.tableData.forEach(item => {
            if (item.permission) {
              that.rolePermissions[item.id] =
                that.rolePermissions[item.id] || {};
              var arr = item.permission.split(",");
              arr = arr.filter(item => {
                //按钮id都是8开头
                return item.indexOf("8") === 0;
              });

              arr.forEach(btnId => {
                that.roleBtns.forEach(btnObj => {
                  if (btnObj.children) {
                    btnObj.children.forEach(btnObjItem => {
                      if (btnObjItem.b_id + "" === btnId) {
                        that.rolePermissions[item.id][btnId] =
                          btnObjItem.router;
                      }
                    });
                  }
                });
              });
            }
            that.roleSelectPermission[item.id] = item.permission;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.r_name.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.permission.filter(val);
    }
  },
  computed: {
    roleTree: function() {
      let addRouters = this.$store.getters.addRouters;
      for (let i = 0; i < addRouters.length; i++) {
        if (addRouters[i].redirect === "/404") {
          addRouters.splice(i, 1);
        }
      }
      return addRouters;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.nameinput {
  width: 150px;
}

.phoneinput {
  width: 120px;
}

.datepicker {
  width: 260px;
}

.btnBox {
  display: flex;
}
.btnHeader {
  white-space: nowrap;
  margin-right: 10px;
  text-align: justify;
}
</style>
<style>
.btnList .el-button {
  margin-left: 0;
  margin-right: 10px;
  margin-bottom: 10px;
}
.dialog1 .el-dialog {
  width: 35%;
}

.dialog1 .el-dialog .el-form {
  width: 500px;
  margin: 0 auto;
}

.el-form-item__content {
  margin-left: 120px;
  width: 300px;
}
</style>

