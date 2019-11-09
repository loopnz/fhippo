<template>
  <div class="card">
    <el-form :model="ruleForm2"
             status-icon
             :rules="rules"
             ref="ruleForm2"
             label-width="120px"
             class="demo-ruleForm">
      <el-form-item label="用户名"
                    prop="account">
        <el-input v-model="ruleForm2.account"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="ruleForm2.password"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm2.checkPass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名"
                    prop="fullname">
        <el-input v-model="ruleForm2.fullname"
                  autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="院区"
                    prop="orgid">
        <el-select @change="selectOrg"
                   v-model="ruleForm2.orgid"
                   placeholder="请选择">
          <el-option v-for="item in orgs"
                     :key="item.orgid"
                     :label="item.orgname"
                     :value="item.orgid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色"
                    prop="roleid">
        <el-select @change="selectRole"
                   v-model="ruleForm2.roleid"
                   placeholder="请选择用户角色">
          <el-option v-for="item in roleData"
                     :key="item.roleid"
                     :label="item.rolename"
                     :value="item.roleid"
                     :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职称"
                    prop="title">
        <el-input v-model="ruleForm2.title"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职称取得日期"
                    prop="titledate">
        <el-date-picker v-model="ruleForm2.titledate"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="身份证号"
                    prop="idcard">
        <el-input autocomplete="off"
                  v-model="ruleForm2.idcard"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm2.sex">
          <el-radio label="M">男</el-radio>
          <el-radio label="F">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="mobile">
        <el-input v-model="ruleForm2.mobile"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input autocomplete="off"
                  v-model="ruleForm2.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  props: {
    item: Object,
    show: {
      type: Boolean,
      default: true
    }
  },
  name: "editUser",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (this.ruleForm2.password && value === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.ruleForm2.password && value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      value: "",
      value1: "",
      orgs: [],
      roleData: "",
      ruleForm2: {
        mobile: "",
        email: "",
        account: "",
        password: "",
        roleid: "",
        rolename: "",
        orgname: "",
        orgid: "",
        sex: "M",
        checkPass: "",
        fullname: "",
        idcard: "",
        title: "",
        titledate: "",
        status: 1
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: false, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: false, validator: validatePass2, trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入职称", trigger: "blur" }],
        titledate: [
          { required: true, message: "请选择职称获得日期", trigger: "blur" }
        ],
        roleid: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    selectRole(v) {
      this.roleData.forEach(item => {
        if (item.roleid === v) {
          this.ruleForm2.rolename = item.rolename;
        }
      });
    },
    selectOrg(v) {
      this.orgs.forEach(item => {
        if (item.orgid === v) {
          this.ruleForm2.orgname = item.orgname;
        }
      });
    },
    getList() {
      this.$axios
        .post("/sysrole/findValidRole")
        .then(res => {
          this.roleData = res.data.result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getOrgs() {
      this.$axios
        .post("/sysorganization/findAll")
        .then(res => {
          this.orgs = res.data.result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = new FormData();
          for (let item in that.ruleForm2) {
            if (item != "checkPass") {
              form.append(item, this.ruleForm2[item]);
            }
          }
          var o = form.get("titledate");
          if (typeof o === "string") {
            form.set("titledate", new Date(o));
          }
          var o1 = form.get("createtime");
          if (typeof o1 === "string") {
            form.set("createtime", new Date(o1));
          }
          var password = form.get("password");
          if(password){
              form.set("password",md5(password));
          }
          this.$axios
            .post("/sysoperator/saveOperator", form, {
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
              that.$emit("edit");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    for (let key in this.item) {
      this.ruleForm2[key] = this.item[key];
    }
    this.ruleForm2.checkPass = "";

    this.getList();
    this.getOrgs();
  },
  watch: {
    show(newVal) {
      this.$nextTick(() => {
        for (let key in this.item) {
          this.ruleForm2[key] = this.item[key];
        }
        this.ruleForm2.checkPass = "";
      });
    }
  }
};
</script>
<style scoped>
.demo-ruleForm {
  width: 460px;
}

.card {
  width: 560px;
  padding-bottom: 15px;
  margin: 0px auto;
}
</style>

<style >
.dialog1 .el-dialog {
  width: 600px;
}
.dialog1 .el-dialog__body {
  width: 600px;
  padding: 0;
  padding-top: 10px;
}
</style>


