<template>
  <div class="wrapper">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="文章管理">
        <div class="article">
          <el-button class="addBtn" @click="handleAdd('article')">新增+</el-button>
          <el-table :data="articleList" border stripe>
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleLook(scope.row)">查看</el-button>
                <el-button size="mini" type="success" @click="handleEdit(scope.row, 'article')">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelect(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发言管理" v-if="isSignIn === 1 && grade === '1'">
        <div class="article">
          <el-button class="addBtn" @click="handleAdd('speech')">新增+</el-button>
          <el-table :data="speechList" border stripe>
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleLook(scope.row)">查看</el-button>
                <el-button size="mini" type="success" @click="handleEdit(scope.row, 'speech')">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelect(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="权限管理" v-if="isSignIn === 1 && grade === '1'">
        <Authority />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Authority from "@/components/article/authority.vue";
import { getMyArticleList } from '@/network/article'
import { getSpeechList } from '@/network/speech'
export default {
  data() {
    return {
      articleList: [],
      speechList: [],
    };
  },
  components: {
    Authority,
  },
  methods: {
    tabClick({ label }, event) {
      switch (label) {
        case "发言管理":
          this.getSpeech();
          break;
      }
    },
    async getSpeech() {
      let { data } = await getSpeechList();
      this.speechList = data;
    },

    handleAdd(type) {
      this.$router.push({ name: "editArticle", params: { type } });
    },
    handleLook(row) {
      let id = row.id;
      this.$router.push({ path: "/detail/" + id });
    },
    handleEdit({ id }, type) {
      this.$router.push({ name: "editArticle", params: { id, type } });
    },
    handleDelect(row) {
      let id = row.id;
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: `文章删除成功!`,
          });
          // 发起删除的网络请求
          this.$http
            .post("/api/article/delete", {
              article_id: id,
            })
            .then((res) => {
              if (res.data.code === 0) {
                //发起删除请求操作
                this.$message({
                  type: "success",
                  message: `${id}文章删除成功!`,
                });
                setTimeout(() => {
                  location.reload();
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
    async getMyBlogList() {
      let { data } = await getMyArticleList()
      this.articleList = data;
    },
  },
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    },
    grade() {
      return sessionStorage.getItem("grade");
    },
  },
  created() {
    this.getMyBlogList();
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 30px 0;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
}
.article {
  .addBtn {
    float: right;
    margin-bottom: 20px;
  }
}
/deep/ .el-table {
  .cell {
    text-align: center;
  }
}
</style>
