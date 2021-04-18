<template>
  <div>
    <div class="comment-box">
      <div v-if="isSignIn === 0" class="signInText">登录留言吧</div>
        <div class="bottom">
          <div class="dec">
              <span>共<span class="commentTotal">{{commentArray.length}}</span>条留言</span>
          </div>
          <div class="CommentInput">
              <img :src="head_img" alt="">
              <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容并按回车键发送"
              v-model="textarea"
              class="inputbox"
              size="350"
              maxlength="350"
              resize="none"
              @keyup.13.native="SendComment(textarea)">
              </el-input>

          </div>
          <!-- 评论区 -->
          <ul class="Commentarea">
              <h3>热门留言</h3>
              <li :key="index" v-for="(item,index) in commentArray">
                  <div class="Commentareabox">
                      <div class="pic">
                          <img :src="item.head_img" alt="">
                      </div>
                      <div class="side">
                          <div class="CommentTitle">
                              <span class="nickname">{{item.nickname}}: </span>
                              <span>{{item.cmcontent}}</span>
                          </div>
                          <div class="timerorlike">
                              <span class="timer">{{item.create_time}}</span>
                              <span class="My-new-icondianzan" @click="clickLike(item.commentId,$event)"><i class="el-icon-thumb"></i>999</span>
                              <span class="vertical">|</span>
                              <span>回复</span>
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['articleId'],
    data() {
      return {
        commentArray:[],
        textarea:'',

        head_img:sessionStorage.getItem("avatar")

      }
    },
    methods:{
      // 获取文章评论
      GetArticleComment(){
        if(this.articleId){
          this.$http.get('/api/comment/list',{params:{article_id:this.articleId}})
          .then(res => {
            // 将得到的数组进行反转再保存
            this.commentArray = res.data.data.reverse();
          })
        }else {
          // 如果当前没有文章id,则属于留言 ，则把文章id赋值为0再发送请求
           this.$http.get('/api/comment/list',{params:{article_id:0}})
          .then(res => {
            // 将得到的数组进行反转再保存
            this.commentArray = res.data.data.reverse();
          })
        }
      },
      // 发送评论
      SendComment(textarea){
        // 发起评论请求
        this.$http.post('/api/comment/publish',{
          content:textarea,
          // 有则发送文章id，无则发送0
          article_id:this.articleId ? this.articleId:0
        }).then(res => {
          this.GetArticleComment();
          this.textarea = ''
        })
      },
    },
    computed:{
      // 查询登录状态
      isSignIn(){
        return this.$store.state.isSignIn;
      },


    },
    created(){
      this.GetArticleComment();
    }
  }
</script>

<style lang="scss" scoped>
.top {
    overflow: hidden;
    position: relative;
    margin-bottom: 85px;
    .top-left,
    .top-right {
        float: left;
    }
    .top-left {
        margin-right:25px;
        img {
            width: 130px;
        }
    }
    .top-right {
       div {
           margin: 15px 0;
       }
       .title {
           font-size: 25px;
           font-weight: 400;
       }
       
    }
    .top-right-btn {
          position: absolute;
          bottom: 1px;
          right: 0px;
    }
}
.bottom {
    .dec {
        margin-bottom: 25px;
    }
    .CommentInput {
      display: flex;
        margin-bottom: 55px;
        img {
            width: 75px;
            margin: 0 15px;
            border-radius: 5px;
        }
    }
}

.commentTotal {
  color: red;
}
.Commentarea {
    li {
        font-size: 14px;
        margin: 10px 0;
        width: 100%;
        border-bottom: 1px dashed  rgb(204, 204, 204);
        .Commentareabox {
            padding: 15px 0;
            overflow: hidden;
            .pic,
            .side {
                float: left;
                .nickname {
                    color: skyblue;
                }
                .timerorlike {
                    margin-top: 15px;
                    .timer {
                        color: #999;
                    }
                    i {
                      margin-right: 8px;
                    }
                    .vertical {
                        margin: 0 10px;
                    }
                }
            }
            .pic {
                img {
                    width: 50px;
                    margin-right: 10px;
                }
            }

             .side {
                width: 93%;
                .timerorlike {
                     .timer {
                    float: left;
                }
                span {
                    float: right;
                }
                }
            }
        }
    }
}
.My-new-icondianzan {
      // 鼠标小手
  cursor:pointer;
}

</style>