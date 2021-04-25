<template>
  <div>
    <span>本站已经勉强运行了{{day}}天{{hour}}小时{{minute}}分{{seconds}}秒</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        day:null,
        hour:null,
        minute:null,
        seconds:null
      }
    },
    methods:{

    runtime(){// 初始时间，日/月/年 时:分:秒
      const start = new Date("2021/4/23 0:00:00");
      let nowTime = new Date();
      let difference  = (nowTime.getTime()-start.getTime());
      let oneDaysecond = 24*60*60*1000;
      let d = difference/oneDaysecond;// 时间差 / 一天的毫秒数  = 天数
       this.day  = Math.floor(d);//获取天数（向下取整）
      let h = (d-this.day)*24;//去除天数中的整数 *  24  = 小时数
       this.hour = Math.floor(h);
      let s = (h-this.hour)*60; //去除小时数中的整数 *  60  = 分钟数
       this.minute = Math.floor(s);
      let sec = (s - this.minute) * 60//去除分钟数中的整数 *  60  = 秒数
      this.seconds = Math.floor(sec);
     // span.innerHTML = "本站已经勉强运行了"+day+"天"+hour+"小时"+minute+"分"+seconds+"秒"
    }

    },
    created(){
      setInterval(this.runtime, 1000);
    }
  }
</script>

<style lang="scss" scoped>

</style>