<template>
  <main id="main" class="site-main">

    <!-- Back to category -->
    <div class="back-to dest-back-to bg-primary">
      <div class="container">
        <nuxt-link :to="localePath({name: 'destinations-destination-museums', params: $route.params})">
          Back
          to Museums
        </nuxt-link>
      </div>
    </div>

    <!-- DESTINATION MAIN -->
    <div class="section dest-main">
      <div class="container">
        <div class="row">

          <!-- Main info -->
          <div class="dest-info col-12 col-lg-5">
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
              <div class="ic-row ic-row-address">
                {{ item.address }}
              </div>
              <div class="ic-row ic-row-phone">
                <a href="tel:+1-123-456-7890">(123) 456-7890</a>
              </div>
              <div class="ic-row ic-row-url">
                <a :href="item.website"
                   target="_blank"
                   rel="noreferrer noopener"
                   v-text="item.website"></a>
              </div>
            </div>
            <div class="item-metas item-metas--bot">
              <div class="item-meta item-meta-favorite" :class="{active: item.is_liked}">
                <a href="#"
                   @click.prevent="toggleFavorite({model: item, silent: false})"><span v-if="item.is_liked">Unfavorite</span>
                  <span v-else>Favorite</span></a>
              </div>
              <div class="item-meta item-meta-share">
                <a href="#">Share</a>
              </div>
              <div class="item-meta item-meta-add-review">
                <nuxt-link :to="localePath({name: 'destinations-destination-museums-entity-review', params: $route.params})">
                  Add a review
                </nuxt-link>
              </div>
            </div>
          </div>

          <!-- Photos -->
          <div class="dest-secondary col-12 col-lg-7">
            <client-only>
              <tiny-slider v-bind="sliderOptions" class="item-photos">
                <div class="item-photo" v-for="galleryItem in item.gallery">
                  <a href="#" @click.prevent="showImg(index)">
                    <img :src="galleryItem.url"
                         width="1905" height="1152"
                         :title="item.title"
                         :alt="item.title">
                  </a>
                </div>
              </tiny-slider>
            </client-only>
            <div class="item-all-photos">
              <a href="#">See all {{ item.gallery.length }} photos</a>
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
                 aria-selected="true">Description/About</a>
            </li>
            <li class="nav-item" :class="{active: activeSection === 'images'}">
              <a href="#images"
                 data-toggle="pill"
                 role="tab"
                 @click.prevent="activeSection = 'images'"
                 aria-controls="dest-about"
                 aria-selected="true">Images</a>
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
            <option value="#dest-about" selected="">Description/About</option>
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

            <!-- photos -->
            <section class="tab-pane"
                     id="dest-photos"
                     role="tabpanel"
                     v-if="activeSection === 'images'"
                     :class="{active: activeSection === 'images'}"
                     aria-labelledby="dest-photos-tab">
              <div class="tab-wrap">
                <header>
                  <h4 class="tab-pane-title">Photos</h4>
                </header>
                <div class="tab-pane-content">
                  <ul class="gallery row row-xs">
                    <li class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
                        v-for="image in item.gallery.slice(0, 15)">
                      <a href="#" @click.prevent="showImg(index)" class="gallery-wrap">
                        <img :src="image.url"
                             width="214"
                             height="214"
                             :title="item.title"
                             :alt="item.title">
                      </a>
                    </li>
                    <li class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">
                      <div class="gallery-extra">
                        <nuxt-link :to="localePath({name: 'destinations-destination-museums-entity-images', params: $route.params})">
                          See All
                        </nuxt-link>
                      </div>
                    </li>
                  </ul>
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
                  <nuxt-link :to="localePath({name: 'destinations-destination-museums-entity-review', params: $route.params})"
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
                    v-if="item.location"
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
                  <li v-for="amenity in item.amenities">
                    <img :src="amenity.icon">
                    <span v-text="amenity.title"></span>
                  </li>
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
    <portal to="lightbox">
      <vue-easy-lightbox
        :visible="lightbox.visible"
        :imgs="images"
        :index="lightbox.index"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </portal>
  </main>
</template>

<script>
  const entityName = 'museums';

  import { mapState, mapActions, mapGetters } from 'vuex';
  import ReviewItem from '@/components/reviews/Item';
  import WorkingHours from '@/components/partials/WorkingHours';
  import HasLightbox from '@/mixins/HasLightbox';


  export default {
    name: "DestinationsMuseumShow",

    components: {
      ReviewItem,
      WorkingHours
    },
    mixins: [HasLightbox],

    computed: {
      images() {
        return this.item.gallery.map(item => item.url);
      },
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
        activeSection: 'about',
        sliderOptions: {
          mode: 'gallery',
          nav: false,
          arrowKeys: true,
          autoplay: true,
          autoplayButtonOutput: false,
        }
      }
    },

    async fetch({ store, params }) {
      await store.dispatch('reviews/index',
        { model: entityName, route_key: params.entity })
    },

    async validate({ store, params }) {
      await store.dispatch(`${entityName}/show`,
        { route_key: params.entity, params: { relations: ['amenities'] } })

      return Boolean(store.state[entityName].model)
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

  .amenities-list li img {
    width: 25px;
  }
</style>
