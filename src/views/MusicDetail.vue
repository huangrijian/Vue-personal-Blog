<template>
  <el-card class="box-card" v-loading="loading">
    <div class="comment" v-for="(item) in hotComments" :key="item.time">
      <div class="commentTop">
        <img class="avatar" :src="item.user.avatarUrl" />
        <span class="nickname">{{item.user.nickname}} :</span>
      </div>
      <p>
        <span class="content">{{item.content}}</span>
        <span class="like">
          <img src="../assets/img/like.svg" />
          <span class="like_count">({{item.likedCount}})</span>
        </span>
      </p>
      <span class="timer">{{item.timeStr}}</span>

    </div>
  </el-card>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    this.loading = true
    this.id = to.params.id;
    this.getSongComment(to.params.id);
    next();
  },
  data() {
    return {
      id: null,
      hotComments: [],
      loading: true
    }
  },
  methods: {
    async getSongComment(id) {
      let { data: { hotComments } } = await this
        .$http.get(`http://112.124.52.188:3000/comment/music`, { params: { id }, type: 'specialRequest' });
      this.hotComments = hotComments;
      this.loading = false

    }
  },
  created() {
    this.getSongComment(this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  .comment {
    border: 1px dashed #cbcbcb;
    border-radius: 8px;
    padding: 5px;
    margin: 15px 0;
    .commentTop {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .nickname {
        font-size: 13px;
        margin-left: 5px;
        color: rgb(116, 115, 115);
      }
    }

    p {
      padding: 10px 0;
      line-height: 25px;
      .content {
        font-size: 14px;
      }
      .like {
        margin-left: 10px;
        display: inline-block;
        line-height: 25px;
        img {
          width: 20px;
          transform: translateY(3px);
        }
        .like_count {
          font-size: 12px;
        }
      }
    }
    .timer {
      font-size: 12px;
    }
  }
}
</style>