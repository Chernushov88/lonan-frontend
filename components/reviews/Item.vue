<template>
  <li class="review-item">
    <div class="review-header">
      <div class="review-ava">
        <img :src="review.user.avatar"
             width="132"
             height="132"
             :title="review.user.name"
             :alt="review.user.name">
      </div>
      <div class="review-header-main">
        <h4 class="review-author" v-text="review.user.name"></h4>
        <div class="review-metas review-header-metas">
          <div class="review-meta review-meta-location">Wayne, New Jersey</div>
          <div class="review-meta review-meta-count">{{ review.user.reviews_count }} reviews</div>
        </div>
      </div>
      <div class="review-actions">
        <div class="review-action review-action-favor">
          <button type="button" @click="toggleFavorite" :class="{active: review.is_liked}">
            <span class="sr-only">Favorite</span>
          </button>
        </div>
        <div class="review-action review-action-share">
          <button type="button">
            <span class="sr-only">Share</span>
          </button>
        </div>
        <div class="review-action review-action-more">
          <button type="button">
            <span class="sr-only">More</span>
          </button>
        </div>
      </div>
    </div>
    <div class="review-metas review-body-metas">
      <div class="review-meta rating">
        <div class="rating-bar">
          <div class="rating-bar-inner" :style="`width: ${avgToPercents(review.rating)}%;`"></div>
        </div>
        <div class="rating-label">Submitted on {{ $moment(review.created_at) }}</div>
      </div>
    </div>
    <div class="review-gallery" v-if="review.gallery.length > 0">
      <ul class="gallery row row-sm">
        <li class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
            v-for="(image, index) in review.gallery">
          <a href="#"
             @click.prevent="showImg(index)"
             data-fslightbox="review-3-gallery"
             class="gallery-wrap">
            <img :src="image.url" width="214" height="214" title="Image title" alt="Image alt">
          </a>
        </li>
      </ul>
    </div>
    <div class="review-content">
      <div class="review-excerpt" v-show="!showFull">
        {{ review.message | limit }}
      </div>
      <div class="review-full" v-show="showFull">
        <div class="collapse-content" v-text="review.message">
        </div>
      </div>
      <div class="collapse-header">
        <button class="collapsed"
                aria-expanded="false"
                aria-controls="review-1"
                @click="showFull = true">
          <span class="sr-only">Show full content</span>
        </button>
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
  </li>
</template>

<script>
  import { mapActions } from 'vuex';
  import HasLightbox from '@/mixins/HasLightbox';

  export default {
    name: "ReviewItem",

    props: ['review'],

    mixins: [HasLightbox],

    data() {
      return {
        showFull: false
      }
    },

    computed: {
      images() {
        return this.review.gallery.map(item => item.url);
      },
    },

    filters: {
      limit(value) {
        return value.length > 100 ? value.substring(0, 70) + '...' : value;
      },
    },

    methods: {
      async toggleFavorite() {
        if (this.review.is_liked) {
          await this.unfavorite({ model: this.review, silent: true })
        } else {
          await this.favorite({ model: this.review, silent: true })
        }
      },
      ...mapActions('reviews', ['favorite', 'unfavorite']),
      avgToPercents(value) {
        return (100 * value) / 5;
      }
    }
  }
</script>

<style scoped>

</style>
