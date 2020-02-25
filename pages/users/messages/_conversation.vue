<template>
  <div>
    <div class="message-chat-header">
      <div class="message-chat-avatar">
        <img width="53" height="53" :src="conversation.participant.avatar" alt="post-chat-avatar">
      </div>
      <div class="message-user message-chat-header-user">
        <div class="message-user-name">
          <span class="message-user-themes" v-text="conversation.participant.name"></span>
        </div>
        <button type="button" class="btn btn-icons close btn-icons-delete"></button>
      </div>
    </div>
    <div class="message-chat-content">
      <div class="message-chat-list" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}">
        <div class="message-chat-item" v-for="message in messages">
          <div class="message-chat-avatar">
            <img width="53"
                 height="53"
                 :src="message.sender.avatar"
                 alt="post-chat-avatar">
          </div>
          <div class="message-chat-description">
            <div class="message-user-name">
              <span class="message-user-themes" v-text="message.sender.name">Jonathan Smith</span>
            </div>
            <div class="description" v-text="message.message">
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="message-chat-footer">
      <form @submit.prevent="onMessageSubmit">
        <input type="text"
               class="text-message"
               placeholder="Type your message here"
               v-model="message">
        <button class="btn btn-icons btn-icons-confirm"></button>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: "UserMessageConversation",

    data() {
      return {
        message: ''
      }
    },

    mounted() {
      this.$echo.private(`conversation-${this.conversation.id}`)
      .listen('.IncomingMessage', (payload) => {
        this.messages.push(payload.message);
      });
    },

    async validate({ store, params }) {
      await store.dispatch('user-conversations/show', { route_key: params.conversation })

      return Boolean(store.state['user-conversations'].model);
    },

    computed: {
      ...mapState('user-conversations', {
        messages: state => state.messages,
        conversation: state => state.model,
      })
    },

    methods: {
      async onMessageSubmit() {
        try {
          const { data } = await this.$axios.$post(`users/conversations/${this.conversation.route_key}`,
            { message: this.message }, {
              headers: {
                'X-Socket-ID': this.$echo.socketId()
              }
            });

          this.messages.push(data)
          this.message = '';
        }
        catch (e) {

        }
      }
    },

    async fetch({ store, params }) {
      await store.dispatch('user-conversations/messages', { route_key: params.conversation })
    }
  }
</script>

<style scoped>
  .message-chat-list {
    overflow: auto;
    max-height: 350px;
  }
</style>
