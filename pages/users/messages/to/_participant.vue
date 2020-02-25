<template>

</template>

<script>
  export default {
    name: "UserConversationMessageTo",

    async validate({ params, store, redirect }) {
      try {
        const { data } = await store.dispatch('user-conversations/startConversation', params.participant);

        redirect(`/users/messages/${data.route_key}`);
      }
      catch (e) {
        return false;
      }
    }
  }
</script>

<style scoped>

</style>
