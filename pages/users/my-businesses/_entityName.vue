<template>
  <nuxt-child></nuxt-child>
</template>

<script>
  export default {
    validate({ params }) {
      return true;
      const types = [
        'restaurants',
        'museums',
        'hotels',
        'shopping-stores',
        'airlines'
      ];

      return types.includes(params.entityName)
    }
  }
</script>

<style scoped>

</style>
