<template>
  <div>
    <div id="frozen-btn">
      <button class="green" :class="ClassArray[index]"  :key="index"  @click="handle(titleidArry[index])"  v-for="(item,index) in titArry"><span>{{index + 1}}.</span>{{item}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        titArry : this.$store.state.articleTitle,
        titleidArry : [],

        ClassArray:['green','purple','green','purple','green','purple','green','purple','green','purple']
      }
    },
    methods:{
      handle(id) {
        console.log(id);
        // this.$r
        this.$router.push({name:'detail',params: {id:id}})
        this.reload()
      }
    },
    mounted(){
      // 将sessionStorage上的文章标题列表和id取出
      this.titArry = JSON.parse(sessionStorage.getItem('titleArry'));
      this.titleidArry = JSON.parse(sessionStorage.getItem('titleidArry'));
    }
  }
</script>

<style lang="scss" scoped>
/* 冰冻效果 */
#frozen-btn button {
  border: 0;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  border-radius: 50px;
  color: white;
  outline: none;
  position: relative;
  cursor:pointer;
}

#frozen-btn button:before {
  content: '';
  display: block;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
  background-size: 210% 100%;
  background-position: right bottom;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 50px;
  transition: all 1s;
  -webkit-transition: all 1s;
}

#frozen-btn .green {
  background-image: linear-gradient(to right, #25aae1, #40e495);
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
  width: 100%;
}

#frozen-btn .purple {
  background-image: linear-gradient(to right, #6253e1, #852D91);
  box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}

#frozen-btn .purple:hover:before {
  background-position: left bottom;
}

#frozen-btn .green:hover:before {
  background-position: left bottom;
}
</style>