<template>
<div>
    <div class="block wow slideInLeft">
      <!-- 您的位置 -->
      <location Tit1="首页" Tit2="技术博文" class="wow slideInLeft"></location>
      <!-- 具体文章 -->
      <article-contents :data="data" class="wow slideInLeft"></article-contents>
      <!-- 点赞/打赏 -->
      <div class="likeBox">
          <el-button type="primary" round @click="isClick&&like()"><i class="iconfont  My-new-icondianzan"></i>点赞（{{likeCount}}）</el-button>
          <el-button type="success" round @click="dialogVisible = true"><i class="iconfont My-new-icondashang"></i>打赏</el-button>
      </div>
      <!-- 弹框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        custom-class="tankuang"
        >
      </el-dialog>

      <!-- 评论 -->
      <comment :articleId="id"></comment>
    </div>
   </div>
</template>

<script>
import WOW from 'wowjs';
import comment from '@/components/Comment.vue'
import location from '../components/Location/location.vue'
import ArticleContents from '../components/ArticleContents/ArticleContents.vue'
import Cookie from 'js-cookie'
  export default {
    components:{
      comment,
      location,
      ArticleContents,
     
    },
    data() {
      return {
        id:this.$route.params.id,
        data:{},

        likeCount:'',

        isClick:true,

        dialogVisible: false
      }
    },
    methods:{
      GetArticleDetail(){
        this.$http.get('/api/article/detail',{
          params:{
            article_id:this.id
          }
        }).then(res => {
          console.log(res);
          if(res.data.code === 0 ){
            this.data = res.data.data;
            this.likeCount = res.data.data.like_count;
          }
        })
      },
      // 点赞
      like(){
        // 判断是否登录了
         if(Cookie.get('token')){
           this.$http.post('/api/article/like',{
            article_id:this.$route.params.id
          }).then(res => {
            console.log(res.data.data[0]);
            this.likeCount = res.data.data[0].like_count
            this.isClick = false
          })
        }else {
          this.$message({
            message: '请登录后进行操作',
            type: 'warning'
          });
          this.$router.push({name:'login'})
        }
        
      }
    },
    created(){
      this.GetArticleDetail()

    },
    mounted(){
      	let wow = new WOW.WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: true,
          live: true
        });
        wow.init();
    }
  }
</script>

<style lang="scss" scoped>
.head {
   margin-top: 20px;
}
.likeBox {
  display: flex;
  justify-content: center;
  margin: 25px 0;
  .el-button {
    margin: 0 10px;
  }
  i {
    margin-right: 8px;
  }
}

.wx {
  width: 150px;
}
</style>