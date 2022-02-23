<template>
  <div>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="nickname" label="昵称" width="180" />
        <el-table-column prop="grade" label="权限" />
        <el-table-column prop="is_apply" label="是否申请管理员" />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-select v-model="form.grade" placeholder="请选择活动区域">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="普通用户" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >取消</el-button
        >
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        username: "",
        nickname: "",
        grade: 3,
      },
      tableData: [],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.dialogVisible = true;
      this.form = row;
    },
    GetInfoList() {
      this.$http.get("/api/users/infoList").then(({ data: { data } }) => {
        console.log("res", data);
        this.tableData = data;
      });
    },
    async onSubmit() {
      console.log("数据", this.form);
      await this.$http.post("/api/users/authority", { form: this.form });
      this.dialogVisible = false;
    },
  },
  created() {
    this.GetInfoList();
  },
  mounted() {
    this.$animation();
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
};
</script>

<style lang="scss" scoped></style>
