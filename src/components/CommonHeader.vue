<template>
    <header>
      <div class="wrapper">
        <el-row>
          <el-col :span="4">
            <div class="logo">阿健博客</div>
          </el-col>
          <el-col :span="20">
            <!-- 导航菜单 -->
            <el-menu mode="horizontal" 
            :default-active="activeIndex" 
            @select="handleSelect"
            background-color="#2d2d2d"
            text-color="#9d9d9d"
            active-text-color="#fff"
            class="nav"
            >
              <el-menu-item index="1" >
                 <router-link to="/"><i class="iconfont icon-home"></i>博客首页</router-link>
              </el-menu-item>
              <el-menu-item index="2" >
                 <router-link to="/Lists"><i class="iconfont icon-home"></i>技术博文</router-link>
              </el-menu-item>
              <el-menu-item index="3" >
                 <router-link to="/timeLocus"><i class="iconfont icon-home"></i>时间轨迹</router-link>
              </el-menu-item>
              <el-menu-item index="4" >
                 <router-link to="/recommend"><i class="iconfont icon-home"></i>博客推荐</router-link>
              </el-menu-item>
              <el-menu-item index="5" >
                 <router-link to="/aboutMe"><i class="iconfont icon-home"></i>关于我</router-link>
              </el-menu-item>
              <el-menu-item index="6" >
                 <router-link to="/"><i class="iconfont icon-home"></i>留言</router-link>
              </el-menu-item>
              <el-menu-item index="7">
                 <router-link to="/article" v-if="isSignIn === 1">我的博客</router-link>
              </el-menu-item>
              <!-- <el-menu-item index="8" >
                 <router-link to="/login" v-if="isSignIn === 0" class="login">登录</router-link>
              </el-menu-item> -->
               <el-menu-item index="8" >
                 <router-link to="/personal"  v-if="isSignIn === 1"  class="login">{{UserInfo.nickname}},欢迎回来</router-link>
              </el-menu-item>
            </el-menu>
            
          </el-col>
        </el-row>
      </div>

    </header>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex:'1',
        UserInfo:{}
      }
    },
    methods: {
      // 修改当前活跃
        handleSelect(index) {
          this.activeIndex = index + ''
        },
      // 获取用户信息
      GetInfo(){
         this.$http.get('/api/users/info').then( (res) => {
           console.log(res);
           this.UserInfo = res.data.data
           console.log(this.UserInfo);
         })
      }
    },
    computed:{
      isSignIn(){
        return this.$store.state.isSignIn;
      }
    },
    created(){
      this.GetInfo();
    }

  }
</script>

<style lang="scss" scoped>
.el-row {
  background-color:#2d2d2d
}
header {
  background-color:#2d2d2d;
  box-shadow: 1px 1px 1px 1px rgb(41, 40, 40);
  .logo {
  font-size: 18px;
  color: #fff;
  text-align: center;
  line-height: 60px;
  }
  .nav {
    float:right;
    li {
      padding: 0;
    }
    a {
      padding: 20px;
      .iconfont {
        // 垂直居中
        vertical-align: top;
        margin: 0 5px 0 0 ;
      }
    }
    .login {
      background: rgb(19, 167, 226);
      color: #fff;
    }
  }
}




.el-menu.el-menu--horizontal {
   border-bottom: 0
}

</style>