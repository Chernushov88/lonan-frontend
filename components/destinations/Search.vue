<template>
  <div id="search-modal" class="modal active">
    <div class="modal-fon" @click="toggleSearch"></div>
    <div class="modal-content" style="top: calc(50% - 100px);">
      <div class="region-search">
        <form action="#">
          <div class="row">
            <div class="col-12">
              <div class="form-group region-search-group">
                <multiselect :loading="isLoading"
                             :options="destinations"
                             label="title"
                             v-model="destination"
                             class="form-control region-search-input"
                             @search-change="asyncFind">
                  <template slot="noResult">
                    {{ $t('search-results-empty') }}
                  </template>
                </multiselect>
                <button type="submit" name="search-modal-btn" class="region-search-btn"></button>
              </div>
              <div class="region-search-result" v-if="false">
                <div class="sub-title sub-title-6 sub-title-text-color">Popular or Recent
                  Destinations
                </div>
                <ul class="region-search-result-list">
                  <li class="region-search-result-item">Miami, Fl</li>
                  <li class="region-search-result-item">New York, NY</li>
                  <li class="region-search-result-item">London, UK</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "Search",

    data() {
      return {
        destinations: this.$store.state.destinations.model ? [this.$store.state.destinations.model] : [],
        isLoading: false,
        destination: this.$store.state.destinations.model || null
      }
    },

    watch: {
      destination(entity) {
        if (entity) {
          const { route_key } = entity;

          this.toggleSearch();

          this.$router.push({
            name: 'destinations-destination',
            params: { destination: route_key }
          })
        }
      }
    },

    methods: {
      ...mapActions('destinations', ['toggleSearch']),

      async asyncFind(query) {
        this.isLoading = true;
        try {
          const { data } = await this.$axios.$get('destinations', { params: { query } })

          this.destinations = data;
        }
        catch (e) {

        }

        this.isLoading = false;
      }
    }
  }
</script>

<style>
  .region-search .multiselect {
    padding: 0;
  }

  .region-search .multiselect__tags {
    border: 0;
    background: none;
    border-radius: 0;
    padding: 0;
    min-height: 0;
  }

  .region-search .region-search-group:before,
  .region-search .region-search-btn {
    z-index: 101;
  }

  .region-search .multiselect__placeholder,
  .region-search .multiselect__input,
  .region-search .multiselect__single {
    width: 100% !important;
    display: block;
    padding: 13px 55px !important;
    font-weight: normal;
    font-size: 16px;
    line-height: 30px;
    border-radius: 30px;
    color: #333;
    margin-bottom: -2px;
    border: none;
  }

  .region-search .multiselect__input {
    background: none;
  }

  .region-search .multiselect__select {
    display: none;
  }
  .region-search .region-search-input{
    border-radius: 10px;
    border: 1px solid #e8e8e8;
  }
  .region-search .multiselect__content-wrapper {
    max-width: 100vw !important;
    width: 352px;
    left: 50%;
    border-radius: 0 0 5px 5px;
    transform: translate(-50%, 0);
    background: none;
    background-color: rgba(255, 255, 255, 1) !important;
  }

  .region-search .multiselect__content-wrapper .multiselect__element {
    margin: 0;
  }
  .multiselect__content-wrapper .multiselect__option{
    text-align: left;
    color: #000;
    padding: 15px 20px;
  }
  .multiselect__content-wrapper .multiselect__option:after{
    display: none;
  }
  .multiselect__content-wrapper .multiselect__option--highlight{
    background-color: #f1f2f4;
  }
  .multiselect__content-wrapper .multiselect__option--selected.multiselect__option--highlight {
    background-color: #f1f2f4;
    color: #000;
    font-weight: 400;

  }
</style>
