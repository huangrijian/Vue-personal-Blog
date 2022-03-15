<template>
  <div>
    <!-- pc端导航 -->
    <header>
      <div class="wrapper">
        <el-row>
          <el-col :span="4">
            <div class="logo threed">黄先森博客站</div>
          </el-col>

          <el-col :span="14">
            <!-- 导航菜单 -->
            <el-menu mode="horizontal" :default-active="activeIndex" @select="handleSelect" background-color="#2d2d2d" text-color="#9d9d9d" active-text-color="#fff" class="nav" router>
              <el-menu-item index="/">
                <router-link to="/"><i class="iconfont My-new-iconshouye"></i>博客首页</router-link>
              </el-menu-item>
              <el-menu-item index="/Lists">
                <router-link to="/Lists"><i class="iconfont My-new-iconzixun"></i>技术博文</router-link>
              </el-menu-item>
              <el-menu-item index="/timeLocus">
                <router-link to="/timeLocus"><i class="iconfont My-new-icondaojishi"></i>时间轨迹</router-link>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">更多</template>
                <el-menu-item index="/recommend">
                  <router-link to="/recommend"><i class="iconfont My-new-icondianzan"></i>博客推荐</router-link>
                </el-menu-item>
                <el-menu-item index="/aboutMe">
                  <router-link to="/aboutMe"><i class="iconfont My-new-iconwode1"></i>关于我</router-link>
                </el-menu-item>
                <el-menu-item index="/article" v-if="isSignIn === 1 && grade <= 2 ">
                  <router-link to="/article">后台管理</router-link>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="/photoWall">
                <router-link to="/photoWall"><i class="iconfont My-new-iconbianji"></i>图片墙</router-link>
              </el-menu-item>
              <el-menu-item index="/LeaveWord">
                <router-link to="/LeaveWord"><i class="iconfont My-new-iconbianji"></i>留言</router-link>
              </el-menu-item>
              <el-menu-item index="/personal">
                <router-link to="/personal" v-if="isSignIn === 1 "><span class="nickname">{{UserInfo.nickname}}</span>,欢迎您</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="6">
            <Search />
          </el-col>
        </el-row>
      </div>
    </header>
    <div id="mobileNav">
      <!-- 移动端导航 -->
      <el-row class="tac">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span class="logotit">黄先森个人博客站</span>
              <span v-if="UserInfo.nickname">{{UserInfo.nickname}},欢迎您</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/" @click="Goto"><i class="iconfont My-new-iconshouye"></i>博客首页</el-menu-item>
              <el-menu-item index="/Lists" @click="Goto"><i class="iconfont My-new-iconzixun"></i>技术博文</el-menu-item>
              <el-menu-item index="/timeLocus" @click="Goto"><i class="iconfont My-new-icondaojishi"></i>时间轨迹</el-menu-item>
              <el-menu-item index="/recommend" @click="Goto"><i class="iconfont My-new-icondianzan"></i>博客推荐</el-menu-item>
              <el-menu-item index="/aboutMe" @click="Goto"><i class="iconfont My-new-iconwode1"></i>关于我</el-menu-item>
              <el-menu-item index="/LeaveWord" @click="Goto"><i class="iconfont My-new-iconbianji"></i>留言</el-menu-item>
              <el-menu-item index="/personal" v-if="UserInfo.nickname" @click="Goto"><i class="iconfont My-new-iconwode1"></i>{{UserInfo.nickname}}的个人中心</el-menu-item>
              <el-menu-item index="/login" v-else @click="Goto">登录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-row>
    </div>

  </div>

</template>

<script>
import Search from './search/index.vue';
import { getUserInfo } from '@/network/users'
export default {
  data() {
    return {
      activeIndex: '1',
      UserInfo: {},
      grade: 3,
      nickname: ''
    }
  },
  components: {
    Search
  },
  methods: {
    // 修改当前活跃
    handleSelect(index) {
      this.activeIndex = index + ''
    },
    // 获取用户信息
    async GetInfo() {
      console.log(this.$store.state.isSignIn)
      if (this.$store.state.isSignIn === 0) return;
      let { data } = await getUserInfo();
      this.UserInfo = data
      this.nickname = data.nickname
      this.grade = data.grade
      let avatar = data.head_img
      //  获取用户昵称保存在 sessionStorage
      sessionStorage.setItem("avatar", avatar);
      sessionStorage.setItem("grade", this.grade);
      sessionStorage.setItem("nickname", this.nickname);
    },
    // 移动端导航
    handleOpen(key, keyPath, index) {
      console.log(key, keyPath);
      console.log(index);
    },
    handleClose(key, keyPath, index) {
      console.log(key, keyPath);
      console.log(index);
    },
    Goto() {
      let but = document.querySelector('.el-submenu__title');
      but.click();
    }
  },
  computed: {
    isSignIn() {
      return this.$store.state.isSignIn;
    }
  },
  created() {
    this.GetInfo();
  }

}
</script>

<style lang="scss" scoped>
.el-row {
  background-color: #2d2d2d;
  display: flex;
  align-items: center;
}
header {
  background-color: #2d2d2d;
  box-shadow: 1px 1px 1px 1px rgb(41, 40, 40);
  .logo {
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .nav {
    float: right;
    li {
      padding: 0;
    }
    a {
      padding: 20px;
      .iconfont {
        color: #fff;
        // 垂直居中
        vertical-align: top;
        margin: 0 5px 0 0;
      }
    }
    .login {
      background: rgb(19, 167, 226);
      color: #fff;
    }
  }
  .nickname {
    display: inline-block;
    max-width: 45px;
    white-space: nowrap; /*文本不换行*/
    text-overflow: ellipsis; /*设置超出部分显示...*/
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
}

i {
  margin-right: 8px;
}

.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
</style>