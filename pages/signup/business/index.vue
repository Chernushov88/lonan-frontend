<template>
  <div class="signIn-business-content-login">
    <form @submit.prevent="step++" v-show="step === 1">
      <div class="signIn-business-content-login-form">
        <h1 class="signIn-business-content-login-title text-center sub-title-2 sub-title-text-color bold-900">
          Sign up your business</h1>
        <div class="description signIn-business-content-login-description text-center">
          Let’s Start with the basics
        </div>
        <div class="row">
          <div class="form-group col-12">
            <label for="signIn-name">Business Name</label>
            <input type="text"
                   name="signIn name"
                   v-model="business.title"
                   id="signIn-name"
                   class="form-control"
                   required="">
          </div>
          <div class="form-group col-12 form-select">
            <label for="contact-category">Business Category</label>
            <select name="category"
                    id="contact-category"
                    class="form-control"
                    v-model="business.category">
              <option :value="null" disabled>Please select one</option>
              <option v-for="(category, namespace) in categories"
                      :value="namespace"
                      v-text="category"></option>
            </select>
          </div>
          <div class="form-group col-12">
            <label for="signIn-email">Login Email</label>
            <input type="email"
                   name="signIn email"
                   v-model="user.email"
                   id="signIn-email"
                   class="form-control"
                   required="">
          </div>
          <div class="form-group col-12">
            <label for="signIn-password">Password</label>
            <input type="password"
                   name="signIn password"
                   v-model="user.password"
                   id="signIn-password"
                   class="form-control"
                   required="">
          </div>
          <div class="form-group col-12">
            <label for="signIn-confirm-password">Confirm Password</label>
            <input type="password"
                   name="signIn confirm-password"
                   id="signIn-confirm-password"
                   v-model="user.password_confirmation"
                   class="form-control"
                   required="">
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit"
                class="btn btn-primary ic-angle-right-2 ic--right w-100pr w-sm-190p text-left">
          <span class="ic-wrap"></span>Continue
        </button>
      </div>
    </form>
    <form v-if="step === 2" @submit.prevent="onBusinessRegister">
      <div class="signIn-business-content-info-form">
        <h1 class="signIn-business-content-info-title text-center sub-title-2 sub-title-text-color bold-900">
          Hello, Business Name</h1>
        <div class="description signIn-business-content-info-description text-center">
          Let’s add some contact information for your clients
        </div>
        <div class="row">
          <div class="form-group  col-12">
            <div class="load-img-wrapper">
              <label for="load-profile-pic"
                     :style="`background-image: url('${previewImage}');background-size: contain;`"
                     class="load-img">
                <span>Profile Picture</span>
              </label>
              <input type="file"
                     id="load-profile-pic"
                     @change="handleImageUpload($event)"
                     class="load-profile-pic">
            </div>
          </div>
          <div class="form-group col-12">
            <label for="signIn-address">Full Address</label>
            <vue-google-autocomplete
              id="address"
              required
              v-model="business.address"
              @placechanged="onPlaceChanged"
              classname="form-control"
              placeholder="Address">
            </vue-google-autocomplete>
          </div>
          <div class="form-group col-12" v-if="isDestinationLoadedOnce">
            <label for="contact-destination">Event Destination</label>
            <client-only>
              <multiselect track-by="id"
                           :searchable="true"
                           v-model="destination"
                           label="title"
                           :options="destinations"
                           @input="({id}) => business.destination_id = id">
              </multiselect>
            </client-only>
          </div>
          <div class="form-group col-12">
            <label for="signIn-website">Website</label>
            <input type="text"
                   name="signIn website"
                   v-model="business.website"
                   id="signIn-website"
                   class="form-control"
                   required="">
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="signIn-phone-number">Phone Number</label>
            <input type="tel"
                   v-model="business.phone"
                   name="signIn phone-number"
                   id="signIn-phone-number"
                   class="form-control"
                   required="">
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="signIn-contact-email">Contact Email</label>
            <input type="email"
                   v-model="business.contact_email"
                   name="signIn contact-email"
                   id="signIn-contact-email"
                   class="form-control"
                   required="">
          </div>
          <div class="form-group col-12 form-select">
            <label for="signIn-work-hours-day">Work hours</label>
            <div class="row" v-for="workingHour in business.working_hours">
              <div class="form-group col-12 col-sm-6">
                <select id="contact-work-hours"
                        class="form-control"
                        v-model="workingHour.day">
                  <option disabled :value="null">Select date</option>
                  <option v-for="(day, index) in $moment.weekdays(true)"
                          v-text="day"
                          :value="index"></option>
                </select>
              </div>
              <div class="form-group col-12 col-sm-3">
                <select
                  id="start-events"
                  class="form-control"
                  v-model="workingHour.started_at"
                  @input="onStartedAtChange(workingHour)">
                  <option :value="null" disabled>Select start ed at</option>
                  <option :disabled="!$moment(hour, 'hh:mm A').isBefore($moment(workingHour.ended_at, 'hh:mm A')) && workingHour.started_at !== null"
                          v-for="hour in time"
                          v-text="$moment(hour).format('hh:mm A')"></option>
                </select>
              </div>
              <div class="form-group col-12 col-sm-3">
                <select
                  id="end-events"
                  class="form-control"
                  v-model="workingHour.ended_at"
                  :disabled="workingHour.started_at === null">
                  <option :value="null" disabled>Select ended at</option>
                  <option :disabled="!$moment(hour, 'hh:mm A').isAfter($moment(workingHour.started_at, 'hh:mm A'))"
                          v-for="hour in time"
                          v-text="$moment(hour).format('hh:mm A')"></option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-button col-12 form-btn-footer">
            <button type="button"
                    @click="business.working_hours.push({day: null, started_at: null, ended_at: null})"
                    class="btn btn-outline-primary-dark3 ic-add ic--left w-100pr w-sm-190p text-left another-day-js">
              <span class="ic-wrap"></span>Add Another Day
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit"
                class="btn btn-primary ic-angle-right-2 ic--right w-100pr w-sm-190p text-left">
          <span class="ic-wrap"></span>Sign Up
        </button>
      </div>
    </form>
    <div class="signIn-business-content-thanks" v-if="step === 3">
      <h1 class="signIn-business-content-info-title text-center sub-title-2 sub-title-text-color-2 bold-900">Thank you for claiming your business</h1>
      <div class="description signIn-business-content-info-description text-center">
        Lonan agents will review your profile and verify your claim
      </div>
      <div class="signIn-business-icons-thanks margin-auto"></div>
      <div class="w-100pr mw-sm-350p margin-auto">
        <nuxt-link :to="{name: 'login-business'}" class="btn btn-primary ic-angle-right-2 ic--right w-100pr text-left">
          <span class="ic-wrap"></span>Login to your account
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { objectToFormData } from 'object-to-formdata';

  export default {
    name: "BusinessSignUp",

    data() {
      return {
        step: 1,
        previewImage: null,
        isDestinationLoading: false,
        destinations: [],
        destination: null,
        isDestinationLoadedOnce: false,

        user: {
          email: '',
          password: '',
          password_confirmation: ''
        },
        business: {
          title: '',
          cover: null,
          category: null,
          contact_email: '',
          address: '',
          phone: '',
          destination_id: null,
          website: '',
          working_hours: [{
            day: null,
            started_at: null,
            ended_at: null
          }]
        },
      }
    },

    async asyncData({ $axios }) {
      const categories = await $axios.$get('venue-types');

      return {
        categories
      }
    },

    computed: {
      time() {
        let tmp = [];
        for (let i = 0; i < 24; i++) {
          tmp.push(this.$moment('00:00 AM', 'hh:mm A').add(i, 'hours'))
        }

        return tmp;
      }
    },

    methods: {
      async onPlaceChanged({ locality, latitude, longitude }, { formatted_address }) {

        try {
          this.isDestinationLoading = true;

          this.business.address = formatted_address;
          this.business.location = {
            latitude,
            longitude
          };

          if (locality) {
            const { data } = await this.$axios.$get(`destinations/${locality}`);

            this.business.destination_id = data.id;
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

      onBusinessRegister: async function () {
        const mappedWorkingHours = {};

        for (let key in this.business.working_hours) {
          mappedWorkingHours[key] = this.business.working_hours[key];
        }

        const payload = {
          user: this.user,
          business: {
            ...this.business,
            working_hours: mappedWorkingHours
          }
        };

        try {
          const { data } = await this.$axios.$post('business/register', objectToFormData(payload));

          this.step = 3;
        }
        catch (e) {

        }
      },

      async handleImageUpload($event) {
        const image = $event.target.files[0];

        this.business.cover = image;

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

      onStartedAtChange({ started_at, ended_at }) {
        ended_at = this.$moment(started_at).add(8, 'hours').format('hh:mm A');
      },
    }
  }
</script>

<style scoped>

</style>
