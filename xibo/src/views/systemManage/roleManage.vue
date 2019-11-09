<template>
  <div class="cardshadow roleListTable">
    <div>
      <el-button v-if="has(860001)" type="primary"
                 icon="el-icon-circle-plus-outline"
                 size="mini"
                 @click="addRole">{{$t(`btns.add`)}}</el-button>
    </div>
    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column property="rolename"
                       label="角色名">
      </el-table-column>
      <el-table-column width="550"
                       label="角色权限">

        <template slot-scope="scope">
          <div v-if="scope.row.rolename==='管理员'">最高权限</div>
          <template v-else>
            <div class="btnBox"
                 v-for="btn in scope.row.btnArr"
                 :key="btn.b_name">
              <div class="btnHeader">{{ $t(`btns.${btn.b_name}`)}}:</div>
              <div class="btnList">
                <template v-for="item in btn.children">
                  <el-button :key="item.b_id"
                             size="mini">
                    {{$t(`btns.${item.b_name}`)}}</el-button>
                </template>

              </div>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="toggleBtn(scope.row)"
                     :type="scope.row.status? 'primary' : 'danger'"
                     disable-transitions>{{scope.row.status?'启用':'禁用'}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <div>{{$moment(scope.row.createtime).format("YYYY-MM-DD HH:mm:ss")}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="has(860002)" size="mini"
                     :disabled="scope.row.rolename=='管理员'"
                     @click="handleEdit(scope.$index, scope.row)">{{$t('btns.edit')}}
          </el-button>
          <el-button v-if="has(860003)" size="mini"
                     type="danger"
                     :disabled="scope.row.rolename=='管理员'"
                     @click="handleDelete(scope.$index, scope.row)">{{$t('btns.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page"
                   background
                   layout="prev, pager, next"
                   :total="total"
                   @current-change="currentChange"
                   @prev-click="currentChange"
                   @next-click="currentChange">
    </el-pagination>
    <el-dialog class="dialog2"
               :top="'5vh'"
               :label-position="'left'"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <div class="dialog-permission">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"
                      maxlength="8"
                      show-word-limit
                      placeholder="请输入角色名称"
                      autocomplete="off"></el-input>
          </el-form-item>
          <div class="dialogTitle">角色权限</div>
          <template>
            <div class="roleBox"
                 v-for="btn in roleBtns"
                 :key="btn.b_name">
              <div class="role_btnHeader">{{ $t(`btns.${btn.b_name}`)}}:</div>
              <div class="role_btnList">
                <template v-for="item in btn.children">
                  <el-checkbox v-model="item.checked"
                               :key="item.b_id"> {{$t(`btns.${item.b_name}`)}}</el-checkbox>
                </template>

              </div>
            </div>
          </template>
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary"
                   @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog class="dialog2"
               :top="'5vh'"
               :label-position="'left'"
               :visible.sync="dialogFormVisible2">
      <el-form :model="currentRole">
        <div class="dialog-permission">
          <el-form-item label="角色名称">
            <el-input v-model="currentRole.rolename"
                      maxlength="8"
                      show-word-limit
                      placeholder="请输入角色名称"
                      autocomplete="off"></el-input>
          </el-form-item>
          <div class="dialogTitle">角色权限</div>
          <template>
            <div class="roleBox"
                 v-for="btn in currentRoleBtns"
                 :key="btn.b_name">
              <div class="role_btnHeader">{{ $t(`btns.${btn.b_name}`)}}:</div>
              <div class="role_btnList">
                <template v-for="item in btn.children">
                  <el-checkbox v-model="item.checked"
                               @change="editRolePermission"
                               :key="item.b_id"> {{$t(`btns.${item.b_name}`)}}</el-checkbox>
                </template>

              </div>
            </div>
          </template>
        </div>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary"
                   @click="editRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import roleBtns from "../../btnPermission";
import {has} from "../../utils";
import uniq from "uniq";
export default {
  name: "roleManage",
  data() {
    return {
      total: 0,
      currentPage: 1,
      roleBtns: JSON.parse(JSON.stringify(roleBtns)),
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
        status: 1,
        rightIds: []
      },
      currentRoleBtns: [],
      currentRole: {
        name: "",
        status: 1,
        rightIds: []
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
      roleSelectPermission: {},
      updating: false
    };
  },
  methods: {
    has,
    currentChange(page) {
      this.currentPage = page;
      this.getList({
        page: page,
        pageSize: 10
      });
    },
    editRolePermission() {
      this.$nextTick(() => {
        this.currentRoleBtns = JSON.parse(JSON.stringify(this.currentRoleBtns));
      });
    },
    handleEdit(index, row) {
      this.currentRoleBtns = JSON.parse(JSON.stringify(roleBtns));
      this.currentRole = { ...row };
      this.currentRole.status = row.status;
      var arr = row.rightIds;
      arr = arr.filter(item => {
        //按钮id都是8开头
        item = item + "";
        return item.indexOf("8") === 0;
      });
      this.currentRoleBtns.forEach(btnObj => {
        if (btnObj.children) {
          btnObj.children.forEach(btnObjItem => {
            if (arr.indexOf(btnObjItem.b_id) !== -1) {
              btnObjItem.checked = true;
            } else {
              btnObjItem.checked = false;
            }
          });
        }
      });

      this.dialogFormVisible2 = true;
    },
    addRole() {
      this.form = {
        name: "",
        status: 1
      };
      this.dialogFormVisible = true;
    },
    toggleBtn(row) {
      if (!this.updating) {
        this.updating = true;
      } else {
        return;
      }
      let form = new FormData();
      form.append("roleid", row.roleid);
      if (row.status) {
        form.append("status", 0);
      } else {
        form.append("status", 1);
      }
      this.$axios
        .post("/sysrole/updateStatus", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          this.updating = false;
          this.$message({
            showClose: true,
            message: res.data.respMsg,
            type: "success"
          });
          this.getList({
            page: this.currentPage,
            pageSize: 10
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    editRoleSubmit() {
      let that = this;
      if (!this.currentRole.rolename) {
        that.$message({
          showClose: true,
          message: "角色名称不能为空",
          type: "error"
        });
        return false;
      }

      let rightIds = [];

      this.currentRoleBtns.forEach(item => {
        if (item.children) {
          item.children.forEach(btn => {
            if (btn.checked) {
              rightIds.push(btn.b_id);
              rightIds = rightIds.concat(btn.router);
            }
          });
        }
      });
      rightIds = uniq(rightIds);
      let form = new FormData();
      form.append("rolename", this.currentRole.rolename);
      form.append("status", this.currentRole.status);
      form.append("rightIds", rightIds);
      form.append("roleid", this.currentRole.roleid);
      this.$axios
        .post("/sysrole/saveRole", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          that.$message({
            showClose: true,
            message: res.data.respMsg,
            type: "success"
          });
          this.dialogFormVisible2 = false;
          this.getList({
            page: this.currentPage,
            pageSize: 10
          });
        })
        .catch(err => {
          console.log(err);
        });
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

      let rightIds = [];

      this.roleBtns.forEach(item => {
        if (item.children) {
          item.children.forEach(btn => {
            if (btn.checked) {
              rightIds.push(btn.b_id);
              rightIds = rightIds.concat(btn.router);
            }
          });
        }
      });
      rightIds = uniq(rightIds);
      let form = new FormData();
      form.append("rolename", this.form.name);
      form.append("status", this.form.status);
      form.append("rightIds", rightIds);
      form.append("creator", this.$store.getters.info.uid);
      form.append("createtime", new Date());
      form.append("creatorname", this.$store.getters.info.name);

      this.$axios
        .post("/sysrole/saveRole", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          that.$message({
            showClose: true,
            message: res.data.respMsg,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.roleBtns = JSON.parse(JSON.stringify(roleBtns));
          this.getList({
            page: this.currentPage,
            pageSize: 10
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    roleEdit(index, row) {
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
      let that = this;
      let form = new FormData();
      form.append("roleid", row.roleid);
      this.$axios
        .post("/sysrole/deleteRole", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          that.$message({
            showClose: true,
            message: response.data.respMsg,
            type: "success"
          });
          this.getList({
            page: this.currentPage,
            pageSize: 10
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList(postdata) {
      let that = this;
      let form = new FormData();
      form.append("page", postdata.page);
      form.append("pageSize", postdata.pageSize);
      this.$axios
        .post("/sysrole/findRole", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(response) {
          that.tableData = response.data.result.resultList;
          that.total = response.data.result.total;
          that.tableData.forEach(item => {
            if (item.rightIds) {
              that.rolePermissions[item.roleid] =
                that.rolePermissions[item.roleid] || {};
              var arr = item.rightIds;
              arr = arr.filter(item => {
                //按钮id都是8开头
                item = item + "";
                return item.indexOf("8") === 0;
              });
              item.btnArr = [];
              that.roleBtns.forEach(btnObj => {
                if (btnObj.children) {
                  let obj = {};
                  obj.b_name = btnObj.b_name;
                  let tempArr = [];
                  btnObj.children.forEach(btnObjItem => {
                    if (arr.indexOf(btnObjItem.b_id) !== -1) {
                      tempArr.push(btnObjItem);
                    }
                  });
                  obj.children = tempArr;
                  if (obj.children.length > 0) {
                    item.btnArr.push(obj);
                  }
                }
              });
            }
            that.roleSelectPermission[item.roleid] = item.rightIds;
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
    this.getList({
      page: 1,
      pageSize: 10
    });
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
<style lang="scss">
.roleBox {
  margin-top: 10px;
  .role_btnHeader {
    margin-bottom: 10px;
    font-weight: bold;
  }
}

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

.dialog2 {
  .el-dialog__title {
    font-weight: bold;
  }
  .dialogTitle {
    font-size: 16px;
    font-weight: bold;
  }

  .el-form-item__content {
    width: 500px;
    margin-left: 80px;
  }
  .el-form-item__label {
    font-weight: bold;
    font-size: 16px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>

