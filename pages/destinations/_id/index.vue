<template>
  <main id="main" class="site-main bg-primary">

    <!-- HERO -->
    <section id="hero-1" class="section section--fixed section-hero">
      <div class="container">
        <div class="hero-body">
          <h2 class="hero-title"><i>{{ $t('explore') }}</i> <u v-text="destination.title"></u></h2>
          <div class="btn-holder btn-holder-lg">
            <form class="search-form">
              <div class="form-group form-search-group">
                <label for="hero-search" class="sr-only">Search for any restaurant, museum, hotel,
                  attractions</label>
                <input type="search"
                       name="s"
                       id="hero-search"
                       class="form-control form-control-rounded form-control-lg"
                       placeholder="Search for any restaurant, museum, hotel, attractions">
                <button type="submit" class="btn-lg" title="Search">
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style class="d-none">
        @media (max-width: 575px) and (orientation: portrait) {
          #hero-1 {
            background-image: url({{ destination.cover }})
          }
        }

        @media (max-width: 575px) and (orientation: landscape) {
          #hero-1 {
            background-image: url({{ destination.cover }})
          }
        }

        @media (min-width: 576px) and (max-width: 1023px) {
          #hero-1 {
            background-image: url({{ destination.cover }})
          }
        }

        @media (min-width: 1024px) and (max-width: 1919px),
        (min-width: 576px) and (max-width: 1023px) and (-webkit-min-device-pixel-ratio: 1.25),
        (min-width: 576px) and (max-width: 1023px) and ( min--moz-device-pixel-ratio: 1.25),
        (min-width: 576px) and (max-width: 1023px) and ( -o-min-device-pixel-ratio: 1.25/1),
        (min-width: 576px) and (max-width: 1023px) and ( min-device-pixel-ratio: 1.25),
        (min-width: 576px) and (max-width: 1023px) and ( min-resolution: 200dpi),
        (min-width: 576px) and (max-width: 1023px) and ( min-resolution: 1.25dppx) {
          #hero-1 {
            background-image: url({{ destination.cover }})
          }
        }

        @media (min-width: 1920px) and (max-width: 2879px),
        (min-width: 1024px) and (max-width: 1919px) and (-webkit-min-device-pixel-ratio: 1.25),
        (min-width: 1024px) and (max-width: 1919px) and ( min--moz-device-pixel-ratio: 1.25),
        (min-width: 1024px) and (max-width: 1919px) and ( -o-min-device-pixel-ratio: 1.25/1),
        (min-width: 1024px) and (max-width: 1919px) and ( min-device-pixel-ratio: 1.25),
        (min-width: 1024px) and (max-width: 1919px) and ( min-resolution: 200dpi),
        (min-width: 1024px) and (max-width: 1919px) and ( min-resolution: 1.25dppx) {
          #hero-1 {
            background-image: url({{ destination.cover }})
          }
        }

        @media (min-width: 2880px),
        (min-width: 1920px) and (-webkit-min-device-pixel-ratio: 1.25),
        (min-width: 1920px) and ( min--moz-device-pixel-ratio: 1.25),
        (min-width: 1920px) and ( -o-min-device-pixel-ratio: 1.25/1),
        (min-width: 1920px) and ( min-device-pixel-ratio: 1.25),
        (min-width: 1920px) and ( min-resolution: 200dpi),
        (min-width: 1920px) and ( min-resolution: 1.25dppx) {
          #hero-1 {
            background-image: url({{ destination.cover }})
          }
        }
      </style>
    </section>

    <!-- DESTINATION NAV -->
    <section class="section section--md-bot section-destnav">
      <div class="container">
        <nav class="nav" role="navigation" aria-label="Destinations">
          <ul class="menu">
            <li class="menu-item"
                :class="{[link.class]: true, current: $route.name === link.route}"
                v-for="link in links">
              <nuxt-link :to="localePath({name: link.route, params: $route.params})">
                <div class="ic-wrap"></div>
                <span class="menu-item-text" v-text="link.title"></span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <!-- ITEMS -->
    <section class="section section--sm section-items" v-if="hotels.length > 0">
      <div class="container">
        <header class="section-header">
          <h2>Top Hotels</h2>
          <nuxt-link :to="localePath({name: 'destinations-id-hotels', params: $route.params})"
                       class="btn btn-rounded btn-more">Explore all
          </nuxt-link>
        </header>
        <div class="section-content">
          <ul class="row items items--card items--hotels">
            <EntityCard v-for="entity in hotels"
                        entityName="hotels"
                        :entity="entity"
                        :key="entity.id"/>
          </ul>
        </div>
      </div>
    </section>
    <section class="section section--sm section-items" v-if="restaurants.length > 0">
      <div class="container">
        <header class="section-header">
          <h2>Top Restaurants</h2>
          <nuxt-link :to="localePath({name: 'destinations-id-restaurants', params: $route.params})"
                       class="btn btn-rounded btn-more">Explore all
          </nuxt-link>
        </header>
        <div class="section-content">
          <ul class="row items items--card items--restaurants">
            <EntityCard v-for="entity in restaurants"
                        entityName="restaurants"
                        :entity="entity"
                        :key="entity.id"/>
          </ul>
        </div>
      </div>
    </section>
    <section class="section section--sm section-items" v-if="museums.length > 0">
      <div class="container">
        <header class="section-header">
          <h2>Top Museums</h2>
          <nuxt-link :to="localePath({name: 'destinations-id-museums', params: $route.params})"
                       class="btn btn-rounded btn-more">Explore all
          </nuxt-link>
        </header>
        <div class="section-content">
          <ul class="row items items--card items--museums">
            <EntityCard v-for="entity in museums"
                        :entity="entity"
                        entityName="museums"
                        :key="entity.id"/>
          </ul>
        </div>
      </div>
    </section>
    <section class="section section--sm section-items" v-if="airlines.length > 0">
      <div class="container">
        <header class="section-header">
          <h2>Top Airlines</h2>
          <nuxt-link :to="localePath({name: 'destinations-id-airlines', params: $route.params})"
                       class="btn btn-rounded btn-more">Explore all
          </nuxt-link>
        </header>
        <div class="section-content">
          <ul class="row items items--card items--airlines">
            <EntityCard v-for="entity in airlines"
                        :entity="entity"
                        entityName="airlines"
                        :key="entity.id"/>
          </ul>
        </div>
      </div>
    </section>
    <section class="section section--sm section-items" v-if="guides.length > 0">
      <div class="container">
        <header class="section-header">
          <h2>Top Guides</h2>
          <nuxt-link :to="localePath({name: 'destinations-id-guides', params: $route.params})"
                       class="btn btn-rounded btn-more">Explore all
          </nuxt-link>
        </header>
        <div class="section-content">
          <ul class="row items items--card items--guides">
            <EntityCard v-for="entity in guides"
                        :entity="entity"
                        entityName="guides"
                        :key="entity.id"/>
          </ul>
        </div>
      </div>
    </section>
    <section class="section section--sm section-items" v-if="shopping.length > 0">
      <div class="container">
        <header class="section-header">
          <h2>Top Shopping</h2>
          <nuxt-link :to="localePath({name: 'destinations-id-shopping', params: $route.params})"
                       class="btn btn-rounded btn-more">Explore all
          </nuxt-link>
        </header>
        <div class="section-content">
          <ul class="row items items--card items--shopping">
            <EntityCard v-for="entity in shopping" :entity="entity" entityName="shopping" :key="entity.id"/>
          </ul>
        </div>
      </div>
    </section>
    <section class="section section--sm section-items" v-if="eventCategories.length > 0">
      <div class="container">
        <header class="section-header">
          <h2>Top Events to explore</h2>
          <nuxt-link :to="localePath({name: 'destinations-id-events', params: $route.params})"
                       class="btn btn-rounded btn-more">Explore all
          </nuxt-link>
        </header>
        <div class="section-content">
          <ul class="row items items--tile items--tile-long items--events">
            <li class="col col-12 col-md-6 col-lg-4 item" v-for="eventCategory in eventCategories">
              <div class="item-wrap">
                <nuxt-link :to="localePath({name: 'destinations-id-events', params: $route.params, query: {category: eventCategory.id}})"
                             class="item-img">
                  <img :src="eventCategory.cover"
                       width="1050"
                       height="1260"
                       :title="eventCategory.title"
                       :alt="eventCategory.title">
                </nuxt-link>
                <div class="item-body">
                  <h4 class="item-title"><a href="#" v-text="eventCategory.title"></a></h4>
                  <div class="item-content"></div>
                </div>
              </div>
            </li>
          </ul>
          <div class="btn-holder">
            <a href="#" class="btn btn-lg btn-primary btn-rounded w-350p">Select Your
              Destination</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  const entities = [
    'airlines',
    'hotels',
    'museums',
    'shopping',
    'restaurants'
  ];
  import { mapState } from 'vuex';
  import EntityCard from '@/components/destinations/EntityCard';

  export default {
    name: "DestinationHome",

    scrollToTop: true,

    components: {
      EntityCard
    },

    data() {
      return {
        links: [
          {
            route: 'destinations-id-hotels',
            class: 'menu-item-hotels',
            title: 'Hotels'
          },
          {
            route: 'destinations-id-museums',
            class: 'menu-item-events',
            title: 'Museums'
          },
          {
            route: 'destinations-id-restaurants',
            class: 'menu-item-restaurants',
            title: 'Restaurants'
          },
          {
            route: 'destinations-id-events',
            class: 'menu-item-events',
            title: 'Events'
          },
          {
            route: 'destinations-id-guides',
            class: 'menu-item-guides',
            title: 'Tours & Guides'
          },
          {
            route: 'destinations-id-airlines',
            class: 'menu-item-airlines',
            title: 'Airlines'
          },
          {
            route: 'destinations-id-shopping',
            class: 'menu-item-shopping',
            title: 'Shopping'
          },
        ]
      }
    },

    async fetch({ store, params }) {
      await store.dispatch(`event-categories/index`);

      await store.dispatch(`hotels/index`,
        {
          destination: params.id,
        });
      await store.dispatch(`museums/index`,
        {
          destination: params.id,
          params: {}
        });
      await store.dispatch(`shopping-stores/index`,
        {
          destination: params.id,
          params: {}
        });
      await store.dispatch(`airlines/index`,
        {
          destination: params.id,
          params: {}
        });
      await store.dispatch(`restaurants/index`,
        {
          destination: params.id,
          params: {}
        });
      await store.dispatch(`guides/index`,
        {
          destination: params.id,
          params: {}
        });

    },

    computed: {
      ...mapState('destinations', {
        destination: state => state.model
      }),
      ...mapState('hotels', {
        hotels: state => state.list,
      }),
      ...mapState('museums', {
        museums: state => state.list,
      }),
      ...mapState('shopping-stores', {
        shopping: state => state.list,
      }),
      ...mapState('restaurants', {
        restaurants: state => state.list,
      }),
      ...mapState('airlines', {
        airlines: state => state.list,
      }),
      ...mapState('guides', {
        guides: state => state.list,
      }),
      ...mapState('event-categories', {
        eventCategories: state => state.list,
      }),
    }
  }
</script>

<style scoped>

</style>
