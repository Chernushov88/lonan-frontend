<template>
  <form class="dest-actions" @submit.prevent="onFormSubmit">
    <div class="form-wrap row flex-lg-nowrap align-items-end">

      <!-- categories -->
      <div class="d-xl-none col-6 col-lg-auto col-cats">
        <div class="form-group">
          <select name="cats"
                  id="cats-select"
                  class="form-control form-control-md"
                  @change="onEntityChange">
            <option v-for="link in links" v-text="link.title" :value="link.route"></option>
          </select>
        </div>
      </div>

      <!-- search -->
      <div class="col-6 col-lg-auto col-search">
        <div class="form-group form-search-group">
          <label for="search-input" class="sr-only">Search for any restaurant, museum, hotel,
            attractions</label>
          <input type="search"
                 name="s"
                 v-model="query"
                 id="search-input"
                 class="form-control form-control-md">
          <button type="submit" title="Search">
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>

      <slot></slot>

      <!-- sorting -->
      <div class="col-6 col-lg-auto col-sorting">
        <div class="form-group">
          <label for="sort-select">Sort by:</label>
          <select name="sort"
                  id="sort-select"
                  class="form-control form-control-md"
                  v-model="sortBy">
            <option value="rating" v-if="ratingSorting">Best rated</option>
            <option value="price-asc" v-if="priceSorting">Price asc</option>
            <option value="price-desc" v-if="priceSorting">Price desc</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </div>

    </div>
  </form>
</template>

<script>
  export default {
    name: "Actions",

    props: {
      priceSorting: {
        default() {
          return false;
        }
      },
      ratingSorting: {
        default() {
          return true
        }
      },
    },

    data() {
      return {
        links: [
          {
            route: 'destinations-destination-hotels',
            class: 'menu-item-hotels',
            title: 'Hotels'
          },
          {
            route: 'destinations-destination-museums',
            class: 'menu-item-events',
            title: 'Museums'
          },
          {
            route: 'destinations-destination-restaurants',
            class: 'menu-item-restaurants',
            title: 'Restaurants'
          },
          {
            route: 'destinations-destination-events',
            class: 'menu-item-events',
            title: 'Events'
          },
          {
            route: 'destinations-destination-guides',
            class: 'menu-item-guides',
            title: 'Tours & Guides'
          },
          {
            route: 'destinations-destination-airlines',
            class: 'menu-item-airlines',
            title: 'Airlines'
          },
          {
            route: 'destinations-destination-shopping',
            class: 'menu-item-shopping',
            title: 'Shopping'
          },
        ],

        query: '',
        sortBy: this.ratingSorting ? 'relevance' : 'rating'
      }
    },

    methods: {
      onFormSubmit() {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, query: this.query, sortBy: this.sortBy }
        })
      },
      onEntityChange({ target }) {
        const { value } = target;

        if (value) {
          this.$router.push({ name: value, params: this.$route.params })
        }
      }
    }
  }
</script>

<style scoped>

</style>
