<template>
  <div class="card">
    <p class="title"><i class="fa fa-th-large fa-lg"></i>修改密码</p>
    <el-form :model="ruleForm2"
             status-icon
             :rules="rules2"
             ref="ruleForm2"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="原密码"
                    prop="oriPwd">
        <el-input type="password"
                  v-model="ruleForm2.oriPwd"
                  autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码"
                    prop="newPwd">
        <el-input type="password"
                  v-model="ruleForm2.newPwd"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码"
                    prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm2.checkPass"
                  autocomplete="off"></el-input>
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
import Cookies from "js-cookie";
import md5 from "md5"
export default {
  name: "editPassword",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        oriPwd: "",
        newPwd: "",
        checkPass: ""
      },
      rules2: {
        oriPwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        newPwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var form = new FormData();
          form.append("oriPwd", md5(this.ruleForm2.oriPwd));
          form.append("newPwd", md5(this.ruleForm2.newPwd));
          this.$axios
            .post("/operator/modPwd", form, {
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
              setTimeout(function() {
                Cookies.remove("access_token");
                location.reload();
              }, 3000);
            })
            .catch(err => {
              that.$message({
                showClose: true,
                message: err.data.respMsg,
                type: "error"
              });
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
  }
};
</script>

<style scoped>
.demo-ruleForm {
  width: 460px;
  padding-top: 25px;
}
.card {
  width: 560px;
  padding-bottom: 15px;
  margin: 0px auto;
}
</style>