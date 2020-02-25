<template>
  <main id="main" class="site-main">

    <!-- FAQ -->
    <section class="section section--boxed section-faq">
      <div class="container container-md">
        <header class="section-header">
          <h1>Frequently Asked Questions</h1>
        </header>
        <div class="section-content">
          <div class="collapse">
            <FaqItem v-for="(question, key) in questions" :key="key" :question="question" :collapsed="key === 0"></FaqItem>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
  import FaqItem from '@/components/faq/Item';

  export default {
    name: "Faq",

    components: {
      FaqItem
    },

    async asyncData({ $axios }) {
      const { data } = await $axios.$get('faq');

      return {
        questions: data
      }
    }
  }
</script>

<style scoped>

</style>
