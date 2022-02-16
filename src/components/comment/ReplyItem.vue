<template>
  <div>
    <div class="ReplyItem" :key="indexs" v-for="(items, indexs) in ReplyItem">
      <img
        :src="items.head_img"
        alt=""
      />
      <div class="ReplyMainBox">
        <div style="display: flex; align-items: center; flexWrap: wrap">
          <span style="fontWeight: 600;">{{ items.nickname }}</span>
          <div class="master" style="color:#409eff" v-if="items.user_id === 18">站主</div>
          <span v-if="items.reply_nickname" style="margin:0 6px">@</span>
          <span style="fontWeight: 600;color: rgb(64, 158, 255);" v-if="items.reply_nickname">
            {{ items.reply_nickname }}
            <span v-if="!(items.reply_nickname)" style="fontSize:18px; color: rgb(0, 0, 0); marginRight:5px">:</span>
          </span>
          <span style="fontWeight: 600; fontSize:18px; color: rgb(0, 0, 0); marginRight:5px">:</span>
          <span style="lineHeight: 1.5;margin: 5px 0;letter-spacing: 1.5px;">{{ items.cmcontent }}</span>
        </div>
        <div style="display: flex; justifyContent: space-between; fontSize:14px">
          <span>{{ items.create_time }}</span>
          <span
            @click="
              reply(items.parent_cm_id, items.nickname, items.user_id, index)
            "
            style="color:rgb(64, 158, 255); cursor:pointer;"
          >
            &nbsp;&nbsp;&nbsp;回复
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ReplyItem: Array,
    reply: Function,
    index: Number
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.ReplyItem {
  width: 100%;
  display: flex;
  margin: 20px 0;
  font-size: 16px;
  img {
    width: 50px;
    height: 50px;
    margin-right: 12px;
    border-radius: 5px;
  }
  .ReplyMainBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    .master {
    width: 40px;
    height: 20px;
    border: 1px solid #056a99;
    border-radius: 10px;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 0 3px;
    }
  }
}
</style>
