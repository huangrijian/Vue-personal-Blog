<template>
  <div class="body">
    <section class="center">
      <article>
        <h1 class="header">
          404</h1>
        <p class="error">
          ERROR</p>
      </article>
      <article>
      </article>
      <article>
        <p>抱歉，找不到和【{{searchTit}}】相关的文章，请重新输入</p>
      </article>
      <article class="searchBox">
        <input type="text" v-model="inputVal" class="srchFld" placeholder="兄die，换一个关键词试试？" required />
        <button class="srchBtn" @click="SearchWord">
          Search</button>
      </article>
      <article>
        <h3>
          我建议您</h3>
        <ul>
          <li>
            <router-link to="/">回到首页</router-link>
          </li>
          <li><a target="_blank" :href="`https://www.baidu.com/s?wd=${searchTit}`">百度一下</a></li>
          <li>
            <article class="searchBox">
              <input type="text" v-model="inputValBaidu" class="srchFld" placeholder="兄die，换一个关键词试试？" required />
              <button class="srchBtn baiduBtn" @click="baiduSearchWord">
                百度一下</button>
            </article>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script>
import { searchArticle, getAllArticle, searchCount } from '@/network/article'
export default {
  props: {
    searchTit: {
      type: String
    }
  },
  data() {
    return {
      inputVal: null,
      inputValBaidu: null
    }
  },
  methods: {
    async SearchWord() {
      let { count } = await searchCount(this.inputVal);

      let { result } = await searchArticle(this.inputVal);
      // 将结果存储至vuex
      this.$store.commit("setSearchRes", result);
      this.$store.commit("setSearchResCount", count);
      this.$router.push({ name: 'Lists', query: { keyword: this.inputVal } });
      this.inputVal = null
    },

    baiduSearchWord() {
      window.open(`https://www.baidu.com/s?wd=${this.inputValBaidu}`);
    }
  },
  created() {
    this.inputValBaidu = this.searchTit
  }
}
</script>

<style lang="scss" scoped>
.body {
  background-color: #0a7189;
  color: #fff;
  font: 100% "Lato", sans-serif;
  font-size: 1.8rem;
  font-weight: 300;
}

a {
  color: #75c6d9;
  text-decoration: none;
}

h3 {
  margin-bottom: 1%;
  margin: 10px 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 10px;
  line-height: 50px;
}

li a:hover {
  color: #fff;
}

.searchBox {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center {
  text-align: center;
}

/* Search Bar Styling */
form > * {
  vertical-align: middle;
}

.srchBtn {
  border: 0;
  border-radius: 7px;
  padding: 0 17px;
  background: #e74c3c;
  border-bottom: 5px solid #c0392b;
  color: #fff;
  height: 65px;
  font-size: 1.5rem;
  cursor: pointer;
}

.baiduBtn.baiduBtn {
  background: #4e6ef2;
  border-bottom: 5px solid #4e6ef2;
}

.srchBtn:active {
  border-bottom: 0px solid #c0392b;
}

.srchFld {
  border: 0;
  border-radius: 7px;
  padding: 0 17px;
  max-width: 404px;
  width: 40%;
  border-bottom: 5px solid #bdc3c7;
  height: 60px;
  color: #7f8c8d;
  font-size: 19px;
}

.srchFld:focus {
  outline-color: rgba(255, 255, 255, 0);
}

/* 404 Styling */
.header {
  font-size: 13rem;
  font-weight: 700;
  margin: 2% 0 2% 0;
  text-shadow: 0px 3px 0px #7f8c8d;
}

/* Error Styling */
.error {
  margin: -70px 0 2% 0;
  font-size: 7.4rem;
  text-shadow: 0px 3px 0px #7f8c8d;
  font-weight: 100;
}
</style>