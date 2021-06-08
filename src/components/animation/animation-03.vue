<template>
  <div class="wow slideInLeft">
    <!-- 标题 -->
    <h2>制作动感表单效果</h2>
    <!-- 效果 -->
    <div class="container">
      <div class="form-item">
        <input type="text" placeholder="请输入账号">
      </div>
      <div class="form-item">
        <input type="password" placeholder="请输入密码">
      </div>
    </div>
    <!-- 代码块 -->
    <mavon-editor v-model="content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          codeStyle="atom-one-dark"
          :boxShadow="false"
     >
    </mavon-editor>

  </div>
</template>

<script>
  export default {
     data() {
      return {
        content:`null`
      }
    }
  }
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
  text-align: center;
  margin: 50px;
}
.container {
  border: 5px solid rgb(126, 124, 124);
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-item {
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .form-item input {
    border-radius:5px ;
    border: none;
    outline: none;
    background: #ecf0f1;
    padding: 15px;
  }
  .form-item::before {
    content: '';
    position: absolute;
    left: 0;
    height: 2px;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to right,white,#3498db,#1abc9c,
    #8e44ad,#e67e22,#e74c,white);
    transform: translateX(-100%);
    transition: 1s;
  }
  .form-item:hover::before {
    transform: translateX(100%);
  }
}

</style>