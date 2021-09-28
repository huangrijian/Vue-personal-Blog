<template>
  <div class="search">
    <input maxlength="16" v-model="inputVal" autocomplete="off" placeholder="请输入关键字..." name="s" class="input" type="text">
    <button type="submit" class="submit" @click="SearchWord">搜索</button>
    
  </div>
</template>

<script>
  export default {
    data(){
      return {
        inputVal:null
      }
    },
    methods:{
      SearchWord(){
        console.log("inputVal",this.inputVal)
      }
    }
  }
</script>

<style lang="scss" scoped>

.search .input {
  width: 170px;
  height: 34px;
  border-radius: 17px 0 0 17px;
  padding-left: 15px;
  outline:none;
  background: rgb(235, 233, 233);
  border-right: none;
  border:1px solid transparent

}
.input:focus {
  background:rgb(255, 255, 255);
  border:1px solid #409eff;
}
button {
  height: 38px;
  transform: translateY(1px);
  border: none;
  color: #fff;
  border-radius: 0 17px 17px 0;
  padding: 0 10px;
  background: #409eff;
  cursor:pointer;
}
</style>