<template>
  <div>
    <div class="comment-box">
      <div v-if="isSignIn === 0" class="signInText">
        <span class="login" @click="GotoLogin">登录</span>留言吧
      </div>
      <div class="bottom">
        <div class="dec">
          <span>共<span class="commentTotal">{{ commentArray.length }}</span>条留言</span>
        </div>
        <div class="CommentInput">
          <img :src="imageUrl ? imageUrl : defaultAvatar" alt="" />
          <el-input type="textarea" :rows="3" :placeholder="placeholder" v-model="textarea" class="inputbox" size="350" maxlength="350" resize="none" @keyup.13.native="SendComment(textarea)">
          </el-input>
        </div>
        <!-- 评论区 -->
        <ul class="Commentarea">
          <h3>热门留言</h3>
          <li :key="index" v-for="(item, index) in commentArray">
            <div class="Commentareabox">
              <div class="pic">
                <img :src="item.head_img" alt="" />
              </div>
              <div class="side">
                <div class="CommentTitle">
                  <span class="nickname">{{ item.nickname }}</span>
                  <div class="master" style="color:#409eff" v-if="item.user_id === 18">
                    站主
                  </div>
                  <div style="fontWeight:600; fontSize:18px; marginRight:8px">
                    :
                  </div>
                  <span class="cmcontent">{{ item.cmcontent }}</span>
                </div>
                <div class="timerorlike">
                  <span class="timer">{{ item.create_time }}</span>
                  <span @click="clickLike(item.commentId, $event)"><i class="iconfont  My-new-icondianzan"></i>999</span>
                  <span class="vertical">|</span>
                  <span @click="reply(item.id, null, null, index)">回复</span>
                  <span class="delete" v-if="thisNickName === '黄先森'" @click="handleDelect(item.id)">删除</span>
                </div>
                <el-collapse-transition>
                  <div v-show="show3[index]">
                    <div class="transition-box">
                      <div style="display:flex; align-items: center;">
                        <img :src="imageUrl ? imageUrl : defaultAvatar" alt="" style="width:40px; marginRight:15px" />
                        <el-input type="textarea" :rows="3" :placeholder="placeholder" v-model="textarea" class="inputbox" size="350" maxlength="350" resize="none" @keyup.13.native="SendComment(textarea)">
                        </el-input>
                      </div>
                    </div>
                  </div>
                </el-collapse-transition>
                <ReplyItem :ReplyItem="item.son" :reply="reply" :index="index" />
              </div>
            </div>
          </li>
        </ul>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="commentArrayCount" :current-page="currentPage" @current-change="GetNewComment" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import ReplyItem from "./ReplyItem.vue";
const placeholder = "请输入内容并按回车键发送";
export default {
  inject: ["reload"],
  props: {
    articleId: {
      type: Number,
      default: 0
    }
  },
  components: {
    ReplyItem,
  },
  watch: {
    articleId() {
      this.GetArticleComment();
    }
  },
  data() {
    return {
      commentArray: [],
      textarea: "",

      pageSize: 5,
      commentArrayCount: 20,
      currentPage: 1,

      imageUrl: sessionStorage.getItem("avatar"),
      defaultAvatar: require("@/assets/img/pl.jpg"),

      thisNickName: sessionStorage.getItem("nickname"),

      parent_cm_id: -1,
      replyNickname: null,
      replyUserId: null,

      placeholder: placeholder,

      show3: [],
    };
  },
  methods: {
    getElementTop(element) {
      var actualTop = element.offsetTop;
      var current = element.offsetParent;

      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }

      return actualTop;
    },
    reply(parent_cm_id, replyNickname = null, replyUserId = null, index) {
      this.showInputBox(index);
      this.SaveReplyData(parent_cm_id, replyNickname, replyUserId);
      window.scrollTo({
        top: this.getElementTop(document.querySelectorAll(".CommentTitle")[index]),
        behavior: "smooth",
      });
    },
    showInputBox(index) {
      this.show3.fill(false);
      this.show3.splice(index, 1, !this.show3[index]);
    },
    SaveReplyData(parent_cm_id, replyNickname, replyUserId) {
      this.replyNickname = replyNickname;
      this.replyUserId = replyUserId;
      this.parent_cm_id = parent_cm_id;
      this.placeholder = replyNickname ? `@${replyNickname}` : `${placeholder}`;
    },
    handleDelect(id) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发起删除的网络请求
          this.$http
            .post("/api/comment/delete", {
              comment_id: id,
            })
            .then((res) => {
              if (res.data.code === 0) {
                //发起删除请求操作
                this.$message({
                  type: "success",
                  message: `评论删除成功!`,
                });
                setTimeout(() => {
                  this.reload();
                }, 500);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    GotoLogin() {
      this.$router.push({ name: "login" });
    },
    // 获取文章评论
    GetArticleComment(list, offset) {
      if (this.articleId == 0) {
        // 如果当前没有文章id,则属于留言 ，则把文章id赋值为0再发送请求
        this.$http
          .get("/api/comment/list", { params: { article_id: 0, list, offset } })
          .then((res) => {
            // 将得到的数组进行反转再保存
            this.commentArray = res.data.data;
            this.show3.length = this.commentArray.length;
            this.show3.fill(false);
          });
      } else {
        this.$http
          .get("/api/comment/list", { params: { article_id: this.articleId, list, offset } })
          .then((res) => {
            // 将得到的数组进行反转再保存
            this.commentArray = res.data.data;
            this.show3.length = this.commentArray.length;
            this.show3.fill(false);
          });
      }
    },
    InitializeReplyAndTextareaData() {
      this.textarea = "";
      this.parent_cm_id = -1;
      this.reply_nickname = null;
      this.replyUserId = null;
      this.placeholder = placeholder;
    },
    // 发送评论
    SendComment(textarea) {
      if (Cookie.get("token")) {
        // 发起评论请求
        this.$http
          .post("/api/comment/publish", {
            content: textarea,
            // 有则发送文章id，无则发送0
            article_id: this.articleId ? this.articleId : 0,
            parent_cm_id: this.parent_cm_id,
            reply_nickname: this.replyNickname,
            reply_user_id: this.replyUserId,
          })
          .then((res) => {
            this.GetArticleComment(this.pageSize, this.offset);
            this.InitializeReplyAndTextareaData();
          });
      } else {
        this.$message({
          message: "请登录后进行操作",
          type: "warning",
        });
        this.$router.push({ name: "login" });
      }
    },

    // GetNewComment
    GetNewComment(currentPage) {
      this.currentPage = currentPage;
      this.GetArticleComment(this.pageSize, this.offset);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    // 初始化数据
    async initialization(pageSize, offset, article_id) {
      let listCount = await this.$http.get('/api/comment/listCount', { params: { article_id } })
      let { data: { count } } = listCount;
      this.commentArrayCount = count
      this.GetArticleComment(pageSize, offset);
    }
  },
  computed: {
    // 查询登录状态
    isSignIn() {
      return this.$store.state.isSignIn;
    },
    offset() {
      return (this.currentPage - 1) * this.pageSize;
    }
  },
  created() {
    this.initialization(this.pageSize, this.offset, this.articleId);
    console.log(this.articleId)
  },

};
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
    margin-right: 25px;
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
      height: 75px;
      margin: 0 15px;
      border-radius: 5px;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
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
    border-bottom: 1px dashed rgb(204, 204, 204);
    .Commentareabox {
      padding: 10px 0;
      overflow: hidden;
      display: flex;
      .pic,
      .side {
        .CommentTitle {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        .nickname {
          color: skyblue;
          font-size: 18px;
          font-weight: 700;
        }
        .master {
          width: 40px;
          height: 20px;
          border: 1px solid #056a99;
          border-radius: 10px;
          font-size: 14px;
          justify-content: center;
          align-items: center;
          display: flex;
          margin: 0 3px;
        }
        .cmcontent {
          line-height: 1.5;
          font-size: 16px;
          margin: 5px 0px;
          letter-spacing: 1.5px;
          word-wrap: break-word;
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
          .delete {
            margin-right: 10px;
            color: skyblue;
            cursor: pointer;
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
          margin-top: 15px;
          margin-bottom: 15px;
          height: 15px;
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
  cursor: pointer;
}

.signInText {
  margin-bottom: 10px;
  .login {
    // 鼠标小手
    cursor: pointer;
    color: skyblue;
  }
}

.transition-box {
  margin-bottom: 5px;
}
</style>
