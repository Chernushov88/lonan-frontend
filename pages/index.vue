<template>
  <!-- MAIN -->
  <main id="main" class="site-main bg-primary">

    <!-- HERO -->
    <section id="hero-1" class="section section--fixed section-hero">
      <div class="container">
        <div class="hero-body">
          <h2 class="hero-title">Explore <i>the</i> world</h2>
          <div class="btn-holder btn-holder-lg">
            <button @click="$store.dispatch('destinations/toggleSearch')" class="btn btn-lg btn-primary btn-rounded w-350p">Select Your
              Destination</button>
          </div>
        </div>
      </div>
      <style class="d-none">
        @media (max-width: 575px) and (orientation: portrait) {
          #hero-1 {
            background-image: url(img/hero/hero-home@sm.jpg)
          }
        }

        @media (max-width: 575px) and (orientation: landscape) {
          #hero-1 {
            background-image: url(img/hero/hero-home@sm.jpg)
          }
        }

        @media (min-width: 576px) and (max-width: 1023px) {
          #hero-1 {
            background-image: url(img/hero/hero-home@md.jpg)
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
            background-image: url(img/hero/hero-home.jpg)
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
            background-image: url(img/hero/hero-home@lg.jpg)
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
            background-image: url(img/hero/hero-home@xl.jpg)
          }
        }
      </style>
    </section>

    <!-- ITEMS -->
    <section class="section section--lg section-items">
      <div class="container">
        <header class="section-header">
          <h2 v-text="destinationSet.title"></h2>
        </header>
        <div class="section-content">
          <ul class="row items items--tile items--destinations">
            <li class="col col-12 col-md-4 item" v-for="destination in homeDestinations">
              <div class="item-wrap">
                <nuxt-link :to="localePath({name: 'destinations-destination', params: {destination: destination.route_key}})"
                             class="item-img">
                  <img :src="destination.cover_thumb"
                       width="1617"
                       height="1047"
                       :title="label(destination)"
                       :alt="label(destination)"
                  >
                </nuxt-link>
                <div class="item-body">
                  <h4 class="item-title"><nuxt-link :to="localePath({name: 'destinations-destination', params: {destination: destination.route_key}})" v-text="destination.country"></nuxt-link></h4>
                  <div class="item-content" v-text="destination.title"></div>
                </div>
              </div>
            </li>
          </ul>
          <div class="btn-holder">
            <button @click="$store.dispatch('destinations/toggleSearch')" class="btn btn-lg btn-primary btn-rounded w-350p">Select Your
              Destination</button>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
  export default {
    async asyncData({ $axios }) {
      const { data, destination_set } = await $axios.$get('home-destinations');
      const homeDestinations = data;
      const destinationSet = destination_set;

      return {
        homeDestinations,
        destinationSet
      }
    },

    methods: {
      label({ title, country }) {
        return `${title}, ${country}`
      }
    }
  }
</script>
