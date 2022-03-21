<template>
  <Picker v-bind="$attrs" v-on="$listeners"></Picker>
</template>
<script>
import { Picker } from "emoji-mart-vue";
export default {
  components: {
    Picker
  }
}
</script>
