<template>
  <div>
    <div class="block">
      <!-- 标题 -->
      <div v-if="searchCount === 0 && isSearch">
        <not-find :searchTit="searchTit" />
      </div>
      <div class="top" v-else-if="isSearch">
        <span>找到与‘{{searchTit}}’相关的{{searchCount}}篇文章</span>
      </div>

      <title-box title="技术博文" v-else></title-box>
      <!-- 列表 -->
      <ul>
        <li :key="index" v-for="(item,index) in AllArticle" @click="GotoArticleDetail(item.id)">
          <div class="title">{{item.title}}</div>
          <div class="content">
            <div class="image">
              <img v-lazy="item.pic_url" alt="">
            </div>
            <div class="describe">
              <p>{{item.brief}}</p>
              <div class="tag">
                <el-tag :key="index" v-for="(items,index) in item.classify" size="small">{{items}}</el-tag>
              </div>
              <div class="describe-bottom">
                <span class="author">{{item.author}}</span>
                <span v-if="item.create_time" class="timer">{{item.create_time.slice(0,10)}}</span>
                <span class="browse"><i class="el-icon-view"></i>577</span>
                <span class="like"><i class="iconfont  My-new-icondianzan"></i>{{item.like_count}}</span>
                <el-button size="mini" type="primary" plain>阅读文章</el-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TitleBox from '../TitleBox/titleBox.vue'
import NotFind from '../NotFind/NotFind.vue'
export default {
  props: {
    searchTit: {
      type: String,
    },
    searchCount: {
      type: Number,
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    AllArticle: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    TitleBox,
    NotFind
  },
  methods: {
    // 去文章详情
    GotoArticleDetail(id) {
      this.$router.push({ name: 'detail', params: { id } });
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: center;
  span {
    font-size: 25px;
    padding: 20px;
  }
}
ul {
  margin-top: 15px;
}
li {
  margin: 20px 0 30px 0;
  cursor: pointer;
}
.title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
}
.content {
  display: flex;
  .image {
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.4s;
    }
    img:hover {
      transform: scale(1.3);
    }
  }
  .describe {
    margin-left: 10px;
    flex: 5;
    position: relative;
    overflow: hidden;
    height: 150px;
    .tag {
      margin: 5px 0;
      .el-tag {
        margin-right: 10px;
      }
    }

    p {
      display: block;
      font-size: 14px;
      color: #666;
      // 文字溢出隐藏
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 26px;
    }
    .describe-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      line-height: 28px;
      i {
        margin-right: 5px;
      }
      span {
        margin: 0 10px;
        font-size: 14px;
        color: rgb(107, 107, 107);
      }
      .author {
        margin-left: 0;
      }

      .el-button {
        float: right;
      }
    }
  }
}
</style>