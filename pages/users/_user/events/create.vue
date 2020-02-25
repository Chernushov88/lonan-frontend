<template>
  <article class="post">
    <section class="settings-content my-events">
      <div class="row flex-xl-nowrap align-items-start">
        <div class="flex-xl-basis-9 profile-settings-content section-items">
          <section class="post-settings settings-events settings-events-empty">
            <div class="d-flex align-items-center justify-content-sm-between">
              <div class="sub-title bold-900 sub-title-6">My Events</div>
              <button type="button" class="btn btn-primary btn-radius mw-190p">Add an Event</button>
            </div>
            <div class="post-settings-events-empty">
              <div class="post-settings-events container-xs">
                <div class="post-settings-events-empty-content text-center">
                  <div class="post-settings-events-empty-icon"></div>
                  <div class="description">You have not created any events yet</div>
                  <button type="button" class="btn btn-primary btn-radius mw-190p">Add an Event
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section class="post-settings settings-events active settings-events-details">
            <EventEditor @submit="onEventCreate" :categories="eventCategories" :event="event"/>
          </section>
        </div>
        <div class="flex-xl-basis-3 profile-settings-sidebar right-sidebar-banner section-items">
          <a href="#" target="_blank">
            <img src="img/_demo/banner-1.jpg" style="width: 100%" title="" alt="">
          </a>
        </div>
      </div>
    </section>

  </article>
</template>

<script>
  import EventEditor from '@/components/user/EventEditor';
  import { objectToFormData } from 'object-to-formdata'

  export default {
    name: "UserProfileEventsCreate",

    components: {
      EventEditor
    },

    async asyncData({ $axios }) {
      const { data } = await $axios.$get('event-categories');
      const eventCategories = data;

      return {
        eventCategories
      }
    },

    methods: {
      async onEventCreate() {
        try {
          const { data } = await this.$axios.$post(`events`, objectToFormData(this.event))

          this.$router.push({ name: 'users-user', params: this.$route.params })
        }
        catch (e) {

        }
      }
    },

    data() {
      return {
        event: {
          title: '',
          address: '',
          description: '',
          destination_id: '',
          category_id: '',
          purchase_link: '',
          base_price: 0,
          location: {},
          started_at: null,
          cover: null,
          ended_at: null,
        }
      }
    }
  }
</script>

<style scoped>

</style>
