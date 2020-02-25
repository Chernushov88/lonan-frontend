<template>
  <li class="item" :class="{'item--favored': item.is_liked}">
    <div class="item-wrap">
      <button @click="toggleFavorite(item, index)"
              type="button"
              class="item-favorite"
              title="Add to favorites">
        <span class="sr-only">Add to favorites</span>
      </button>
      <nuxt-link :to="localePath(route)" class="item-img">
        <img :src="item.cover"
             width="530"
             height="320"
             :title="item.title"
             :alt="item.title">
      </nuxt-link>
      <div class="item-body">
        <h4 class="item-title"><nuxt-link :to="localePath({name: 'destinations-destination-museums-entity', params: {...$route.params, entity: item.id}})" v-text="item.title"></nuxt-link></h4>
        <div class="item-metas item-metas--top">
          <div class="item-meta item-meta-name">City, {{ destination ? destination.country : item.destination.country }}</div>
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
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: "AirlineItem",

    props: {
      item: {
        required: true,
      },
      index: {
        required: true,
      },
      route: {
        required: false,
        default() {
          return {name: 'destinations-destination-museums-entity', params: {...this.$route.params, entity: this.item.route_key}}
        }
      }
    },

    methods: {
      avgToPercents(avg) {
        return (100 * avg) / 5;
      },

      ...mapActions('museums', ['favorite', 'unfavorite']),

      toggleFavorite(model, index) {
        if (model.is_liked) {
          this.unfavorite({ model, silent: true });
        } else {
          this.favorite({ model, silent: true });
        }

        model.is_liked = !model.is_liked;
      },
    },

    computed: {
      ...mapState('destinations', {
        destination: state => state.model,
      }),
    }
  }
</script>

<style scoped>

</style>
