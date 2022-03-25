<template>
  <div class="search">
    <input maxlength="16" @focus="onFocus" @blur="onBlur" v-model="inputVal" autocomplete="off" placeholder="请输入关键字..." name="s" class="input" type="text">
    <button type="submit" class="submit" @click="SearchWord">搜索</button>
    <transition name="el-fade-in-linear">
      <div v-show="show" class="transition-box">
        <SearchItem :key="index" v-for="(item,index) in dataArr" :id="item.id" :index="index" :title="item.title" :like_count="item.like_count" @click.native="handle(item.id)" />
      </div>
    </transition>
  </div>
</template>

<script>
import SearchItem from './searchItem.vue';
import axios from 'axios';
import { searchArticle, getAllArticle, searchCount } from '@/network/article'
let debounce = (fn, time = 1000) => {
  let timeLock = null
  return function (...args) {
    clearTimeout(timeLock)
    timeLock = setTimeout(() => {
      fn(...args)
    }, time)
  }
}
let getKeyWordArr = async (newVal, vueThis) => {
  let { result } = await searchArticle(newVal);
  vueThis.dataArr = result.map(({ id, title, like_count }) => {
    return { id, title, like_count }
  })

}
let myDebounce = debounce(getKeyWordArr);
export default {
  data() {
    return {
      inputVal: null,
      show: false,
      dataArr: [],
    }
  },
  watch: {
    inputVal(newVal) {
      myDebounce(newVal, this)
    }
  },
  components: {
    SearchItem
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
    onFocus() {
      this.show = !this.show
    },
    onBlur() {
      this.show = !this.show
    },
    handle(id) {
      this.$router.push({ name: 'detail', params: { id } })
    },
    handleDataType(arr) {

      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          let temp = null;
          if (arr[j].like_count > arr[j + 1].like_count) {
            temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      return arr.reverse()
    },
    async getTypeList() {
      // 获取全部文章列表
      let { data } = await getAllArticle();
      this.dataArr = this.handleDataType(data).slice(0, 6);

    }

  },
  created() {
    this.getTypeList();
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  .input {
    width: 170px;
    height: 34px;
    border-radius: 17px 0 0 17px;
    padding-left: 15px;
    outline: none;
    background: rgb(235, 233, 233);
    border-right: none;
    border: 1px solid transparent;
    position: relative;
  }
}
.input:focus {
  background: rgb(255, 255, 255);
  border: 1px solid #409eff;
}
button {
  height: 38px;
  transform: translateY(1px);
  border: none;
  color: #fff;
  border-radius: 0 17px 17px 0;
  padding: 0 10px;
  background: #409eff;
  cursor: pointer;
}

/* 淡出动画 */
.transition-box {
  box-shadow: 0 0 10px rgb(224, 217, 217);
  margin-bottom: 10px;
  width: 235px;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  box-sizing: border-box;
  margin-right: 20px;
  position: absolute;
  top: 50px;
  z-index: 1;
}
</style>