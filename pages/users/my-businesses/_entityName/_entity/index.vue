<template>
  <main id="main" class="">

    <div class="venue-profile d-flex">
      <aside class="venue-profile-aside">
        <ul>
          <li><a href="#">Business Information</a></li>
          <li><a href="#">Description / About</a></li>
          <li><a href="#">Photos</a></li>
          <li><a href="#">Reviews</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
        <button class="venue-profile-logout" aria-label="logout button">Signout</button>
      </aside>
      <div class="venue-profile-body active">
        <div class="venue-profile-item active">
          <div class="back-to dest-back-to">
            <a href="#">Business Information</a>
          </div>
          <form action="#">
            <div class="venue-profile-head d-flex align-items-lg-center justify-content-between">
              <h4>Business Information</h4>
              <div class="btns">
                <button class="btn btn-rounded btn-dropdown-close w-190p">Cancel</button>
                <button class="btn btn-rounded btn-primary w-190p">Save</button>
              </div>
            </div>
            <div class="venue-profile-form">
              <div class="settings-form">
                <div class="row">
                  <div class="form-group  col-12">
                    <label class="load-label">
                      <input type="file">
                      <div class="load-img"
                           :style="`background-image: url('${previewImage ? previewImage : entity.cover}');background-size: contain;`"
                      ></div>
                    </label>

                  </div>
                  <div class="form-group col-12">
                    <label for="signIn-address">Full Address</label>
                    <vue-google-autocomplete
                      id="address"
                      required
                      v-model="entity.address"
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
                                   @input="({id}) => entity.destination_id = id">
                      </multiselect>
                    </client-only>
                  </div>
                  <div class="form-group col-12">
                    <label for="signIn-website">Website</label>
                    <input type="text"
                           name="signIn website"
                           v-model="entity.website"
                           id="signIn-website"
                           class="form-control"
                           required="">
                  </div>
                  <div class="form-group col-12 col-sm-6">
                    <label for="signIn-phone-number">Phone Number</label>
                    <input type="tel"
                           v-model="entity.phone"
                           name="signIn phone-number"
                           id="signIn-phone-number"
                           class="form-control"
                           required="">
                  </div>
                  <div class="form-group col-12 col-sm-6">
                    <label for="signIn-contact-email">Contact Email</label>
                    <input type="email"
                           v-model="entity.contact_email"
                           name="signIn contact-email"
                           id="signIn-contact-email"
                           class="form-control"
                           required="">
                  </div>
                  <div class="form-group col-12 form-select">
                    <label for="signIn-work-hours-day">Work hours</label>
                    <div class="row" v-for="workingHour in entity.working_hours">
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
                            @click="entity.working_hours.push({day: null, started_at: null, ended_at: null})"
                            class="btn btn-outline-primary-dark3 ic-add ic--left">
                      <span class="ic-wrap"></span>Add Another Day
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: "EntityEdit",

    data() {
      return {
        previewImage: null,
        isDestinationLoading: false,
        destinations: [],
        destination: null,
        isDestinationLoadedOnce: false,
      }
    },

    computed: {
      time() {
        let tmp = [];
        for (let i = 0; i < 24; i++) {
          tmp.push(this.$moment('00:00 AM', 'hh:mm A').add(i, 'hours'))
        }

        return tmp;
      },
      entity() {
        return this.$store.state[this.$route.params.entityName].model;
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
      onStartedAtChange({ started_at, ended_at }) {
        ended_at = this.$moment(started_at).add(8, 'hours').format('hh:mm A');
      },
    }
  }
</script>

<style scoped>

</style>
