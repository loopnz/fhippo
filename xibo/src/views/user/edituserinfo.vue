<template>
  <div class="card">
    <el-form :model="ruleForm2"
             status-icon
             :rules="rules"
             ref="ruleForm2"
             label-width="120px"
             class="demo-ruleForm">

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
  name: "edituserinfo",
  data() {
    return {
      value: "",
      value1: "",
      orgs: [],
      roleData: "",
      user: {},
      ruleForm2: {
        mobile: "",
        email: "",
        orgname: "",
        orgid: "",
        sex: "M",
        fullname: "",
        idcard: "",
        title: "",
        titledate: "",
        roleid: "",
        rolename: "",
        createtime: "",
        creator: "",
        creatorname: "",
        account: "",
        operatorid: "",
        status: 1
      },
      rules: {
        // title: [{ required: true, message: "请输入职称", trigger: "blur" }],
        // titledate: [
        //   { required: true, message: "请选择职称获得日期", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    selectOrg(v) {
      this.orgs.forEach(item => {
        if (item.orgid === v) {
          this.ruleForm2.orgname = item.orgname;
        }
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
          if (o && typeof o === "string") {
            form.set("titledate", new Date(o));
          }
          var o1 = form.get("createtime");
          if (o1 && typeof o1 === "string") {
            form.set("createtime", new Date(o1));
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
    },
    getUserInfo() {
      var form = new FormData();
      form.append("operatorid", this.$store.getters.info.uid);
      this.$axios
        .post("/sysoperator/getOperator", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          this.user = res.data.result;
          for (let key in this.ruleForm2) {
            this.ruleForm2[key] = res.data.result[key];
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getUserInfo();
    this.getOrgs();
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


