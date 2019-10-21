<template>
  <div>
        <el-button v-if="btns.indexOf('800001')!==-1" type="primary">上传</el-button>
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
