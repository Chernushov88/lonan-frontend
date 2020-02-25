<template>
  <main id="main" class="site-main">
    <header class="page-header container">
      <h1>Guides in {{ destination.title }}</h1>
      <div class="sub-title">Showing {{ meta.total }} properties</div>
    </header>

    <div class="page-content">
      <div class="container">

        <!-- Actions -->
        <Actions :ratingSorting="false"/>


        <!-- Content -->
        <div class="dest-row row flex-lg-nowrap align-items-start">

          <!-- menu -->
          <Sidebar/>

          <!-- list -->
          <div class="section-items">
            <ul class="items items--list items--hotels">
              <li class="item" :class="{'item--favored': item.is_liked}" v-for="item in items">
                <div class="item-wrap">
                  <button @click="toggleFavorite(item)"
                          type="button"
                          class="item-favorite"
                          title="Add to favorites">
                    <span class="sr-only">Add to favorites</span>
                  </button>
                  <nuxt-link :to="localePath({name: 'destinations-id-guides-entity', params: {...$route.params, entity: item.id}})"
                               class="item-img">
                    <img :src="item.avatar"
                         width="530"
                         height="320"
                         :title="item.name"
                         :alt="item.name">
                  </nuxt-link>
                  <div class="item-body">
                    <h4 class="item-title">
                      <nuxt-link :to="localePath({name: 'destinations-id-guides-entity', params: {...$route.params, entity: item.id}})">
                        {{ item.name }} | ${{ item.price }}/h
                      </nuxt-link>
                    </h4>
                    <div class="item-metas item-metas--top">
                      <div class="item-meta item-meta-name">City, {{ destination.country }}</div>
                    </div>
                    <div class="item-content"></div>
                    <div class="item-metas item-metas--bot">
                      <div class="item-meta rating">
                        <div class="rating-bar">
                          <div class="rating-bar-inner"
                               :style="`width: ${avgToPercents(item.avg_rating)}%;`"></div>
                        </div>
                        <div class="rating-label">{{ item.reviews_count }} Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
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
  import { mapState } from 'vuex';

  const entityName = 'guides';
  export default {
    name: "DestinationGuides",

    watchQuery: ['query', 'sortBy', 'page'],

    scrollToTop: true,

    components: {
      [sidebar.name]: sidebar,
      [ads.name]: ads,
      [actions.name]: actions,
    },

    filters: {
      limit(value) {
        return value.length > 100 ? value.substring(0, 100) + '...' : value;
      },
    },

    computed: {
      ...mapState(entityName, {
        items: state => state.list,
        meta: state => state.meta,
      }),

      ...mapState('destinations', {
        destination: state => state.model,
      }),
    },

    methods: {
      formatDate(value) {
        return this.$moment(value).format("MMMM Do YYYY, h:mm:ss");
      },

      avgToPercents(avg) {
        return (100 * avg) / 5;
      },

      toggleFavorite(item) {
        if (item.is_liked) {
          this.unfavorite(item);
        } else {
          this.favorite(item)
        }
      },

      async favorite(item) {
        if (!this.$auth.loggedIn) {
          this.$router.push({ name: 'login' });
        }

        try {
          await this.$axios.$post(`${entityName}/${item.route_key}/favorite`)
        }
        catch (e) {

        }
      },
      async unfavorite(item) {
        if (!this.$auth.loggedIn) {
          this.$router.push({ name: 'login' });
        }

        try {
          await this.$axios.$post(`${entityName}/${item.route_key}/unfavorite`)
        }
        catch (e) {

        }
      }
    },

    async fetch({ store, params, query }) {
      await store.dispatch(`${entityName}/index`,
        {
          destination: params.id,
          params: {
            page: query.page,
            sortBy: query.sortBy,
            query: query.query
          }
        });
    }
  }
</script>

<style scoped>

</style>
