<template>
  <div>
    <el-upload
      :action="`${baseUrl}api/article/upload`"
      list-type="picture-card"
      class="photoWall"
      :on-change="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :file-list="list"
      name="head_img"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <div class="timeDescribe">2022/1/24</div>
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
          <div class="title">
            <p @click="editDescribe(file.title, file.uid)">
              {{ file.title || '添加描述'}}
            </p>
          </div>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="37%" class="hrj-dialog">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible02"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible02 = false">取 消</el-button>
        <el-button type="primary" @click="changeTitle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from "@/config/config";
export default {
  name: "photoWall",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      list: [],
      response: {},
      baseUrl: baseUrl,
      dialogVisible02: false,
      input: "",
    };
  },
  mounted() {
    this.getPhoto();
    this.examine();
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleAvatarSuccess(response, fileList) {
      if (response.status === "success") {
        let { name, percentage, size, status, uid } = response;
        let b = {
          name,
          percentage,
          size,
          status,
          uid,
          url: response.response.data,
        };
        this.list.push(b);
        this.savePhoto(b);
      }
    },
    examine() {
      console.log(sessionStorage.getItem("grade"));
      if (sessionStorage.getItem("grade") !== "1") {
        let add = document.querySelector(".el-upload--picture-card");
        add.style.display = "none";
      }
    },
    async savePhoto(response) {
      await this.$http.post("/api/photoWall/savePhoto", { response });
    },
    async getPhoto() {
      let res = await this.$http.get("/api/photoWall/getPhoto");
      this.list = res.data.data;
      console.log(res);
    },
    editDescribe(title, uid) {
      if (sessionStorage.getItem("grade") === "1") {
        this.input = title;
        this.uid = uid;
        this.dialogVisible02 = true;
      }
    },
    async changeTitle() {
      // 修改服务器里的title
      await this.$http.post("/api/photoWall/changeTitle", {
        uid: this.uid,
        title: this.input,
      });
      // 修改前端显示的title
      this.changeCurrentTitle();
      this.dialogVisible02 = false;
    },
    changeCurrentTitle() {
       this.list.forEach((item, index, arr) => {
        if(item.uid === this.uid) {
          arr[index].title = this.input
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 600;
}
.content {
  margin: 20px 0;
}
.title {
  position: absolute;
  width: 100%;
  bottom: 10px;
  word-break: break-all;
}
.timeDescribe {
  position: absolute;
  top: 0;
  left: 95px;
  width: 100%;
}
</style>
