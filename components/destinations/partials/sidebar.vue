<template>
  <div class="dest-menu d-none d-xl-block">
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
</template>

<script>
  export default {
    name: "Sidebar",

    data() {
      return {
        links: [
          {
            route: 'destinations-destination-all',
            class: 'menu-item-all',
            title: 'All'
          },
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
        ]
      }
    }
  }
</script>

<style scoped>

</style>
