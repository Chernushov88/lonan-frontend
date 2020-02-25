<template>
  <nuxt-child/>
</template>

<script>
  export default {
    async validate({ store, params }) {
      await store.dispatch('destinations/show', { route_key: params.destination })

      return Boolean(store.state.destinations.model);
    }
  }
</script>

<style scoped>

</style>
