<template>
  <div>
    <div>
      <transition name="fade">
        <div id="preload" class="preload-page">
          <p>Authorizing Account</p>
        </div>
      </transition>
    </div>
    <div>
      <h3 v-text="error"/>
      <p v-text="error_description"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OAuthLoading",
    async asyncData({ query }) {
      const { error, error_description } = query;
      return {
        error,
        error_description
      }
    }

  }
</script>

<style scoped>
  .fade-enter-active {
    transition: all 1.5s ease;
  }
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
