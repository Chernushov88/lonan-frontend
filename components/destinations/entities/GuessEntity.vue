<template>
  <AirlineItem :item="item" :route="route" :index="index" v-if="item.type === 'App\\Models\\Airline'"></AirlineItem>
  <EventItem :item="item" :route="route" :index="index" v-else-if="item.type === 'App\\Models\\Event'"></EventItem>
  <GuideItem :item="item" :route="route" :index="index" v-else-if="item.type === 'App\\Models\\Guide'"></GuideItem>
  <HotelItem :item="item" :route="route" :index="index" v-else-if="item.type === 'App\\Models\\Hotel'"></HotelItem>
  <MuseumItem :item="item" :route="route" :index="index" v-else-if="item.type === 'App\\Models\\Museum'"></MuseumItem>
  <RestaurantItem :item="item" :route="route" :index="index" v-else-if="item.type === 'App\\Models\\Restaurant'"></RestaurantItem>
  <ShoppingStoreItem :item="item" :route="route" :index="index" v-else-if="item.type === 'App\\Models\\ShoppingStore'"></ShoppingStoreItem>
</template>

<script>
  import AirlineItem from './AirlineItem';
  import EventItem from './EventItem';
  import GuideItem from './GuideItem';
  import HotelItem from './HotelItem';
  import MuseumItem from './MuseumItem';
  import RestaurantItem from './RestaurantItem';
  import ShoppingStoreItem from './ShoppingStoreItem';

  export default {
    name: "GuessEntity",

    props: {
      item: {
        required: true,
      },
      index: {
        required: true,
      },
      route: {
        required: false,
      }
    },

    components: {
      AirlineItem,
      EventItem,
      GuideItem,
      HotelItem,
      MuseumItem,
      RestaurantItem,
      ShoppingStoreItem
    }
  }
</script>

<style scoped>

</style>
