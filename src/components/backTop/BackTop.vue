<template>
  <div>
     <div id="top" class="backTop" @click="BackTop()" v-show="flag"></div>
  </div>
</template>
<script>
export default {
      data() {
      return {
        flag:false
      }
    },
  methods:{
    BackTop(){
     // 页面pc端滚动
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
      });
      // 移动端滚动
       let timer = setInterval(() => {
        document.body.scrollTop-=50;
        if(document.body.scrollTop <= 0) {
          clearInterval(timer)
        }
      },10)


      // 导航动画
      let strat = -60;
      let end = 0;
      let nav = document.querySelector('.common-header');
      nav = document.querySelector('.common-header');
      let pos = nav.getAttribute('style')
      let position = pos.split("top:").join("").split("px").join("")
      if(parseInt(position) == -60){
        let timer = setInterval(() => {
          nav.setAttribute('style','top:'+ strat +'px')
          strat += 2;
              if(strat > end ) {
                // 清空定时器
                clearInterval(timer)
              } 
        },8)
      }



    },
  },
  mounted () {
      window.addEventListener('scroll', (() => {
        if(document.body.scrollTop >= 100 || window.pageYOffset >= 100 || document.documentElement.scrollTop >= 100){
          this.flag = true;
        }else {
          this.flag = false
        }
      }),true)
    }
}
</script>
<style lang="scss" scoped>
 .backTop {
   position: fixed;
   right: 5px;
   bottom: 110px;
   cursor:pointer;
   width: 50px;
   height: 50px;
   background: url('~@/assets/img/rocket.png');
   background-size: 50px;
   z-index: 10;
 }
</style>