<template>
  <main id="main" class="site-main">
    <header class="page-header container">
      <h1>Your businesses</h1>
    </header>

    <div class="page-content">
      <div class="container">

        <!-- Actions -->
        <form class="dest-actions">
          <div class="form-wrap row flex-lg-nowrap align-items-end">

            <!-- categories -->
            <div class="d-xl-none col-6 col-lg-auto col-cats">
              <div class="form-group">
                <select name="cats" id="cats-select" class="form-control form-control-md">
                  <option value="02_dest_hotels.html">Hotels</option>
                  <option value="02_dest_museums.html">Museums</option>
                  <option value="02_dest_restaurants.html">Restaurants</option>
                  <option value="02_dest_events.html">Events</option>
                  <option value="02_dest_guides.html">Tours &amp; Guides</option>
                  <option value="02_dest_airlines.html" selected="">Airlines</option>
                  <option value="02_dest_shopping.html">Shopping</option>
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
                       id="search-input"
                       class="form-control form-control-md">
                <button type="submit" title="Search">
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>

            <!-- sorting -->
            <div class="col-6 col-lg-auto col-sorting">
              <div class="form-group">
                <label for="sort-select">Sort by:</label>
                <select name="sort" id="sort-select" class="form-control form-control-md">
                  <option value="rating">Best rated</option>
                  <option value="price-asc">Price asc</option>
                  <option value="price-desc">Price desc</option>
                  <option value="relevance">Relevance</option>
                </select>
              </div>
            </div>

          </div>
        </form>


        <!-- Content -->
        <div class="dest-row row flex-lg-nowrap align-items-start">

          <!-- menu -->
          <div class="dest-menu d-none d-xl-block">
            <nav class="nav" role="navigation" aria-label="Destinations">
              <ul class="menu">
                <li class="menu-item menu-item-hotels">
                  <a href="02_dest_hotels.html">
                    <div class="ic-wrap"></div>
                    <span class="menu-item-text">Hotels</span>
                  </a>
                </li>
                <li class="menu-item menu-item-museums">
                  <a href="02_dest_museums.html">
                    <div class="ic-wrap"></div>
                    <span class="menu-item-text">Museums</span>
                  </a>
                </li>
                <li class="menu-item menu-item-restaurants">
                  <a href="02_dest_restaurants.html">
                    <div class="ic-wrap"></div>
                    <span class="menu-item-text">Restaurants</span>
                  </a>
                </li>
                <li class="menu-item menu-item-events">
                  <a href="02_dest_events.html">
                    <div class="ic-wrap"></div>
                    <span class="menu-item-text">Events </span>
                  </a>
                </li>
                <li class="menu-item menu-item-guides">
                  <a href="02_dest_guides.html">
                    <div class="ic-wrap"></div>
                    <span class="menu-item-text">Tours &amp; Guides</span>
                  </a>
                </li>
                <li class="menu-item menu-item-airlines current">
                  <a href="02_dest_airlines.html">
                    <div class="ic-wrap"></div>
                    <span class="menu-item-text">Airlines</span>
                  </a>
                </li>
                <li class="menu-item menu-item-shopping">
                  <a href="02_dest_shopping.html">
                    <div class="ic-wrap"></div>
                    <span class="menu-item-text">Shopping</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- list -->
          <div class="section-items">
            <ul class="items items--list items--hotels">
              <GuessEntity v-for="(item,index) in entities"
                           :item="item"
                           :index="index"
                           :key="item.id"
                           :route="{name: 'users-my-businesses-entityName-entity', params: {entityName: typeToName(item.type),entity: item.route_key}}"></GuessEntity>
            </ul>
          </div>

          <!-- ads -->
          <aside class="sidebar sidebar--right" role="complementary">
            <div class="widget widget-banner">
              <a href="#" target="_blank">
                <img src="img/_demo/banner-1.jpg" width="210" height="546" title="" alt="">
              </a>
            </div>
            <div class="widget widget-banner">
              <a href="#" target="_blank">
                <img src="img/_demo/banner-2.jpg" width="210" height="176" title="" alt="">
              </a>
            </div>
          </aside>

        </div>

      </div>
    </div>


  </main>
</template>

<script>
  import GuessEntity from '@/components/destinations/entities/GuessEntity';

  export default {
    name: "UserEntities",

    components: {
      GuessEntity
    },

    methods: {
      pluralize: (count, noun, suffix = 's') =>
        `${noun}${count !== 1 ? suffix : ''}`,

      typeToName(type) {
        return this.pluralize(0, type.split('\\')[2].toLocaleLowerCase());
      }
    },

    async asyncData({ $axios }) {
      const { data } = await $axios.$get('users/entities');

      return {
        entities: data
      }
    }
  }
</script>

<style scoped>

</style>
