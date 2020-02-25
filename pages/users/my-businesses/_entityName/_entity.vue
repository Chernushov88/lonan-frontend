<template>
  <nuxt-child></nuxt-child>
</template>

<script>
  export default {
    async validate({ store, params }) {
      await store.dispatch(`${params.entityName}/show`,
        { route_key: params.entity, params: { relations: ['amenities'] } })

      return Boolean(store.state[params.entityName].model)
    }
  }
</script>

<style scoped>

</style>
