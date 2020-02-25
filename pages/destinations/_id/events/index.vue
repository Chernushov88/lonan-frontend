<template>
  <main id="main" class="site-main">
    <header class="page-header container">
      <h1>Events in {{ destination.title }}</h1>
      <div class="sub-title">Showing {{ meta.total }} properties</div>
    </header>

    <div class="page-content">
      <div class="container">

        <!-- Actions -->
        <Actions :ratingSorting="false">
          <div class="col-6 col-lg-auto col-date">
            <div class="form-group">
              <label for="category-select">Event category:</label>
              <select name="day"
                      @change="({target}) => {this.$router.push({path: $route.path, query: {...$route.query, category: target.value}})}"
                      id="category-select"
                      class="form-control form-control-md"
                      v-model="filters.category">
                <option :value="null">Any</option>
                <option v-for="eventCategory in eventCategories"
                        v-text="eventCategory.title"
                        :value="eventCategory.id"></option>
              </select>
            </div>
          </div>
          <div class="col-6 col-lg-auto col-date">
            <div class="form-group">
              <label for="day-select">Event starting on:</label>
              <select name="day"
                      id="day-select"
                      class="form-control form-control-md"
                      @change="({target}) => {this.$router.push({path: $route.path, query: {...$route.query, day: target.value}})}"
                      v-model="filters.day">
                <option :value="null">Any Day</option>
                <option value="0">Monday</option>
                <option value="1">Tuesday</option>
                <option value="2">Wednesday</option>
                <option value="3">Thursday</option>
                <option value="4">Friday</option>
                <option value="5">Saturday</option>
                <option value="6">Sunday</option>
              </select>
            </div>
          </div>
        </Actions>


        <!-- Content -->
        <div class="dest-row row flex-lg-nowrap align-items-start">

          <!-- menu -->
          <Sidebar/>

          <!-- list -->
          <div class="section-items">
            <ul class="items items--list items--hotels">
              <li class="item" :class="{'item--favored': item.is_liked}" v-for="(item, index) in items">
                <div class="item-wrap">
                  <button @click="toggleFavorite(item, index)"
                          type="button"
                          class="item-favorite"
                          title="Add to favorites">
                    <span class="sr-only">Add to favorites</span>
                  </button>
                  <nuxt-link :to="localePath({name: 'destinations-id-events-entity', params: {...$route.params, entity: item.id}})"
                               class="item-img">
                    <img :src="item.cover"
                         width="530"
                         height="320"
                         :title="item.title"
                         :alt="item.title">
                  </nuxt-link>
                  <div class="item-body">
                    <h4 class="item-title"><nuxt-link :to="localePath({name: 'destinations-id-events-entity', params: {...$route.params, entity: item.id}})" v-text="item.title"></nuxt-link></h4>
                    <div class="item-metas item-metas--top">
                      <div class="item-meta item-meta-name">{{ formatDate(item.started_at) }}
                      </div>
                    </div>
                    <div class="item-content">{{ item.description | limit}}</div>
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
  import { mapState, mapActions } from 'vuex';

  const entityName = 'events';
  export default {
    name: "DestinationEvents",

    watchQuery: ['query', 'sortBy', 'page', 'category', 'day'],

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

    data() {
      return {
        filters: {
          category: this.$route.query.category || null,
          day: this.$route.query.day || null,
        }
      }
    },

    computed: {
      ...mapState(entityName, {
        items: state => state.list,
        meta: state => state.meta,
      }),

      ...mapState('destinations', {
        destination: state => state.model,
      }),

      ...mapState('event-categories', {
        eventCategories: state => state.list,
      }),
    },

    methods: {
      formatDate(value) {
        return this.$moment(value).format("MMMM Do YYYY, h:mm:ss");
      },

      avgToPercents(avg) {
        return (100 * avg) / 5;
      },

      ...mapActions(entityName, ['favorite', 'unfavorite']),

      toggleFavorite(model, index) {
        if (model.is_liked) {
          this.unfavorite({ model, silent: true });
        } else {
          this.favorite({ model, silent: true });
        }

        model.is_liked = !model.is_liked;
      },
    },

    async fetch({ store, params, query }) {
      await store.dispatch('event-categories/index');
      await store.dispatch(`${entityName}/index`,
        {
          destination: params.id,
          params: {
            page: query.page,
            sortBy: query.sortBy,
            query: query.query,
            category: query.category,
            day: query.day,
          }
        });
    }
  }
</script>

<style scoped>

</style>
