<template>
  <div class="list">
    <div class="card">
      <router-link :to="'/detail/'+article_id">
        <p class="title">{{title}}</p>
      </router-link>
      <p class="date">{{create_time}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props:['title','create_time','article_id'],
    data() {
      return {
        
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
.card {
  padding-bottom: 20px;
  margin-top: 10px;
  border-bottom:1px solid rgb(228, 226, 226);
  .title {
    color: #0085a1;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .date {
    font-size: 14px;
    color: rgb(139, 139, 139);
  }
}
</style>