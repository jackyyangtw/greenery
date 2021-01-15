<template>
  <div class="message-alert">
    <!-- message 出現的原理在於 v-for 的 messgaes 預設為空陣列，此時使用 v-for 範圍的標籤模板都不會顯示出來
      只有觸發 updateMessage 才會 push 資料到 messages 裡此時 alert 才會顯示
    -->
    <div
      v-for="(item, i) in messages"
      :key="i"
      :class="'alert-' + item.status"
      class="alert alert-dismissible"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// 註解處為原本使用event bus 的寫法，現在是使用vuex的寫法
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['messages']),
  },
  methods: {
    updateMessage(message, status) {
      this.$store.dispatch('updateMessage', { message, status });
    },
    removeMessage(num) {
      this.$store.dispatch('removeMessage', num);
    },
    removeMessageWithTiming(timestamp) {
      this.$store.dispatch('removeMessageWithTiming', timestamp);
    },
  },
};
</script>

<style lang="sass" scope>
.message-alert 
  position: fixed
  max-width: 50%
  top: 56px
  right: 20px
  z-index: 1100

</style>