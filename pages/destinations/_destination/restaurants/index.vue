<template>
  <main id="main" class="site-main">
    <header class="page-header container">
      <h1>Restaurants in {{ destination.title }}</h1>
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
              <RestaurantItem v-for="(item,index) in items" :item="item" :index="index" :key="item.id"></RestaurantItem>
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
  import RestaurantItem from '@/components/destinations/entities/RestaurantItem';
  import { mapState, mapActions } from 'vuex';

  const entityName = 'restaurants';
  export default {
    name: "DestinationRestaurants",

    watchQuery: ['query', 'sortBy', 'page'],

    scrollToTop: true,

    components: {
      [sidebar.name]: sidebar,
      [ads.name]: ads,
      [actions.name]: actions,
      RestaurantItem
    },

    computed: {
      ...mapState(entityName, {
        items: state => state.list,
        // meta: state => state.meta,
      }),

      ...mapState('destinations', {
        destination: state => state.model,
      }),
    },

    async fetch({ store, params, query }) {
      await store.dispatch(`${entityName}/index`,
        {
          destination: params.destination,
          params: { page: query.page, sortBy: query.sortBy, query: query.query }
        });
    }
  }
</script>

<style scoped>

</style>
