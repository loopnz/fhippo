<template>
  <div>
        <el-button v-if="btns.indexOf('800016')!==-1" type="primary">上传</el-button>
        <el-button v-if="btns.indexOf('800017')!==-1" type="primary">下载</el-button>
        <el-button v-if="btns.indexOf('800018')!==-1" type="primary">阅览</el-button>
        <el-button v-if="btns.indexOf('800019')!==-1" type="primary">删除</el-button>
        <el-button v-if="btns.indexOf('800020')!==-1" type="primary">标注</el-button>
        <el-button v-if="btns.indexOf('800021')!==-1" type="primary">编辑</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
 
  },
  computed: {
    ...mapState({
      btns: state => state.routerData.btns
    })
  }
};
</script>

<style scoped>
</style>
