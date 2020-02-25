<template>
  <nuxt-child></nuxt-child>
</template>

<script>
  const entityName = 'hotels';

  export default {
    async validate({ store, params }) {
      await store.dispatch(`${entityName}/show`,
        { route_key: params.entity, params: { relations: ['amenities'] } })

      return Boolean(store.state[entityName].model)
    }
  }
</script>
