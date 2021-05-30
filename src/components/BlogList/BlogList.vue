<template>
  <div class="jishubowen">
    <ul class="BlogUl">
      <li class="liItem" :key="index" v-for="(item,index) in AllArticle" @click="GotoArticleDetail(item.id)">
        <div class="img">
          <img v-lazy="item.pic_url" alt="">
        </div>
        <div class="title">{{item.title}}</div>
        <div class="brief">{{item.content}}</div>
        <div class="tag">
          <el-tag v-if="item.class_name01">{{ item.class_name01 }}</el-tag>
          <el-tag v-if="item.class_name02" type="success">{{item.class_name02 }}</el-tag>
          <el-tag v-if="item.class_name03" type="info">{{ item.class_name03}}</el-tag>
        </div>
        <div class="Item-end">
          <span>+文章阅读</span>
          <span class="timer">{{item.create_time | timer()}}</span>
          <span class="like"><i class="iconfont  My-new-icondianzan"></i>{{item.like_count}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['AllArticle','AllArticleClassName'],
    filters:{
      timer(val){
        return val.slice(0,10)
      },

    },
    data() {
      return {
      }
    },
    methods:{
          // 去文章详情
      GotoArticleDetail(id){
        this.$router.push({name:'detail',params: {id:id}})
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
    border: 1px solid rgba(153, 149, 149,0.3);
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
      img:hover{
        transform: scale(1.2);
      }

    }
    .tag {
      margin: 10px 0;
     .el-tag {
       margin-right: 10px;
     }
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      margin: 10px 0;
    }
    .brief {
      font-size: 14px;
      margin-bottom: 15px;
      color: rgb(107, 107, 107);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .Item-end {
      .like {
        float: right;
      }
    }
    .timer {
      font-size: 14px;
      color: rgb(107, 107, 107);
    }
    .Item-end span:first-of-type{
      color: rgb(29, 202, 218);
      margin-right: 10px;
    }
  }
  .liItem:hover{
    box-sizing: border-box;
   
    box-shadow: 0px 2px 10px 3px rgba(179, 177, 177, 0.5); 
  }
}

.iconfont {
  margin-right: 3px;
}
</style>