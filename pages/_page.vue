<template>
  <main id="main" class="site-main">

    <!-- FAQ -->
    <section class="section section--boxed">
      <div class="container container-md">
        <header class="section-header">
          <h1 v-text="page.title"></h1>
        </header>
        <div class="section-content">
          <p v-text="page.content"></p>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: "Privacy",

    computed: {
      ...mapState('pages', {
        page: state => state.model
      })
    },

    async validate({ store, params }) {
      await store.dispatch('pages/show', { route_key: params.page });

      return Boolean(store.state.pages.model);
    }
  }
</script>

<style scoped>

</style>
