<template>
  <main id="main" class="site-main">

    <!-- Back to category -->
    <div class="back-to dest-back-to bg-primary">
      <div class="container">
        <nuxt-link :to="localePath({name: 'destinations-id-events', params: $route.params})">Back to Events
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
              <h1 class="item-title" v-text="event.title"></h1>
            </header>
            <div class="item-content">
              <div class="ic-row ic-row-address">
                {{ event.address }}
              </div>
              <div class="ic-row ic-row-time">
                {{ formatDate(event.started_at) }} –<br>
                {{ formatDate(event.ended_at) }}
              </div>

              <div class="item-form">
                <form>
                  <div class="form-group form-price">${{ event.base_price }}</div>
                  <div class="form-button">
                    <a :href="event.purchase_link"
                       target="_blank"
                       class="btn btn-sm btn-primary w-250p">Buy
                      Tickets</a>
                  </div>
                </form>
              </div>
            </div>
            <div class="item-metas item-metas--bot">
              <div class="item-meta item-meta-favorite">
                <a href="#"
                   @click.prevent="toggleFavorite({model: event, silent: false})"><span v-if="event.is_liked">Unfavorite</span>
                  <span v-else>Favorite</span></a>
              </div>
              <div class="item-meta item-meta-share">
                <a href="#">Share</a>
              </div>
            </div>
          </div>

          <!-- Photos -->
          <div class="dest-secondary col-12 col-lg-7">
            <client-only>
              <tiny-slider class="item-photos" v-bind="sliderOptions">
                <div class="item-photo">
                  <img :src="event.cover"
                       width="1905"
                       height="1152"
                       :title="event.title"
                       :alt="event.title">
                </div>
              </tiny-slider>
            </client-only>
          </div>


        </div>
      </div>
    </div>

    <!-- DESTINATION TABS -->
    <div class="section dest-tabs">
      <div class="container">

        <!-- Header -->
        <div class="tab-header"></div>

        <div class="row">

          <!-- Tabs -->
          <div class="tabs col-12 col-lg-8">

            <!-- about -->
            <section class="tab-pane active"
                     id="dest-about"
                     role="tabpanel"
                     aria-labelledby="dest-about-tab">
              <div class="tab-wrap">
                <header>
                  <h4 class="tab-pane-title">About the event</h4>
                </header>
                <div class="tab-pane-content">
                  <p v-text="event.description"></p>
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
                    :center="{lat: event.location.coordinates[0], lng: event.location.coordinates[1]}"
                    :zoom="7"
                    map-type-id="terrain"
                    style="width: 350px; height: 180px"
                  >
                    <GmapMarker
                      :position="{lat: event.location.coordinates[0], lng: event.location.coordinates[1]}"
                      :clickable="true"
                      :draggable="true"
                    />
                  </GmapMap>
                </client-only>
              </div>
            </div>

            <!-- banner -->
            <div class="widget widget-banner">
              <div class="widget-content">
                <a href="#" target="_blank">
                  <img src="/img/_demo/banner-1.jpg"
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
  const entityName = 'events';

  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    name: "DestinationsEventsShow",


    computed: {
      ...mapState(entityName, {
        event: state => state.model
      }),
    },

    data() {
      return {
        sliderOptions: {
          mode: 'gallery',
          nav: false,
          arrowKeys: true,
          autoplay: true,
          autoplayButtonOutput: false,
        }
      }
    },

    methods: {
      ...mapActions(entityName, ['favorite', 'unfavorite']),

      formatDate(value) {
        return this.$moment(value).format("MMMM Do YYYY, h:mm:ss");
      },

      toggleFavorite(payload) {
        const { model } = payload;

        if (model.is_liked) {
          this.unfavorite(payload);
        } else {
          this.favorite(payload)
        }
      },
    },

    async validate({ store, params }) {
      await store.dispatch(`${entityName}/show`,
        { route_key: params.entity, params: { relations: [] } });

      return Boolean(store.state[entityName].model)
    }
  }
</script>

<style scoped>

</style>
