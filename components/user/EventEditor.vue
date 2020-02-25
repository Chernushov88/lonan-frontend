<template>
  <div class="settings-form">
    <form @submit.prevent="$emit('submit')">
      <div class="d-flex align-items-center flex-wrap justify-content-sm-between">
        <div class="col-sm-6 col-md-12 col-lg-6 sub-title bold-900 sub-title-6 margin-bottom-35p">
          Event Description
        </div>
        <div class="col-sm-6 col-md-12 col-lg-6 d-flex align-items-center justify-content-between margin-bottom-35p">
          <nuxt-link :to="{name: 'users-user-events', params: $route.params}"
                  class="btn btn-default-dark margin-right-16 btn-radius w-95p">Cancel
          </nuxt-link>
          <button type="submit" class="btn btn-primary btn-radius w-138p">Save</button>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-12">
          <div class="load-img"
               :style="`background-image: url('${(typeof event.cover === 'string' || event.cover instanceof String) ? event.cover : previewImage}')`"
               @click="() => {this.$refs.file.click()}"></div>
          <input type="file" @change="handleImageUpload($event)" hidden ref="file">
        </div>
        <div class="form-group col-12">
          <label for="contact-name">Event Name</label>
          <input type="text"
                 name="Event Name"
                 v-model="event.title"
                 id="contact-name"
                 class="form-control"
                 required="">
        </div>
        <div class="form-group col-12">
          <label for="contact-category">Event Category</label>
          <select name="category"
                  id="contact-category"
                  class="form-control"
                  v-model="event.category_id">
            <option :value="''">Please select one</option>
            <option :value="category.id"
                    v-for="category in categories"
                    v-text="category.title"></option>
          </select>
        </div>
        <div class="form-group col-12">
          <label for="contact-address">Event Location Address</label>
          <client-only>
            <vue-google-autocomplete
              id="address"
              required
              v-model="event.address"
              @placechanged="onPlaceChanged"
              classname="form-control"
              placeholder="Address">
            </vue-google-autocomplete>
          </client-only>
        </div>
        <div class="form-group col-12" v-if="isDestinationLoadedOnce">
          <label for="contact-destination">Event Destination</label>
          <client-only>
            <multiselect track-by="id"
                         :searchable="true"
                         v-model="destination"
                         label="title"
                         :options="destinations"
                         @input="({id}) => event.destination_id = id">
            </multiselect>
          </client-only>
        </div>
        <div class="form-group col-12 col-sm-9">
          <label>Purchase Link</label>
          <input type="text"
                 v-model="event.purchase_link"
                 class="form-control"
                 required="">
        </div>
        <div class="form-group col-12 col-sm-3">
          <label for="contact-email">Base Price</label>
          <input type="number"
                 name="email"
                 v-model="event.base_price"
                 id="contact-email"
                 class="form-control"
                 required="">
        </div>

        <div class="form-group col-12">
                    <textarea name="message"
                              id="contact-message"
                              v-model="event.description"
                              rows="7"
                              class="form-control"
                              placeholder="Let's add some description"></textarea>
        </div>
        <div class="d-flex align-items-center justify-content-sm-between col-12">
          <div class="sub-title bold-900 sub-title-6">Date &amp; Time</div>
        </div>
        <div class="form-group col-12 col-sm-6">
          <label for="contact-start-date">Event Start</label>
          <datetime v-model="event.started_at" type="date" input-class="form-control"></datetime>
        </div>
        <div class="form-group col-12 col-sm-6">
          <label for="contact-start-time">Event End</label>
          <datetime v-model="event.ended_at" type="date" input-class="form-control"></datetime>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { objectToFormData } from 'object-to-formdata';

  export default {
    name: "EventEditor",
    props: ['event', 'categories'],

    data() {
      return {
        isDestinationLoading: false,
        destinations: [],
        destination: null,
        isDestinationLoadedOnce: false,
        previewImage: null
      }
    },

    methods: {
      async onPlaceChanged({ locality, latitude, longitude }, { formatted_address }) {

        try {
          this.isDestinationLoading = true;

          this.event.address = formatted_address;
          this.event.location = {
            latitude,
            longitude
          };

          if (locality) {
            const { data } = await this.$axios.$get(`destinations/${locality}`);

            this.event.destination_id = data.id;
          } else {
            throw Error;
          }
        }
        catch (e) {
          this.fetchDestinations();
          this.isDestinationLoadedOnce = true;
        }


        this.isDestinationLoading = false;
      },
      async fetchDestinations() {
        try {
          const { data } = await this.$axios.$get(`destinations`);

          this.destinations = data;
        }
        catch (e) {

        }
      },
      async handleImageUpload($event) {
        const image = $event.target.files[0];

        this.event.cover = image;

        this.previewImage = await this.readFileAsync(image);
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
  .load-img {
    cursor: pointer;
    background-size: 100%;
  }
</style>
