<template>
  <div class="jishubowen">
    <ul class="BlogUl">
      <li class="liItem" :key="index" v-for="(item,index) in AllArticle" @click="GotoArticleDetail(item.id)">
        <div class="img">
          <img v-lazy="item.pic_url" alt="">
        </div>
        <div :style="{display:'flex',alignItems:'center'}">
          <img :style="{width:20+'px',height:20+'px', marginRight:5+'px'}" src="../../assets/img/hd.png">
          <div class="title press">{{item.title}}</div>
        </div>
        <div class="brief">{{item.brief}}</div>
        <div class="Item-end">
          <span>+文章阅读</span>
          <span class="timer">{{item.create_time | timer()}}</span>
          <div :style="{display:'flex', alignItems:'center'}">
            <img :style="{width:20+'px'}" src="../../assets/img/like.png">
            <span class="like_count">{{item.like_count}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['AllArticle'],
  filters: {
    timer(val) {
      return val.slice(0, 10)
    },

  },
  data() {
    return {
    }
  },
  methods: {
    // 去文章详情
    GotoArticleDetail(id) {
      this.$router.push({ name: 'detail', params: { id } });
    }
  },
}
</script>

<style lang="scss" scoped>
.BlogUl {
  display: flex;
  flex-wrap: wrap;
  .liItem {
    padding: 15px;
    width: 32%;
    margin: 10px 5px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid rgba(153, 149, 149, 0.3);
    flex-direction: column;
    justify-content: space-between;
    .img {
      width: 100%;
      height: 150px;
      overflow: hidden;
      border-radius: 5px;
      img {
        width: 100%;
        height: 100%;
        position: relative;
        transition: all 0.6s;
      }
      img:hover {
        transform: scale(1.2);
      }
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      margin: 10px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .brief {
      font-size: 14px;
      line-height: 22px;
      height: 65px;
      margin-bottom: 15px;
      color: rgb(107, 107, 107);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .timer {
      font-size: 14px;
      color: rgb(107, 107, 107);
    }

    .Item-end {
      height: 25px;
      display: flex;
      align-items: center;
      color: skyblue;
      justify-content: space-between;
      .like_count {
        color: gray;
        font-weight: 700;
      }
    }
  }
  .liItem:hover {
    box-sizing: border-box;

    box-shadow: 0px 2px 10px 3px rgba(179, 177, 177, 0.5);
  }
}

.iconfont {
  margin-right: 3px;
}
</style>