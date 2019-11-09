<template>
  <div>
    <div class="add">
      <el-button v-if="has(870001)" type="primary"
                 icon="el-icon-circle-plus-outline"
                 size="mini"
                 @click="addUser">{{$t('btns.add')}}</el-button>
    </div>
    <el-table :data="userListData">
      <el-table-column fixed
                       label="创建时间">
        <template slot-scope="scope">
          {{$moment(scope.row.createtime).format("YYYY-MM-DD HH:mm:ss")  }}
        </template>
      </el-table-column>
      <el-table-column prop="account"
                       label="用户名">
      </el-table-column>

      <el-table-column prop="fullname"
                       label="姓名">
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{scope.row.sex==="M"?"男":"女" }}
        </template>
      </el-table-column>
      <el-table-column prop="mobile"
                       label="手机">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱">
      </el-table-column>
      <el-table-column label="机构">
        <template slot-scope="scope">
          <div class="table-item">
            {{scope.row.orgname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rolename"
                       label="角色">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="has(870002)" size="mini"
                     @click="handleEdit(scope.$index, scope.row)">{{$t('btns.edit')}}</el-button>
          <el-button v-if="has(870003)" size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">{{$t('btns.delete')}}</el-button>
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

    <el-dialog title="添加用户"
               class="dialog1"
               :top="'2vh'"
               :visible.sync="dialogFormVisible">
      <addUser @complete="complete" />
    </el-dialog>

    <el-dialog title="修改用户"
               class="dialog1"
               :top="'2vh'"
               :visible.sync="editdiglog">
      <editUser :item="editItem" :show="editdiglog"
                @edit="edit" />
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import addUser from "../user/addUser";
import editUser from "../user/editUser";
import {has} from "../../utils";
export default {
  name: "articleList",
  components: {
    addUser,
    editUser
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      sort: null,
      userListData: [],
      radio: "1",
      dialogFormVisible: false,
      editdiglog: false,
      editItem: {}
    };
  },
  methods: {
    has,
    edit() {
      this.editdiglog = false;
      this.getList({
        page: this.currentPage,
        pageSize: 10
      });
    },
    addUser() {
      this.dialogFormVisible = true;
    },
    complete() {
      this.dialogFormVisible = false;
      this.getList({
        page: this.currentPage,
        pageSize: 10
      });
    },
    addUserSubmit() {},
    handleEdit(index, row) {
      this.editItem = this.userListData[index];
      this.editdiglog = true;
    },
    handleDelete(index, row) {
      let form = new FormData();
      form.append("operatorid", row.operatorid);
      this.$axios
        .post("/sysoperator/deleteOperator", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          this.$message({
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
    currentChange(page) {
      this.currentPage = page;
      this.getList({
        page: page,
        pageSize: 10
      });
    },
    getList(postdata) {
      let that = this;
      let form = new FormData();
      form.append("page", postdata.page);
      form.append("pageSize", postdata.pageSize);
      this.$axios
        .post("/sysoperator/findOperator", form, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function(res) {
          if (res.data.respCode === "0") {
            that.userListData = res.data.result.resultList;
            that.total = res.data.result.total;
          } else {
            that.$message({
              showClose: true,
              message: res.data.respMsg,
              type: "warn"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
.add {
  margin-bottom: 10px;
}
.page {
  margin-top: 10px;
}

.table-item {
  white-space: nowrap;
}
</style>
