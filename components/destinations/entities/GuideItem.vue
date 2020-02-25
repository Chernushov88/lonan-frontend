<template>
  <li class="item" :class="{'item--favored': item.is_liked}">
    <div class="item-wrap">
      <button @click="toggleFavorite(item)"
              type="button"
              class="item-favorite"
              title="Add to favorites">
        <span class="sr-only">Add to favorites</span>
      </button>
      <nuxt-link :to="localePath(route)"
                 class="item-img">
        <img :src="item.avatar"
             width="530"
             height="320"
             :title="item.name"
             :alt="item.name">
      </nuxt-link>
      <div class="item-body">
        <h4 class="item-title">
          <nuxt-link :to="localePath({name: 'users-user', params: {user: item.route_key}})">
            {{ item.name }} | ${{ item.price | formatMoney }}/h
          </nuxt-link>
        </h4>
        <div class="item-metas item-metas--top">
          <div class="item-meta item-meta-name">City, {{ destination ? destination.country :
            item.destination.country }}
          </div>
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
          return { name: 'users-user', params: { user: this.item.route_key } }
        }
      }
    },

    filters: {
      limit(value) {
        return value.length > 100 ? value.substring(0, 100) + '...' : value;
      },
    },

    methods: {
      formatDate(value) {
        return this.$moment(value).format("MMMM Do YYYY, h:mm:ss");
      },

      avgToPercents(avg) {
        return (100 * avg) / 5;
      },

      toggleFavorite(item) {
        if (item.is_liked) {
          this.unfavorite(item);
        } else {
          this.favorite(item)
        }
      },

      async favorite(item) {
        if (!this.$auth.loggedIn) {
          this.$router.push({ name: 'login' });
        }

        try {
          await this.$axios.$post(`guides/${item.route_key}/favorite`)
        }
        catch (e) {

        }
      },
      async unfavorite(item) {
        if (!this.$auth.loggedIn) {
          this.$router.push({ name: 'login' });
        }

        try {
          await this.$axios.$post(`guides/${item.route_key}/unfavorite`)
        }
        catch (e) {

        }
      }
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
