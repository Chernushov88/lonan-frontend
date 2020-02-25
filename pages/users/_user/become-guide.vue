<template>
  <article class="post">
    <section class="settings-content guide">
      <div class="row flex-xl-nowrap align-items-start">
        <div class="flex-xl-basis-9 profile-settings-content section-items">
          <section class="post-settings settings-guide-success">
            <div v-if="!success" class="sub-title sub-title-6 bold-900">Sign Up As a Guide</div>
            <div v-if="!success" class="settings-form">
              <form @submit.prevent="onFormSubmit">
                <div class="row">
                  <div class="form-group col-12">
                    <label for="address">Business Address</label>
                    <vue-google-autocomplete
                      id="address"
                      required
                      v-model="guide.address"
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
                                   @input="({id}) => guide.destination_id = id">
                      </multiselect>
                    </client-only>
                  </div>
                  <div class="form-group col-12">
                    <label for="contact-city">Town/City</label>
                    <input type="text"
                           v-model="guide.city"
                           id="contact-city"
                           placeholder="City"
                           class="form-control"
                           required="">
                  </div>

                  <div class="form-group col-12 col-sm-6">
                    <label for="contact-province">State/Province</label>
                    <input type="text"
                           id="contact-province"
                           v-model="guide.state"
                           placeholder="State"
                           class="form-control"
                           required="">
                  </div>
                  <div class="form-group col-12 col-sm-6">
                    <label for="contact-country">Country</label>
                    <input type="text"
                           id="contact-country"
                           v-model="guide.country"
                           class="form-control"
                           placeholder="Country"
                           required="">
                  </div>

                  <div class="form-group col-12">
                    <label for="contact-personal">Personal Website</label>
                    <input type="text"
                           v-model="guide.website"
                           id="contact-personal"
                           placeholder="Website"
                           class="form-control">
                  </div>
                  <div class="form-group col-12 col-sm-6">
                    <label for="contact-phone">Phone Number</label>
                    <input type="text"
                           name="email"
                           placeholder="Phone"
                           id="contact-phone"
                           v-model="guide.phone"
                           class="form-control"
                           required="">
                  </div>
                  <div class="form-group col-12 col-sm-6">
                    <label for="contact-emails">Contact Email</label>
                    <input type="email"
                           placeholder="Contact Email"
                           v-model="guide.contact_email"
                           id="contact-emails"
                           class="form-control"
                           required="">
                  </div>
                  <div class="form-group col-12 col-sm-12">
                    <label for="contact-hourly-rate">Your Hourly Rate</label>
                    <input type="number"
                           v-model="guide.price"
                           id="contact-hourly-rate"
                           class="form-control"
                           required="">
                  </div>
                  <div class="form-group col-12">
                    <label for="contact-work-hours">Work hours</label>
                    <div class="row" v-for="workingHour in guide.working_hours">
                      <div class="form-group col-12 col-sm-6">
                        <select name="category"
                                id="contact-work-hours"
                                class="form-control"
                                v-model="workingHour.day">
                          <option disabled :value="null">Select date</option>
                          <option v-for="(day, index) in $moment.weekdays(true)"
                                  v-text="day"
                                  :value="index"></option>
                        </select>
                      </div>
                      <div class="form-group col-12 col-sm-3">
                        <select name="category"
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
                        <select name="category"
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
                  <div class="form-button col-12">
                    <button type="button"
                            @click="guide.working_hours.push({day: null, started_at: null, ended_at: null})"
                            class="btn btn-outline-primary-dark3 ic-add ic--left w-190p text-left">
                      <span class="ic-wrap"></span>Add Another Day
                    </button>
                  </div>
                  <div class="border-line margin-bottom-18p margin-top-20p"></div>

                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit"
                          class="btn btn-primary ic-angle-right ic--right w-190p text-left">
                    <span class="ic-wrap"></span>Sign Up
                  </button>
                </div>
              </form>
            </div>

            <div class="post-settings-guide container-xs" v-if="success">
              <h2 class="post-settings-title-h2 bold-900">Thank you for signing up</h2>
              <div class="description">
                Lonan agents will review your profile and verify your account
              </div>
              <div class="post-settings-signing-icon"></div>
            </div>
          </section>
        </div>
        <div class="flex-xl-basis-3 profile-settings-sidebar right-sidebar-banner section-items">

        </div>
      </div>
    </section>
  </article>
</template>

<script>
  export default {
    name: "BecomeGuide",

    async validate({ store, $auth }) {
      return store.state.users.model.id === $auth.user.id;
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
      onStartedAtChange({ started_at, ended_at }) {
        ended_at = this.$moment(started_at).add(8, 'hours').format('hh:mm A');
      },

      async onFormSubmit() {
        try {
          const { data } = await this.$axios.$post('users/become-guide', this.guide);

          this.success = true;
        }
        catch (e) {

        }
      },

      async onPlaceChanged({ locality, latitude, longitude, administrative_area_level_1, country }, { formatted_address }) {

        try {
          this.isDestinationLoading = true;

          this.guide.address = formatted_address;
          this.guide.country = country;
          this.guide.city = locality;
          this.guide.state = administrative_area_level_1;

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
    },

    data() {
      return {
        isDestinationLoading: false,
        destinations: [],
        destination: null,
        isDestinationLoadedOnce: false,
        guide: {
          contact_email: '',
          website: '',
          destination_id: null,
          address: '',
          city: '',
          price: 0,
          country: '',
          state: '',
          phone: '',
          working_hours: [
            {
              day: null,
              started_at: null,
              ended_at: null
            }
          ]
        },
        success: Boolean(this.$parent.user.is_guide) || false,
      }
    }
  }
</script>

<style scoped>

</style>
