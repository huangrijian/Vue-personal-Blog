<template>
  <div class="search">
    <input maxlength="16" @focus="onFocus" @blur="onBlur" v-model="inputVal" autocomplete="off" placeholder="请输入关键字..." name="s" class="input" type="text">
    <button type="submit" class="submit" @click="SearchWord">搜索</button>
    <transition name="el-fade-in-linear">
        <div v-show="show" class="transition-box">
          <SearchItem  
            :key="index" 
            v-for="(item,index) in dataArr"
            :id="item.id" 
            :index="index" 
            :title="item.title"
            :like_count="item.like_count"
            @click.native="handle(item.id)"
          />
        </div>
    </transition>
  </div>
</template>

<script>
import SearchItem from  './searchItem.vue'
  export default {
    data(){
      return {
        inputVal:null,
        show: false,
        dataArr:[]
      }
    },
    components:{
      SearchItem
    },
    methods:{
      async SearchWord(){
        console.log("inputVal",this.inputVal);
        let {data:{result}}  = await this.$http.post('/api/article/search',{keyWord:this.inputVal});
        // 将结果存储至vuex
        this.$store.commit("setSearchRes",result);

        console.log("搜索结果",result);
        this.$router.push({name:'Lists',query: {keyword:this.inputVal}});
      },
      onFocus(){
        console.log("获取焦点");
        this.show = !this.show
      },
      onBlur(){
        console.log("失去取焦点");
        this.show = !this.show
      },
      handle(id){
        this.$router.push({name:'detail',params:{id}})
      },
      handleDataType(arr){

        for(let i = 0; i < arr.length - 1; i++){
          for(let j = 0; j < arr.length - i - 1; j++){
              let temp = null;
            if(arr[j].like_count > arr[j + 1].like_count){
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
          }
        }
        return arr.reverse()
      },
      async getTypeList (){
       let res  = await this.$http.get('/api/article/typeList');
       this.dataArr = this.handleDataType(res.data.data).slice(0,6);
       console.log(this.dataArr);
      }

    },
    created(){
      this.getTypeList()
    }
  }
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  .input {
    width: 170px;
    height: 34px;
    border-radius: 17px 0 0 17px;
    padding-left: 15px;
    outline:none;
    background: rgb(235, 233, 233);
    border-right: none;
    border:1px solid transparent;
    position: relative;
  }
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

/* 淡出动画 */
 .transition-box {
  box-shadow: 0 0 10px rgb(224, 217, 217);
  margin-bottom: 10px;
  width: 235px;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  box-sizing: border-box;
  margin-right: 20px;
  position: absolute;
  top: 50px;
  }

</style>