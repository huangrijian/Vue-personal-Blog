<template>
  <div>
    <div class="comment-box">
      <div v-if="isSignIn === 0" class="signInText">
        <span class="login" @click="GotoLogin">登录</span>留言吧
      </div>
      <div class="bottom">
        <div class="dec">
          <span>共<span class="commentTotal">{{ commentArrayCount }}</span>条留言</span>
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
                  <div class="master" style="color:#409eff" v-if="item.user_id === 18">站主</div>
                  <div style="fontWeight:600; fontSize:18px; marginRight:8px">:</div>
                  <span class="cmcontent">{{ item.cmcontent }}</span>
                </div>
                <div class="timerorlike">
                  <span class="timer">{{ item.create_time }}</span>
                  <span @click="clickLike(item.id, index)">
                    <i :class="['iconfont',  'My-new-icondianzan', {isLike:item.is_like}]"></i>
                    {{item.like_count}}
                  </span>
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
import ReplyItem from "./ReplyItem.vue";
import globalBackTop from '@/assets/js/scrollTo.js';
import {
  getArticleComment,
  sendComment,
  getArticleCommentCount,
  deleteComment,
  clickLike
} from '@/network/comment.js'

const placeholder = "请输入内容并按回车键发送";
export default {
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
    articleId(newVal) {
      // 初始化分页器
      this.pageSize = 5
      this.commentArrayCount = 20
      this.currentPage = 1
      this.initialization(this.pageSize, this.offset, newVal)
    }
  },
  data() {
    return {
      commentArray: [],
      textarea: "",

      like_count: 0,

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
    async handleDelect(id) {

      await this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      // 发起删除的网络请求
      await deleteComment({ comment_id: id })
      this.$message({
        type: "success",
        message: `评论删除成功!`,
      });
      this.initialization(this.pageSize, this.offset, this.articleId);
    },

    GotoLogin() {
      this.$router.push({ name: "login" });
    },
    // 获取文章评论
    async GetArticleComment(list, offset) {
      // this.articleId 为 0 则属于 网站留言
      let { data } = await getArticleComment({ article_id: this.articleId, list, offset, username: sessionStorage.getItem('username') });
      this.commentArray = data;
      this.show3.length = this.commentArray.length;
      this.show3.fill(false);
    },
    // 初始化评论框的数据
    InitializeReplyAndTextareaData() {
      this.textarea = "";
      this.parent_cm_id = -1;
      this.reply_nickname = null;
      this.replyUserId = null;
      this.placeholder = placeholder;
    },

    async clickLike(comment_id, index) {
      if (this.$store.state.isSignIn === 0) {
        this.$message({
          message: '请登录再进行点赞',
          type: 'warning'
        })
        return this.$router.push({ name: 'login' })
      }
      let { code, msg, count } = await clickLike({ comment_id });
      let message = {};
      if (code === 200) {
        this.commentArray[index].like_count = count.like_count;
        this.commentArray[index].is_like = true;
        message = {
          message: msg,
          type: "success",
        }
      } else {
        message = {
          message: msg,
          type: "warning",
        }
      }
      this.$message(message);
    },

    // 发送评论
    async SendComment(textarea) {
      if (this.isSignIn === 1) {
        let data = {
          content: textarea,
          article_id: this.articleId,
          parent_cm_id: this.parent_cm_id,
          reply_nickname: this.replyNickname,
          reply_user_id: this.replyUserId,
        }
        await sendComment(data);
        this.getCommentCount(this.articleId);
        this.GetArticleComment(this.pageSize, this.offset);
        this.InitializeReplyAndTextareaData();
      } else {
        this.$message({
          message: "请登录后进行操作",
          type: "warning",
        });
        this.$router.push({ name: "login" });
      }
    },
    // 跳转页数时获取新一页的评论
    GetNewComment(currentPage) {
      this.currentPage = currentPage;
      this.GetArticleComment(this.pageSize, this.offset);
      globalBackTop();
    },
    // 初始化数据
    async initialization(pageSize, offset, article_id) {
      await this.getCommentCount(article_id);
      this.GetArticleComment(pageSize, offset);
    },

    // 获取评论总条数
    async getCommentCount(article_id) {
      let { count } = await getArticleCommentCount({ article_id })
      this.commentArrayCount = count;
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

.isLike {
  color: red;
}
</style>
