<template>
  <!-- MAIN -->
  <main id="main" class="site-main bg-primary">

    <!-- Back to category -->
    <div class="back-to dest-back-to">
      <div class="container">
        <nuxt-link :to="localePath({name: 'destinations-id-airlines-entity', params: $route.params})">Back to
          {{ item.title }}
        </nuxt-link>
      </div>
    </div>

    <!-- DESTINATION ADD REVIEW -->
    <div class="section dest-add-review">
      <div class="container">
        <header class="section-header">
          <h1>Review {{ item.title }}</h1>
        </header>

        <div class="form-wrap row align-items-center justify-content-between">
          <div class="form-group form-group-rate col-12">
            <div class="rates">
              <input type="radio"
                     name="rating"
                     id="review-rate-5"
                     value="5"
                     v-model="review.rating">
              <label for="review-rate-5">5 stars</label>
              <input type="radio"
                     name="rating"
                     id="review-rate-4"
                     value="4"
                     v-model="review.rating">
              <label for="review-rate-4">4 stars</label>
              <input type="radio"
                     name="rating"
                     id="review-rate-3"
                     value="3"
                     v-model="review.rating">
              <label for="review-rate-3">3 stars</label>
              <input type="radio"
                     name="rating"
                     id="review-rate-2"
                     value="2"
                     v-model="review.rating">
              <label for="review-rate-2">2 stars</label>
              <input type="radio"
                     name="rating"
                     id="review-rate-1"
                     value="1"
                     v-model="review.rating">
              <label for="review-rate-1">1 star</label>
            </div>
          </div>
          <div class="form-group col-12">
            <label for="review-messsage" class="sr-only"></label>
            <textarea name="messsage"
                      id="review-message"
                      rows="10"
                      v-model="review.message"
                      class="form-control"
                      placeholder="Tell us more about your experience."></textarea>
          </div>
          <div class="form-files col-auto row">
            <div class="form-group form-file" v-for="(image, key) in review.images">
              <label :class="{'has-image': image.preview}"
                     :style="`background-image: url(${image.preview})`">
                <input type="file" @change="uploadImage($event, key)">
              </label>
            </div>
          </div>
          <div class="form-button col-auto">
            <button @click.prevent="createReview"
                    type="submit"
                    class="btn btn-sm btn-primary-dark2 w-250p">Save Review
            </button>
          </div>

          <strong v-if="!geoLocationUnavailable">
            We cannot detect your location!
          </strong>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
  const entityName = 'airlines';
  import {objectToFormData} from 'object-to-formdata';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "DestinationAirlineReview",

    data() {
      return {
        geoLocationUnavailable: false,
        review: {
          rating: null,
          message: '',
          images: [],
          latitude: null,
          longitude: null,
        }
      }
    },

    created() {
      for (let i = 0; i < 5; i++) {
        this.review.images.push({});
      }
    },

    async mounted() {
      this.getLocation();
    },

    computed: {
      ...mapState(entityName, {
        item: state => state.model
      }),

      availableToUploadCount() {
        return 5 - this.review.images.length;
      }
    },

    methods: {
      async createReview() {
        const images = {
          images: Object.values(this.review.images)
          .map(({ image }) => image)
          .filter(item => item !== undefined)
        };

        try {
          const { data } = await this.$store.dispatch('reviews/create',
            {
              entityName,
              entityId: this.$route.params.entity,
              data: objectToFormData({ ...this.review, ...images })
            });

          this.$router.push({
            name: `destinations-id-${entityName}-entity`,
            params: this.$route.params
          })
        }
        catch (e) {
          console.error(e)
        }
      },

      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            const { latitude, longitude } = coords;

            this.review.latitude = latitude;
            this.review.longitude = longitude;
          });
        } else {
          this.geoLocationUnavailable = true;
        }
      },

      async uploadImage(e, key) {
        const images = Object.assign({}, this.review.images);

        const image = e.target.files[0];
        const preview = await this.readFileAsync(image);

        images[key] = { image, preview };

        this.$set(this.review, 'images', images);
      },

      readFileAsync(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.onerror = reject;

          reader.readAsDataURL(file);
        })
      },
    }
  }
</script>

<style scoped>

</style>
