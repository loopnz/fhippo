<template>
  <div>
      <div class="add">
      <el-button type="primary"
                 icon="el-icon-circle-plus-outline"
                 size="mini"
                 @click="addUser">新增</el-button>
    </div>
    <el-table
      :data="userListData">
      <el-table-column
        fixed
        prop="createdAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="mobilePhone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
      @prev-click="currentChange"
      @next-click="currentChange"
    >
    </el-pagination>

        <el-dialog title="添加用户"
               class="dialog1"
               :top="'2vh'"
               :visible.sync="dialogFormVisible">
      <addUser @complete="complete"/>
    </el-dialog>
  </div>
</template>

<script>
import addUser from "../user/addUser"
export default {
  name: 'articleList',
  components:{
    addUser
  },
  data () {
    return {
      total: 0,
      currentPage: 1,
      sort: null,
      userListData: [],
      radio:'1',
      dialogFormVisible:false
    }
  },
  methods: {
    addUser(){
      this.dialogFormVisible = true;
    },
    complete(){
      this.dialogFormVisible = false;
     this.getList({
                currentPage: this.currentPage,
                pageSize:10,
              })
    },
    addUserSubmit(){

    },
    handleEdit (index, row) {
      this.$router.push({path: '/editUser?userId=' + row.id});
    },
    handleDelete (index, row) {
      console.log(index, row)
      let that = this
      this.$axios.post('/user/delUser', {
        id: row.id
      })
        .then(response => {
          console.log(response)
            that.$message({
              showClose: true,
              message: response.data.message,
              type: 'success'
            })
            that.getList({
                currentPage: that.currentPage,
                pageSize:10,
              })
        })
        .catch(err => {
          console.log(err)
        })
    },
    currentChange(page){
      console.log(page);
      this.currentPage = page
      this.getList({
        currentPage: page,
        pageSize:10,
      })
    },
    getList (postdata) {
      let that = this
      this.$axios.post('/user/userList', postdata)
        .then(function (response) {
          for (let i = 0; i < response.data.rows.length; i++) {
            let d = new Date(response.data.rows[i].createdAt)
            let moth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
            let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
            let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
            let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
            let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
            response.data.rows[i].createdAt = d.getFullYear() + '-' + moth + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
            that.total = response.data.count
            that.userListData = response.data.rows
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getList({
      currentPage: 1,
      pageSize:10,
    })
  }
}
</script>

<style scoped>

.add{
  margin-bottom: 10px;
}
.page{
  margin-top: 10px;
}
</style>
