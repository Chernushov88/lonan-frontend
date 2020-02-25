<template>
  <main id="main" class="site-main">
    <header class="page-header container">
      <h1>Airlines in {{ destination.title }}</h1>
      <!--      <div class="sub-title">Showing {{ meta.total }} properties</div>-->
    </header>

    <div class="page-content">
      <div class="container">

        <!-- Actions -->
        <Actions/>


        <!-- Content -->
        <div class="dest-row row flex-lg-nowrap align-items-start">

          <!-- menu -->
          <Sidebar/>

          <!-- list -->
          <div class="section-items">
            <ul class="items items--list items--hotels">
              <GuessEntity v-for="(item,index) in items"
                           :item="item"
                           :index="index"
                           :key="item.id"></GuessEntity>
            </ul>
          </div>

          <Ads/>

        </div>

      </div>
    </div>


  </main>
</template>

<script>
  import { sidebar, ads, actions } from '@/components/destinations/partials';
  import GuessEntity from '@/components/destinations/entities/GuessEntity';
  import { mapState } from 'vuex';

  export default {
    name: "AllVenuesList",

    watchQuery: ['query', 'sortBy', 'page'],

    components: {
      [sidebar.name]: sidebar,
      [ads.name]: ads,
      [actions.name]: actions,
      GuessEntity
    },
    async fetch({ store, params, query }) {
      await store.dispatch(`all/index`,
        {
          destination: params.destination,
          params: { page: query.page, sortBy: query.sortBy, query: query.query }
        });
    },

    computed: {
      ...mapState('all', {
        items: state => state.list,
        meta: state => state.meta,
      }),
      ...mapState('destinations', {
        destination: state => state.model
      })
    }
  }
</script>

<style scoped>

</style>
