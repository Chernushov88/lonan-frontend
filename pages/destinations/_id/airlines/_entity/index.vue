<template>
  <main id="main" class="site-main">

    <!-- Back to category -->
    <div class="back-to dest-back-to bg-primary">
      <div class="container">
        <nuxt-link :to="localePath({name: 'destinations-id-airlines', params: $route.params})">Back to Airlines</nuxt-link>
      </div>
    </div>

    <!-- DESTINATION MAIN -->
    <div class="section dest-main">
      <div class="container">
        <div class="row">

          <!-- Photos -->
          <div class="dest-secondary">
            <div class="item-photos">
              <div class="item-photo">
                <a href="/img/destinations/img-venue-details.png" data-fslightbox="dest-main">
                  <img :src="item.cover"
                       width="1905"
                       height="1152"
                       :title="item.title"
                       :alt="item.title">
                </a>
              </div>
            </div>
          </div>

          <!-- Main info -->
          <div class="dest-info">
            <header class="item-header">
              <h1 class="item-title" v-text="item.title"></h1>
            </header>
            <div class="item-metas item-metas--top">
              <div class="item-meta rating">
                <div class="rating-bar">
                  <div class="rating-bar-inner" :style="`width: ${avgPercents}%;`"></div>
                </div>
                <div class="rating-label">{{ item.reviews_count }} Reviews</div>
              </div>
            </div>
            <div class="item-content">
              <div class="ic-row ic-row-url">
                <a :href="item.website" target="_blank" rel="noreferrer noopener">
                  {{ item.website }}
                </a>
              </div>
            </div>
            <div class="item-metas item-metas--bot">
              <div class="item-meta item-meta-favorite">
                <a href="#favorite"
                   @click.prevent="toggleFavorite({model: item, silent: false})"><span v-if="item.is_liked">Unfavorite</span>
                  <span v-else>Favorite</span></a>
              </div>
              <div class="item-meta item-meta-share">
                <a href="#">Share</a>
              </div>
              <div class="item-meta item-meta-add-review">
                <nuxt-link :to="localePath({name: 'destinations-id-airlines-entity-review', params: $route.params})">
                  Add a review
                </nuxt-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- DESTINATION TABS -->
    <div class="section dest-tabs">
      <div class="container">

        <!-- Header -->
        <div class="tab-header">
          <ul class="tab-header-list" role="tablist">
            <li class="nav-item" :class="{active: activeSection === 'about'}">
              <a href="#about"
                 id="dest-about-tab"
                 data-toggle="pill"
                 role="tab"
                 @click.prevent="activeSection = 'about'"
                 aria-controls="dest-about"
                 aria-selected="true">Descripion/About</a>
            </li>
            <li class="nav-item" :class="{active: activeSection === 'reviews'}">
              <a href="#reviews"
                 id="dest-reviews-tab"
                 data-toggle="pill"
                 role="tab"
                 @click.prevent="activeSection = 'reviews'"
                 aria-controls="dest-reviews"
                 aria-selected="false">Reviews</a>
            </li>
          </ul>
          <select name="tab-header-select" class="form-control">
            <option value="#dest-about" selected="">Descripion/About</option>
            <option value="#dest-reviews">Reviews</option>
          </select>
        </div>

        <div class="row">

          <!-- Tabs -->
          <div class="tabs col-12 col-lg-8">

            <!-- about -->
            <section class="tab-pane" :class="{active: activeSection === 'about'}"
                     v-if="activeSection === 'about'"
                     id="dest-about"
                     role="tabpanel"
                     aria-labelledby="dest-about-tab">
              <div class="tab-wrap">
                <header>
                  <h4 class="tab-pane-title">About the {{ item.title}}</h4>
                </header>
                <div class="tab-pane-content">
                  <p v-text="item.description"></p>
                </div>
              </div>
            </section>

            <!-- reviews -->
            <section class="tab-pane" :class="{active: activeSection === 'reviews'}"
                     v-if="activeSection === 'reviews'"
                     aria-labelledby="dest-reviews-tab">
              <div class="tab-wrap">
                <header>
                  <h4 class="tab-pane-title">Reviews</h4>
                  <nuxt-link :to="localePath({name: 'destinations-id-airlines-entity-review', params: $route.params})"
                               class="btn btn-primary-dark2 ic--left ic-add">
                    <div class="ic-wrap"></div>
                    Add a Review
                  </nuxt-link>
                </header>
                <div class="tab-pane-content">
                  <ul class="reviews">
                    <ReviewItem :review="review" v-for="review in reviews" :key="review.id"/>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <!-- Aside -->
          <aside class="sidebar sidebar--right col-12 col-lg-4" role="complementary">

            <!-- map -->
            <div class="widget widget-map">
              <div class="widget-content">
                <client-only>
                  <GmapMap
                    :center="{lat: item.location.coordinates[0], lng: item.location.coordinates[1]}"
                    :zoom="7"
                    map-type-id="terrain"
                    style="width: 350px; height: 180px"
                  >
                    <GmapMarker
                      :position="{lat: item.location.coordinates[0], lng: item.location.coordinates[1]}"
                      :clickable="true"
                      :draggable="true"
                    />
                  </GmapMap>
                </client-only>
              </div>
            </div>

            <!-- text -->
            <div class="widget widget-text">
              <h4 class="widget-title">Amenities</h4>
              <div class="widget-content">
                <ul class="amenities-list">
                  <li v-for="amenity in item.amenities" v-text="amenity.title"></li>
                </ul>
              </div>
            </div>

            <!-- text -->
            <WorkingHours :hours="item.working_hours"/>

            <!-- banner -->
            <div class="widget widget-banner">
              <div class="widget-content">
                <a href="#" target="_blank">
                  <img src="img/_demo/banner-1.jpg"
                       width="210"
                       height="546"
                       title="Banner title"
                       alt="Banner alt">
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>

  </main>
</template>

<script>
  const entityName = 'airlines';

  import { mapState, mapActions, mapGetters } from 'vuex';
  import ReviewItem from '@/components/reviews/Item';
  import WorkingHours from '@/components/partials/WorkingHours';

  export default {
    name: "DestinationsAirlineShow",

    components: {
      ReviewItem,
      WorkingHours
    },

    computed: {
      ...mapState('reviews', {
        reviews: state => state.list
      }),
      ...mapState(entityName, {
        item: state => state.model
      }),

      ...mapGetters(entityName, ['avgPercents'])
    },

    methods: {
      ...mapActions(entityName, ['favorite', 'unfavorite']),
      toggleFavorite(payload) {
        const { model } = payload;

        if (model.is_liked) {
          this.unfavorite(payload);
        } else {
          this.favorite(payload)
        }
      },
    },

    data() {
      return {
        activeSection: 'about'
      }
    },

    async fetch({ store, params }) {
      await store.dispatch('reviews/index',
        { model: entityName, route_key: params.entity })
    }
  }
</script>

<style scoped>
  .amenities-list {
    list-style: none;
    padding: 0;
  }

  .amenities-list li {
    margin-bottom: 0;
  }
</style>
