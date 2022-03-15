<template>
  <div class="wrapper wow slideInLeft">
    <div class="content">
      <el-form ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
        <el-form-item label="昵称">
          <el-input v-model="nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload class="avatar-uploader" :action="`${baseUrl}api/article/upload`" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="head_img">
            <img :src="imageUrl" class="avatar" />
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="exit">退出登录</el-button>
          <el-button v-if="grade === '3'" :style="{ marginTop: '10px' }" @click="upgrade">申请成为管理员</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import Cookie from "js-cookie";
import { baseUrl } from '@/config/config'
import { getUserInfo, updateUser, updateGrade } from '@/network/users'
export default {
  data() {
    return {
      form: {
        nickname: "",
      },
      imageUrl: "",
      nickname: "",
      username: "",
      grade: sessionStorage.getItem("grade"),
      baseUrl: baseUrl
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
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
    exit() {
      // 清除Cookie
      Cookie.set("token", "");
      // 清除sessionStorage
      sessionStorage.clear();
      this.$router.push({ path: "/" });
      location.reload();
    },
    // 获取用户信息
    async GetInfo() {
      let { data } = await getUserInfo()
      //  获取用户头像地址
      this.nickname = data.nickname;
      this.imageUrl = data.head_img;
      this.username = data.username;
    },
    // 更新用户信息
    async onSubmit() {
      let data = {
        nickname: this.nickname,
        head_img: this.imageUrl,
      }
      try {
        await updateUser(data)
        this.$message({
          message: '更新成功',
          type: 'success'
        });
      } catch (error) {
        this.$message({
          message: JSON.stringify(error),
          type: 'warning'
        });
      }
    },

    async upgrade() {
      let data = {
        username: this.username,
        is_apply: 1,
      }
      let { code } = await updateGrade(data);
      if (code === 200) {
        this.$message({
          message: "已向站长发起申请，请耐心等待",
          type: "success",
          offset: 70,
        });
      } else {
        this.$message({
          showClose: true,
          message: "未知错误，请重新发送",
          offset: 70,
          type: "error",
        });
      }
    },
  },
  created() {
    this.GetInfo();
    console.log(this.defaultAvatar);
  },
  mounted() {
    let wow = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 30%;
  margin: 5% auto;
  color: #fff !important;
}

/deep/.el-form-item__label {
  font-size: 14px;
  color: #fff !important;
}
// 头像
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader-icon:hover {
  border-color: #ffffff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
