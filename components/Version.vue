<template>
  <div class="version-bar" v-if="$store.state.isDev">
    Current version: {{ version }}
  </div>
</template>

<script>
  export default {
    name: "Version",

    data() {
      return {
        version: 'Fetching version...'
      }
    },

    async mounted() {
      try {
        const { version } = await this.$axios.$get('/api/version', { baseURL: '/' });
        this.version = version;
      }
      catch (e) {
        this.version = 'Unable to get version';
      }
    }
  }
</script>

<style scoped>
  .version-bar {
    background-color: #8C58FF;
    color: white;
    text-align: center;
  }
</style>
