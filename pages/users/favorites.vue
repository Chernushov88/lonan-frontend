<template>
  <main id="main" class="site-main bg-primary">
    <div class="container">
      <div class="header-content margin-bottom-25p">
        <h1>Favorites</h1>
      </div>
      <div class="dest-row row flex-lg-nowrap align-items-start">
        <!-- list -->

        <div class="flex-lg-basis-9 flex-xl-basis-8 section-items section-favorites">
          <div class="favorites-empty-block" v-if="items.length === 0">
            <div class="favorites-empty-icon"></div>
            <div class="sub-title sub-title-7 sub-title-text-color-4">You don’t have any favorites
              yet
            </div>
          </div>
          <ul class="items items--list items--hotels">
            <li class="item item--favored" v-for="item in items">
              <div class="item-wrap">
                <button disabled
                        type="button"
                        class="item-favorite"
                        title="Add to favorites">
                  <span class="sr-only">Add to favorites</span>
                </button>
                <nuxt-link :to="localePath(buildRouteLink(item))"
                           class="item-img">
                  <img :src="item.cover"
                       width="530"
                       height="320"
                       :title="item.title"
                       :alt="item.title">
                </nuxt-link>
                <div class="item-body">
                  <h4 class="item-title"><a href="#" v-text="item.title"></a></h4>
                  <div class="item-metas item-metas--top">
                    <div class="item-meta item-meta-name">City, {{ item.destination.country }}</div>
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

        <!-- ads -->
        <aside class="flex-lg-basis-3 flex-xl-basis-4 sidebar sidebar--right" role="complementary">
          <div class="widget widget-banner">
            <a href="#" target="_blank">
              <img src="img/_demo/banner-1.jpg" width="210" height="546" title="" alt="">
            </a>
          </div>
        </aside>

      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "UserFavorites",

    middleware: ['auth'],

    methods: {
      avgToPercents(avg) {
        return (100 * avg) / 5;
      },

      pluralize: (count, noun, suffix = 's') =>
        `${noun}${count !== 1 ? suffix : ''}`,

      buildRouteLink(item) {
        let entity = this.pluralize(0, item.type.split('\\')[2].toLocaleLowerCase());

        if (entity === 'guides') {
          entity = 'users';
        }

        return {
          name: `destinations-destination-${entity}-entity`,
          params: { destination: item.destination.route_key, entity: item.route_key }
        };
      }
    },

    async asyncData({ $auth, $axios }) {
      const { data } = await $axios.$get('users/favorites');
      const items = data;

      return { items };
    }
  }
</script>

<style scoped>

</style>
