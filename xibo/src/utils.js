export function has(btnid){
        var flag = false;
        for (var i = 0; i < this.$store.state.routerData.btns.length; i++) {
          if (this.$store.state.routerData.btns[i] === btnid) {
            flag = true;
            break;
          }
        }
        return flag;

}