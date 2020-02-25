<template>
  <li class="item" :class="{'item--favored': item.is_liked}">
    <div class="item-wrap">
      <button @click="toggleFavorite(item, index)"
              type="button"
              class="item-favorite"
              title="Add to favorites">
        <span class="sr-only">Add to favorites</span>
      </button>
      <nuxt-link :to="localePath(route)"
                 class="item-img">
        <img :src="item.cover"
             width="530"
             height="320"
             :title="item.title"
             :alt="item.title">
      </nuxt-link>
      <div class="item-body">
        <h4 class="item-title">
          <nuxt-link :to="localePath({name: 'destinations-destination-events-entity', params: {...$route.params, entity: item.id}})"
                     v-text="item.title"></nuxt-link>
        </h4>
        <div class="item-metas item-metas--top">
          <div class="item-meta item-meta-name">{{ formatDate(item.started_at) }}
          </div>
        </div>
        <div class="item-content">{{ item.description | limit}}</div>
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
          return {name: 'destinations-destination-events-entity', params: {...this.$route.params, entity: this.item.route_key}}
        }
      }
    },

    filters: {
      limit(value) {
        return value.length > 100 ? value.substring(0, 100) + '...' : value;
      },
    },
    methods: {
      avgToPercents(avg) {
        return (100 * avg) / 5;
      },
      formatDate(value) {
        return this.$moment(value).format("MMMM Do YYYY, h:mm:ss");
      },

      ...mapActions('events', ['favorite', 'unfavorite']),

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
