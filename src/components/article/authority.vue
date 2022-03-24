<template>
  <div>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="nickname" label="昵称" width="180" />
        <el-table-column prop="grade" label="权限" />
        <el-table-column prop="is_apply" label="是否申请成为博主" />
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-select v-model="form.grade" placeholder="请选择活动区域">
            <el-option label="博主" value="博主"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfoList, setAuthority } from '@/network/users'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        username: "",
        nickname: "",
        grade: '普通用户',
        is_apply: '未申请'
      },
      tableData: [],
    };
  },
  methods: {
    handleClick(row) {
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    GetInfoList() {
      if (this.$store.state.isSignIn === 1) {
        getInfoList().then(({ data }) => {
          this.tableData = data;
        });
      }
    },
    async onSubmit() {
      let data = {
        grade: this.form.grade === '博主' ? 2 : 3,
        username: this.form.username,
      }
      await setAuthority(data);
      this.GetInfoList();
      this.dialogVisible = false;
    },
  },
  created() {
    this.GetInfoList();
  },
  mounted() {
    this.$animation();
  }
};
</script>

<style lang="scss" scoped></style>
