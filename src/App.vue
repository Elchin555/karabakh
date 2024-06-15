<template>
  <div>
    <Header v-if="showHeader" />
    <div class="md:pt-20 flex flex-col h-screen ">
      <router-view class="" />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  computed: {
    showHeader() {
      return this.$route.meta.showHeader !== false;
    },

  },
};
</script>