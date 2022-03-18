<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
    <div class="edit_title">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <!-- 分类 -->
    <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    <!-- 上传封面 -->
    <div>
      <el-upload class="avatar-uploader" :action="`${baseUrl}api/article/upload`" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="head_img">
        <img :src="imageUrl ? imageUrl : defaultAvatar" class="avatar" />
      </el-upload>
    </div>
    <!-- 文章内容 -->
    <div class="edit_title">文章内容 (Markdown编辑器)</div>
    <div class="markdown">
      <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" />
    </div>
    <div class="save_btn">
      <el-button type="primary" @click="save">保存</el-button>
      <!-- <el-button type="primary" v-if="grade === '1'" @click="save(1)"
        >保存为生活说说</el-button
      > -->
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/config/config";
import { uploadPhoto } from '@/network/article';

export default {
  data() {
    return {
      title: "",
      content: "",
      baseUrl: baseUrl,
      class01: "",
      class02: "",
      class03: "",

      classid_01: "",
      classid_02: "",
      classid_03: "",

      imageUrl: "",
      defaultAvatar: require("@/assets/img/avatar.jpg"),

      grade: sessionStorage.getItem("grade"),

      dynamicTags: [],
      inputVisible: false,
      inputValue: "",

      id: this.$route.params.id,
      type: this.$route.params.type,
    };
  },
  methods: {
    // 封面上传相关方法
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
    },
    save2() {
      console.log("dynamicTags", this.dynamicTags);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    goBack() {
      this.$router.go(-1);
    },
    save() {
      console.log(this.$route.params);
      if (this.$route.params.id) {
        //  如果是编辑保存，则发起更新请求
        let data = {
          title: this.title,
          content: this.content,
          article_id: this.$route.params.id,

          classify: this.dynamicTags,

          pic_url: this.imageUrl,
        };
        this.$http.post(`/api/${this.type}/update`, data).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({ name: "article" });
          }
        });
      } else {
        //  如果是新增保存，则发起新增请求
        let data = {
          title: this.title,
          content: this.content,
          pic_url: this.imageUrl,
          classify: this.dynamicTags,
        };
        this.$http.post(`/api/${this.type}/addArticle`, data).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({ name: "article" });
          }
        });
      }
    },
    //  获取文章详情
    getDetail() {
      this.$http
        .get(`/api/${this.type}/detail`, { params: { article_id: this.id } })
        .then((res) => {
          if (res.data.code === 0) {
            this.title = res.data.data.title;
            this.content = res.data.data.content;
            // 获取文章封面pic_url:this.imageUrl
            this.imageUrl = res.data.data.pic_url;
            this.dynamicTags = res.data.data.classify;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      console.log(tag);
      this.$http
        .post("/api/article/deleteClassify", {
          article_id: this.$route.params.id,
          classifyName: tag,
        })
        .then((res) => {
          console.log("res", res);
        });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("head_img", $file);
      let { data } = await uploadPhoto({
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      })
      this.$refs.md.$img2Url(pos, data.replace(/\\/g, "/"));//将url进行替换
    },
  },
  created() {
    if (this.id) this.getDetail();
  },
};
</script>

<style lang="scss" scoped>
.edit_wrap {
  margin: 30px auto;
  background: #fff;
  padding: 40px;
  font-size: 16px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    margin: 20px 0;
    font-weight: 700;
  }
  .save_btn {
    margin: 40px 0;
  }
}

.classify {
  margin: 30px 0px;
  display: flex;
  .el-input {
    margin: 0 10px 0 0;
    width: 10%;
  }
}

// 封面
.avatar {
  width: 200px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
