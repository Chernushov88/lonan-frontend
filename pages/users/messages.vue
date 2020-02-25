<template>
  <main id="main" class="site-main">
    <div class="container">
      <div class="header-content message-header-content d-flex justify-content-between flex-column flex-sm-row">
        <h1>Messages</h1>
        <form class="dest-actions message-actions">
          <div class="form-wrap row flex-lg-nowrap align-items-end">

            <!-- search -->
            <div class="col-6 col-lg-auto col-search">
              <div class="form-group form-search-group">
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
      </div>
      <div class="message message-open">
        <ul class="message-list">
          <nuxt-link :to="{name: 'users-messages-conversation', params: {conversation: conversation.route_key}}"
                     class="message-item"
                     v-for="conversation in conversations"
                     :key="conversation.id"
                     :class="{active: $route.params.conversation &&  $route.params.conversation === conversation.id}">
            <div class="message-avatar"
                 :style="`background-image: url(${conversation.participant.avatar})`">
              <img width="60" height="60" :src="conversation.participant.avatar" alt="post-avatar">
            </div>
            <div class="message-content">
              <div class="message-user">
                <div class="message-user-name">
                  <span class="message-user-themes"
                        v-text="conversation.participant.name"></span><span class="message-user-business">Business</span>
                </div>
                <div class="message-user-date">
                  09:00 PM
                </div>
              </div>
              <div class="message-description" v-text="conversation.last_message.message">
              </div>
            </div>
          </nuxt-link>
        </ul>
        <div class="message-chat">
          <div class="message-chat-container">
            <nuxt-child></nuxt-child>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: "UserMessages",

    middleware: ['auth'],

    async fetch({ store }) {
      await store.dispatch('user-conversations/index', { params: {} });
    },

    computed: {
      ...mapState('user-conversations', {
        conversations: state => state.list,
        meta: state => state.meta
      })
    }
  }
</script>

<style scoped>

</style>
