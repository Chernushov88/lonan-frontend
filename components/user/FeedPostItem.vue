<template>
  <div class="post-block">
    <div class="post-header">
      <div class="post-header-avatar">
        <img :src="post.user.avatar" alt="post-avatar">
      </div>
      <div class="post-header-info">
        <div class="post-header-autor" v-text="post.user.name"></div>
        <div class="post-header-locations">
          <div class="post-header-locations-place">Mexico</div>
          <div class="post-header-locations-date">{{ $moment(post.created_at).format('MMMM D, YYYY')
            }}
          </div>
        </div>
        <div class="post-options icon-options">
          <button class="icon post-options-items icon-favor"
                  type="button"
                  @click="toggleLike"
                  title="favor"></button>
          <button class="icon post-options-items icon-share"
                  type="button"
                  title="share"></button>
          <button class="icon post-options-items icon-more"
                  type="button"
                  title="more"></button>
        </div>
      </div>
    </div>
    <div class="post-content">
      <div class="post-content-gallery" v-if="post.gallery.length > 1">
        <div class="post-content-gallery-list">
          <div class="post-content-gallery-item" v-for="(item,index) in post.gallery">
            <a href="#"
               @click.prevent="showImg(index)"
               class="gallery-wrap">
              <img :src="item.url"
                   width="214"
                   height="214">
            </a>
          </div>
        </div>
      </div>
      <div class="post-content-image" v-else-if="post.gallery.length === 1">
        <img :src="post.gallery[0].url" alt="content-image">
      </div>

      <div class="post-content-description show-all icon-options"
           :class="{active: isActive, hide: !isActive}">
        <div class="description">
          <p v-text="post.content"></p>
        </div>
        <!--        <button type="button" class="icon post-content-show" @click="isActive = !isActive"></button>-->
      </div>
    </div>
    <div class="post-footer" v-if="!comment">
      <div class="post-options icon-options post-count">
        <div class="post-count-item">
          <button class="icon post-options-items icon-comment"
                  type="button"
                  @click="commentsExpanded = !commentsExpanded"
                  :class="{active: commentsExpanded}"
                  title="more"></button>
          <span v-text="post.children_count"></span>
        </div>
        <div class="post-count-item">
          <button class="icon post-options-items icon-favor"
                  @click="toggleLike"
                  type="button"
                  title="favor"></button>
          <span v-text="post.likers_count + Number(post.is_liked)"></span>
        </div>
        <div class="post-count-item">
          <button class="icon post-options-items icon-share"
                  type="button"
                  title="share"></button>
        </div>
      </div>
    </div>
    <div class="post-comments" v-show="commentsExpanded">
      <div class="comments-list">
        <FeedPostItem v-for="child in post.children" :key="child.id" :post="child" :comment="true"></FeedPostItem>
      </div>
      <div class="write-comment">
        <div class="post-header-avatar">
          <img :src="post.user.avatar" alt="post-avatar">
        </div>
        <div class="formular">
          <form @submit.prevent="onCommentSubmit" class="comment-form">
            <textarea type="text"
                      class="comment-text form-control"
                      v-model="postComment.content"
                      placeholder="Type something..."></textarea>
            <button type="submit" class="comment-submit btn align-left btn-primary btn-next">Send
            </button>
          </form>
        </div>
      </div>
    </div>
    <portal to="lightbox">
      <vue-easy-lightbox
        :visible="lightbox.visible"
        :imgs="images"
        :index="lightbox.index"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </portal>
  </div>
</template>

<script>
  import HasLightbox from '@/mixins/HasLightbox';

  export default {
    name: "FeedPostItem",

    props: {
      post: {
        required: true
      },

      comment: {
        required: false,
        default() {
          return false;
        }
      }
    },

    mixins: [HasLightbox],

    computed: {
      images() {
        return this.post.gallery.map(item => item.url);
      },
    },

    methods: {
      async onCommentSubmit() {
        try {
          const { data } = await this.$axios.$post(`users/${this.$route.params.user}/feed/${this.post.route_key}`,
            this.postComment);

          await this.$parent.fetchFeed();

          this.postComment.content = '';
        }
        catch (e) {

        }
      },
      async toggleLike() {
        try {
          if (this.post.is_liked) {
            const { data } = await this.$axios.$post(`users/${this.$route.params.user}/feed/${this.post.route_key}/unlike`)
            this.post.is_liked = data.is_liked;
          } else {
            const { data } = await this.$axios.$post(`users/${this.$route.params.user}/feed/${this.post.route_key}/like`)
            this.post.is_liked = data.is_liked;
          }

        }
        catch (e) {

        }
      }
    },

    data() {
      return {
        isActive: false,
        commentsExpanded: false,
        postComment: {
          content: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
