<template>
<div>
  <div class="LoginBox" v-if="status == 1">
    <div class="LoginBox-Box"> 
       <el-form :model="form" ref="form" :rules="rules" label-width="0" :inline="false" size="normal" key="1">
      <el-form-item prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
       <el-form-item prop="password">
        <el-input type="password" v-model="form.password" @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login iconfont My-new-iconxuanzhonghaoyou" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
      <el-form-item>
        <span>还没注册？去<span class="sign" @click="sign">注册</span></span>
        <span>随便看看？去<span class="sign" @click="Gohome">主页</span></span>
      </el-form-item>
    </el-form>
    </div>
   
  </div>

  <div class="register"  v-else>
    <div class="registerBox">
      <el-form :model="regform" ref="regform" :rules="regrules" label-width="0" :inline="false" size="normal" key="2">
      <el-form-item prop="regname">
        <el-input v-model="regform.regname"  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="regform.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item  prop="pass">
        <el-input type="password" placeholder="请输入密码" v-model="regform.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="checkPass">
        <el-input type="password" placeholder="请再次输入密码" v-model="regform.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login" type="primary" @click="register">注册</el-button>
      </el-form-item>
      <el-form-item>
        <p>注册完成？去<span class="sign" @click="Gotologin">登录</span></p>
        <span>随便看看？去<span class="sign" @click="Gohome">主页</span></span>
      </el-form-item>
    </el-form>
    </div>
    
  </div>
  <!-- 全屏等待加载 -->
  <div v-loading.fullscreen.lock="loading"></div>
</div>
  
</template>

<script>
  import Cookie from 'js-cookie'
  export default {
    data() {
     // 确认密码的规则
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.regform.checkPass !== '') {
            this.$refs.regform.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regform.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        loading:false,
        form:{
          name:'',
          password:''
        },
        regform:{
          regname:'',
          nickname:'',
          pass:'',
          checkPass:''
        },

        status:1,

         rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
        },

         regrules: {
          regname: [
            { required: true, message: '请输入您的用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          nickname:[
             { required: true, message: '请输入您的昵称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }

      }
    },
    methods:{
      // 注册
      register(){
        let data = {"username":this.regform.regname,"nickname":this.regform.nickname,"password":this.regform.pass};
        this.$http.post('/api/users/register',data)
        .then(res=>{
            if(res.data.code == -1 ){
               this.$message({
                message: '用户名或昵称已存在，请重新注册',
                type: 'warning'
              });
            }else {
                this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.status = 1;
            }
        })
      },
      // 去主页
      Gohome(){
        this.$router.push({name:'home'})
      },

    Gotologin(){
      this.status = 1;
    },
    sign(){
        this.status = 2;
    },

    // 登录
    onSubmit(){
        this.$refs['form'].validate((res) => {

          if(res){
            // this.loading = true;
            // 发起登录请求
             this.$http.post('/api/users/login',this.form)
             .then(res=>{
              console.log(res);
              if(res.data.code === 0 ){
                // 登录成功，去vuex里修改登录状态
                this.$store.commit('changIsSignIn',1)
                // 设置Cookie
                Cookie.set('token',res.data.token)
                // 设置vuex里的token
                this.$store.commit('setToken',res.data.token)
                console.log(this.$store.state.token);
                this.$router.push({name:'home'})
                setTimeout(() => {
                  this.loading = false
                },1000)
              }


              })

          }else {
            alert("登录失败")
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.register,
.LoginBox {
  width: 400px;
  height: 555px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  padding: 15px;
  .registerBox,
  .LoginBox-Box {
    margin-top: 30%;
  }
  .login {
    width: 100%;
  }
  .sign {
    font-size: 25px;
    color: rgb(18, 217, 243);
    font-weight: 600;
    margin-right: 15px;
  }
}

.el-input--normal {
  position: relative;
  overflow: hidden;
}
.el-input--normal::before {
    content: '';
    position: absolute;
    left: 0;
    height: 3px;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to right,white,#3498db,#1abc9c,
    #8e44ad,#e67e22,#e74c,white);
    transform: translateX(-100%);
    transition: 1s;
  }
  .el-input--normal:hover::before {
    transform: translateX(100%);
  }
</style>