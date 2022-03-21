<template>
  <div class="card">
    <div class="card-big">
      <div class="card-title">
        <div style="display:flex;align-items: center;">
          <img class="card-icon" src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3779990328,1416553241&fm=179&app=35&f=PNG?w=108&h=108&s=E7951B62A4639D153293A4E90300401B">
          <span style="color:#FF6600">百度热搜版</span>
        </div>
        <div>
          <span style="color:#9195A3"><a target="_blank" :href="`https://www.baidu.com/s?wd=热搜`">更多</a></span>
        </div>
      </div>
      <div class="card-container">
        <div class="hot-item" v-for="(item, index) in newslist" :key="item.title">
          <span class="item-left">{{index+1}}</span>
          <a class="item-mid" target="_blank" :href="`https://www.baidu.com/s?wd=${item.title}`">{{item.title}}</a>
          <span class="c-text-hot" v-if="index <= 2">热</span>
          <span class="c-text-hot" v-if="item.hotnum >= 6000000">爆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['newslist']
}
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  height: 280px;
  border-radius: 12px;
  box-shadow: 0 2px 10px 0 rgb(151, 150, 150);
  background: #ffffff;
  .card-big {
    width: 100%;
    padding: 16px 13px 0 13px;
    .card-title {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .card-icon {
        width: 16px;
        height: 16px;
        line-height: 16px;
        color: #222222;
        font-size: 15px;
        margin-right: 5px;
      }
    }
    .card-container {
      margin-top: 14px;
      overflow: hidden;
      .hot-item {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .item-mid {
          font-size: 13px;
          flex: 1;
          margin-left: 5px;
        }
        .item-left {
          width: 14px;
          height: 14px;
          font-family: PingFangSC-Medium;
          font-size: 14px;
        }
        .c-text-hot {
          width: 16px;
          height: 16px;
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          border-radius: 4px;
          color: #fff;
          background-color: #f60;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>