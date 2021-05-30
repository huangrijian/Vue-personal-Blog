<template>
  <div class="personalDetails" id="introduction">
     <!-- 个人简介 -->
             <div class="block">
              <h2>黄先森个人简介</h2>
              <div>
                <p><i class="iconfont My-new-iconzhiye"></i>职业：大三学生、前端学习者</p>
                <p><i class="iconfont My-new-icondingwei1"></i>现居：广东省广州市</p>
                <p><i class="iconfont My-new-iconyouxiang"></i>Email:923691372@qq.com</p>
              </div>
              <div>
                <ul class="buttonBox">
                  <li class="item">
                    <a href="javascript:;" title="个人微信号" class="item-wx"></a>
                    <img class="pic" src="~@/assets/img/wx.jpg" alt="">
                  </li>
                   <li class="item">
                    <a href="javascript:;" title="个人邮箱：linsanity9236@163.com" class="item-e-mail"></a>
                  </li>
                  <li class="item">
                    <a href="https://gitee.com/huang-rijian" title="gitee主页" target="_blank" class="item-git"></a>
                  </li>
                  <li class="item">
                    <a href="javascript:;" title="个人企鹅号" class="item-qq"></a>
                    <img class="pic" src="~@/assets/img/myqq.jpg" alt="">
                  </li>
                </ul>
                <p class="threed">黄先森个人博客站</p>
              </div>
            </div> 
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
 // 个人简介
    .block {
      height: 100%;
      background-color: rgb(78, 78, 78);
      h2 {
        padding-bottom: 10px;
        color: rgb(214, 211, 211);
      }
      p {
        margin: 10px 0;
        font-size: 14px;
        color: aliceblue;
      }
    }

.buttonBox {
  display: flex;
  margin: 20px 0 ;
  .item {
    margin: 0 5px;
    cursor:pointer;
    position: relative;
    a {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: aliceblue;
    }
    .item-e-mail {
      background: url('~@/assets/img/e-mail.png') no-repeat;
      background-position: 9px 9px;
      background-size: 65%;
      background-color: #fff;
    }
    .item-wx {
      background: url('~@/assets/img/wxx.png') no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    .item-git {
      background: url('~@/assets/img/git.png') no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    .item-qq {
      background: url('~@/assets/img/qq.png') no-repeat;
      background-position: 5px 5px;
      background-size: 80%;
      background-color: #fff;
    }
    img {
      width: 60px;
      transition: all 0.5s;
      opacity: 0;
      position: absolute;
      top: -70px;
      left: -5px;
    }
  }
}

// 鼠标悬浮，显示图片
 .buttonBox .item a:hover {
   box-shadow: 0 0 15px rgb(255, 255, 255);
 }
 .buttonBox .item:hover .pic {
    opacity: 1;
    box-shadow: 0 0 6px rgb(255, 255, 255);
}

.iconfont {
  margin-right: 5px;
}

</style>