<template>
    <div class="edit_wrap wrapper">
       <div class="backBtn">
           <el-button @click="goBack">返回</el-button>
       </div>
       <div class="edit_title">标题</div>
       <el-input v-model="title" placeholder="请输入标题"></el-input>
       <div class="edit_title">文章内容 (Markdown编辑器)</div>
       <div class="markdown">
            <mavon-editor v-model="content"/>
       </div>
       <div class="save_btn">
           <el-button type="primary" @click="save">保存</el-button>
       </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title:'',
                content:''
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
           save(){
            //  判断当前的保存是新增保存还是编辑保存
             if(this.$route.params.id){
              //  如果是编辑保存，则发起更新请求
                let data = {
                  title:this.title,
                  content:this.content,
                  article_id:this.$route.params.id
                }
               this.$http.post('/api/article/update',data).then((res) => {
                  if(res.data.code === 0 ){
                    this.$router.push({name:'article'})
                  }
               })
             }else {
              //  如果是新增保存，则发起新增请求
               let data = {
                title:this.title,
                content:this.content
               }
               this.$http.post('/api/article/add',data).then((res) => {
                if(res.data.code === 0 ){
                  this.$router.push({name:'article'})
                }
                })
             }
           },
            getDetail() {
                this.$http.get('/api/article/detail',{
                params:{
                    article_id:this.$route.params.id
                }
                }).then(res => {
                    if(res.data.code === 0){
                        this.title = res.data.data.title
                        this.content = res.data.data.content
                    }
                }).catch(e=>{
                    console.log(e)
                })
            }
        },
        created() {
            if(this.$route.params.id){
                this.getDetail()
            }
        },
    }
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

</style>