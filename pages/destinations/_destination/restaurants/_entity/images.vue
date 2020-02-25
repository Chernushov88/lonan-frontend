<template>
  <main id="main" class="site-main">
    <header class="page-header container sr-only">
      <h1>{{ item.title }} images</h1>
    </header>

    <!-- Back to category -->
    <div class="back-to dest-back-to">
      <div class="container">
        <nuxt-link :to="localePath({name: 'destinations-destination-restaurants-entity', params: $route.params})">Back to {{
          item.title }}
        </nuxt-link>
      </div>
    </div>

    <!-- DESTINATION IMAGES -->
    <div class="section dest-all-imgs">
      <div class="container">
        <ul class="gallery row">
          <li class="col-6 col-md-4 col-lg-3" v-for="(image, index) in item.gallery">
            <a href="#"
               @click.prevent="showImg(index)"
               class="gallery-wrap">
              <img :src="image.url"
                   width="500"
                   height="500"
                   :title="item.title"
                   :alt="item.title">
            </a>
          </li>
        </ul>
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
  import HasLightbox from '@/mixins/HasLightbox';
  const entityName = 'restaurants';
  import { mapState } from 'vuex';

  export default {
    name: "DestinationsRestaurantImages",

    mixins: [HasLightbox],

    computed: {
      images() {
        return this.item.gallery.map(item => item.url);
      },
      ...mapState(entityName, {
        item: state => state.model
      }),
    }
  }
</script>

<style scoped>

</style>
