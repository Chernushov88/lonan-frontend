<template>
  <article class="post">
    <section class="settings-content my-profile">
      <div class="row flex-xl-nowrap align-items-start">
        <div class="flex-xl-basis-9 section-items">
          <div class="post-new-post" v-if="isPrivateFeature($auth.user)">
            <form @submit.prevent="onFeedPostSubmit">
              <div class="post-new-input">
                <input type="text"
                       v-model="feedData.content"
                       class="form-control"
                       placeholder="Type something...">
              </div>
              <div class="post-new-submit">
                <div class="post-new-options">
                  <ul>
                    <li>
                      <button type="button" class="btn btn-icons btn-icons-option-img"></button>
                    </li>
                    <li>
                      <button type="button"
                              class="btn btn-icons btn-icons-option-location"></button>
                    </li>
                    <li>
                      <button type="button" class="btn btn-icons btn-icons-option-emoji"></button>
                    </li>
                    <li>
                      <button type="button" class="btn btn-icons btn-icons-option-link"></button>
                    </li>
                  </ul>
                </div>
                <div class="post-new-btn">
                  <button type="submit" class="btn align-left btn-primary btn-next">Share Now
                  </button>
                </div>
              </div>
            </form>
          </div>
          <section class="post-container">
            <div class="list-empty" v-if="feedPosts.length === 0">
              <svg width="21px"
                   height="21px"
                   viewBox="0 0 21 21"
                   version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 55.2 (78181) - https://sketchapp.com -->
                <title>ic-edit</title>
                <desc>Created with Sketch.</desc>
                <defs>
                  <path d="M18,3.82842712 L9,12.8284271 L9,15 L11.1715729,15 L20.1715729,6 L18,3.82842712 Z M22.2928932,6.70710678 L12.2928932,16.7071068 C12.1053568,16.8946432 11.8510029,17 11.5857864,17 L8,17 C7.44771525,17 7,16.5522847 7,16 L7,12.4142136 C7,12.1489971 7.10535684,11.8946432 7.29289322,11.7071068 L17.2928932,1.70710678 C17.6834175,1.31658249 18.3165825,1.31658249 18.7071068,1.70710678 L22.2928932,5.29289322 C22.6834175,5.68341751 22.6834175,6.31658249 22.2928932,6.70710678 Z M18,14 C18,13.4477153 18.4477153,13 19,13 C19.5522847,13 20,13.4477153 20,14 L20,19.5 C20,20.8807119 18.8807119,22 17.5,22 L4.5,22 C3.11928813,22 2,20.8807119 2,19.5 L2,6.5 C2,5.11928813 3.11928813,4 4.5,4 L10,4 C10.5522847,4 11,4.44771525 11,5 C11,5.55228475 10.5522847,6 10,6 L4.5,6 C4.22385763,6 4,6.22385763 4,6.5 L4,19.5 C4,19.7761424 4.22385763,20 4.5,20 L17.5,20 C17.7761424,20 18,19.7761424 18,19.5 L18,14 Z"
                        id="path-1"/>
                </defs>
                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Card/Events-In-Profile" transform="translate(-567.000000, -27.000000)">
                    <g id="Icon-/-Line-/-Edit" transform="translate(565.000000, 26.000000)">
                      <mask id="mask-2" fill="white">
                        <use xlink:href="#path-1"/>
                      </mask>
                      <use id="Mask"
                           fill-opacity="0"
                           fill="#051033"
                           fill-rule="nonzero"
                           xlink:href="#path-1"/>
                      <g id="Color-/-Black-/-Black-800"
                         mask="url(#mask-2)"
                         fill="#C9CED6"
                         fill-rule="evenodd">
                        <polygon id="Black-/-Black-800" points="0 0 24 0 24 24 0 24"/>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <h4 class="title">
                You have not posted anything yet
              </h4>
            </div>
            <FeedPostItem :post="post" :key="post.id" v-for="post in feedPosts"></FeedPostItem>
          </section>
        </div>
        <div class="flex-xl-basis-3 right-sidebar-banner section-items">
          <a href="#" target="_blank">
            <img src="/img/_demo/banner-1.jpg" style="width: 100%" title="" alt="">
          </a>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FeedPostItem from '@/components/user/FeedPostItem';

  const fetchFeed = async ($axios, params) => {
    const resFeed = await $axios.$get(`users/${params.user}/feed`);

    return resFeed.data;
  };

  export default {
    name: "UserProfilePage",

    computed: {
      ...mapGetters('users', ['isPrivateFeature', 'isGuide'])
    },

    components: {
      FeedPostItem
    },

    data() {
      return {
        feedData: {
          content: ''
        }
      }
    },

    methods: {

      async fetchFeed() {
        this.feedPosts = await fetchFeed(this.$axios, this.$route.params)
      },

      async onFeedPostSubmit() {
        try {
          await this.$axios.$post(`users/${this.$route.params.user}/feed`, this.feedData);

          this.feedData.content = '';

          this.fetchFeed();
        }
        catch (e) {

        }
      }
    },

    async asyncData({ $axios, params }) {
      const feedPosts = await fetchFeed($axios, params);

      return { feedPosts }
    }
  }
</script>

<style scoped>

</style>
