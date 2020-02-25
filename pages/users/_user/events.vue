<template>
  <nuxt-child></nuxt-child>
</template>
<script>
  export default {
    async validate({ store, $auth }) {
      return store.state.users.model.id === $auth.user.id;
    }
  }
</script>
