<template>
  <li class="col col-12 col-md-6 col-lg-3 item">
    <div class="item-wrap">
      <nuxt-link :to="localePath(route)" class="item-img">
        <img :src="entity.cover"
             width="1050"
             height="1047"
             title="Hotel Maria Cristina"
             alt="Hotel Maria Cristina">
      </nuxt-link>
      <div class="item-body">
        <h4 class="item-title"><a href="#" v-text="entity.title || entity.name"></a></h4>
        <div class="item-content">Address goes here</div>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: "EntityCard",
    props: [
      'entity',
      'entityName'
    ],

    computed: {
      route() {
        if (this.entityName === 'users') {
          return { name: `users-user`, params: { user: this.entity.route_key } }
        }

        return {
          name: `destinations-destination-${this.entityName}-entity`,
          params: { ...this.$route.params, entity: this.entity.route_key }
        };
      }
    }
  }
</script>

<style scoped>

</style>
