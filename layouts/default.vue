<template>
  <div>
    <Version/>
    <!-- HEADER -->
    <header class="site-header header">
      <div class="container">
        <div class="header-container d-flex align-items-center justify-content-between">
          <!-- Logo -->
          <nuxt-link :to="{path: '/'}" class="logo" rel="home" itemprop="url">
            <img src="/img/logo.png"
                 width="465"
                 height="228"
                 class="d-none d-md-block"
                 title="Lonan"
                 alt="Lonan"
                 itemprop="logo">
            <img src="/img/logo-mob.png"
                 width="60"
                 height="60"
                 class="d-md-none"
                 title="Lonan"
                 alt="Lonan"
                 itemprop="logo">
          </nuxt-link>

          <div class="header-search dropdown"
               v-if="$route.params.destination && $store.state.destinations.model">
            <button type="button"
                    data-modal="search-modal"
                    class="dropdown-toggle modal-button"
                    @click="toggleSearch">
              <div class="ic-wrap">
                <svg viewBox="0 0 17 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.714 15.431a.4.4 0 0 0-.546.149c-1.804 3.162-3.964 6.225-4.768 7.34C6.916 20.86.8 12.142.8 8.4.8 4.21 4.21.8 8.4.8 12.59.8 16 4.21 16 8.4c0 .978-.434 2.404-1.292 4.238a.4.4 0 0 0 .725.34C16.34 11.035 16.8 9.496 16.8 8.4c0-4.632-3.768-8.4-8.4-8.4C3.768 0 0 3.768 0 8.4c0 4.5 7.75 14.994 8.08 15.438a.398.398 0 0 0 .642 0c.028-.038 2.864-3.87 5.142-7.861a.401.401 0 0 0-.15-.546zm-1.936-4.217A4.38 4.38 0 0 0 12.8 8.4c0-2.426-1.974-4.4-4.4-4.4A4.405 4.405 0 0 0 4 8.4c0 2.426 1.974 4.4 4.4 4.4a4.38 4.38 0 0 0 2.813-1.02l4.104 4.103a.402.402 0 0 0 .565 0 .4.4 0 0 0 0-.565l-4.104-4.104zM8.4 12a3.604 3.604 0 0 1-3.6-3.6c0-1.985 1.615-3.6 3.6-3.6S12 6.415 12 8.4 10.385 12 8.4 12z"
                        fill="#FFF"
                        fill-rule="nonzero"
                        aria-hidden="true"></path>
                </svg>
              </div>
              <span v-text="$store.state.destinations.model.title"></span>
            </button>
          </div>

          <div class="nav">
            <ul class="menu d-flex align-items-start justify-content-end" v-if="!$auth.loggedIn">
              <li>
                <nuxt-link :to="{name: 'business'}"
                           class="btn btn-sm btn-outline-primary-dark ic--left ic--animate ic-add minw-80p">
                  <div class="ic-wrap"></div>
                  <span class="d-sm-none">Add</span>
                  <span class="d-none d-sm-inline">Add your Business</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath({name: 'signup-tourist'})"
                           class="btn btn-sm btn-primary-dark minw-80p">Join
                </nuxt-link>
              </li>
            </ul>

            <ul class="menu d-flex align-items-start justify-content-end" v-else>
              <li class="menu-item-ic menu-item-notifications dropdown notifications-dropdown">
                <a href="#"
                   id="notifications-dropdown-btn"
                   class="dropdown-toggle"
                   aria-haspopup="true"
                   aria-expanded="false">
                  <div class="ic-wrap">
                    <svg width="32"
                         height="39"
                         viewBox="0 0 32 39"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 39c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4zm12-12V17c0-6.15-3.27-11.28-9-12.64V3c0-1.66-1.34-3-3-3s-3 1.34-3 3v1.36C7.27 5.72 4 10.85 4 17v10l-4 4v2h32v-2l-4-4z"
                            fill="#C9CED6"
                            fill-rule="evenodd"
                            aria-hidden="true"/>
                    </svg>
                  </div>
                  <span>Notifications</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="notifications-dropdown-btn">
                  <div class="notifications">
                    <a href="#" class="dropdown-item is-new" tabindex="-1">Some notification text
                      here</a>
                    <a href="#" class="dropdown-item is-new" tabindex="-1">Other notifications
                      here</a>
                    <a href="#" class="dropdown-item" tabindex="-1">Someone messages you</a>
                  </div>
                  <div class="notifications-mark">
                    <a href="#" tabindex="-1">Mark all as read</a>
                  </div>
                </div>
              </li>
              <li class="menu-item-ic menu-item-messages current">
                <nuxt-link :to="{name: 'users-messages'}">
                  <div class="ic-wrap">
                    <svg width="48"
                         height="36"
                         viewBox="0 0 48 36"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.787 24c2.736 0 4.963-2.244 4.963-5V5c0-2.756-2.227-5-4.963-5H4.963C2.227 0 0 2.244 0 5v14c0 2.756 2.227 5 4.963 5h.993l-1.787 2.4c-.268.358-.264.852.006 1.208a.987.987 0 0 0 1.157.32L15.082 24h13.705zM42.684 8h-5.956a.997.997 0 0 0-.993 1v10c0 3.86-3.117 7-6.948 7H15.654a.987.987 0 0 0-.37.072l-.734.296a1 1 0 0 0-.621 1.002c.19 2.596 2.356 4.63 4.93 4.63h13.706l9.75 3.928a.994.994 0 0 0 .369.072h.022c.561-.054 1.01-.442 1.01-1 0-.316-.147-.598-.373-.782L41.69 32h.993c2.736 0 4.963-2.244 4.963-5V13c0-2.756-2.227-5-4.963-5z"
                            fill="#C9CED6"
                            fill-rule="evenodd"
                            aria-hidden="true"/>
                    </svg>
                  </div>
                  <span>Messages</span>
                </nuxt-link>
              </li>
              <li class="menu-item-ic menu-item-favorites">
                <router-link :to="localePath({name: 'users-favorites'})">
                  <div class="ic-wrap">
                    <svg width="36"
                         height="36"
                         viewBox="0 0 36 36"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.875 0C22.786 0 19.915 1.392 18 3.771A10.078 10.078 0 0 0 10.125 0C4.542 0 0 4.542 0 10.125c0 11.98 16.824 25.163 17.541 25.718a.746.746 0 0 0 .918 0C19.176 35.287 36 22.105 36 10.125 36 4.542 31.458 0 25.875 0z"
                            fill="#C9CED6"
                            fill-rule="evenodd"
                            aria-hidden="true"/>
                    </svg>
                  </div>
                  <span>Favorites</span>
                </router-link>
              </li>
              <li class="menu-item-ic menu-item-profile">
                <nuxt-link :to="localePath({name: 'users-user', params: {user: $auth.user.route_key}})">
                  <div class="ic-wrap">
                    <svg width="36"
                         height="36"
                         viewBox="0 0 36 36"
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 0c9.926 0 18 8.077 18 18 0 4.955-2.016 9.452-5.27 12.711-.006.007-.006.017-.012.023-.036.036-.082.06-.118.095a18.374 18.374 0 0 1-2.546 2.091c-.105.072-.216.128-.32.197a18.039 18.039 0 0 1-2.753 1.472c-.112.05-.23.082-.344.128-.978.39-1.996.707-3.05.923-.062.013-.128.016-.19.03A18.17 18.17 0 0 1 18 36c-1.162 0-2.297-.118-3.397-.33-.062-.014-.128-.017-.19-.03a17.763 17.763 0 0 1-3.05-.923c-.115-.046-.232-.078-.344-.128-.965-.409-1.882-.91-2.752-1.472-.105-.069-.216-.125-.32-.197A18.374 18.374 0 0 1 5.4 30.83c-.04-.037-.082-.06-.118-.096-.006-.006-.006-.016-.013-.023A17.94 17.94 0 0 1 0 18C0 8.077 8.074 0 18 0zm11.809 26.571c1.72-2.403 2.762-5.327 2.762-8.507 0-8.07-6.539-14.635-14.574-14.635-8.036 0-14.575 6.566-14.568 14.635 0 3.18 1.04 6.104 2.762 8.507a13.711 13.711 0 0 1 6.433-5.727c-1.659-1.49-2.721-3.63-2.721-6.033 0-4.484 3.634-8.13 8.097-8.13 4.463 0 8.097 3.646 8.097 8.13 0 2.404-1.066 4.544-2.72 6.033a13.776 13.776 0 0 1 6.432 5.727z"
                            fill="#C9CED6"
                            fill-rule="evenodd"
                            aria-hidden="true"/>
                    </svg>
                  </div>
                  <span>Profile</span>
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- Language -->
          <LangSwitcher/>

        </div>
      </div>
    </header>


    <client-only>
      <portal-target name="lightbox" multiple></portal-target>
    </client-only>

    <Search v-if="searchOpened"/>
    <nuxt/>


    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="container d-lg-flex align-items-lg-center justify-content-lg-between">

        <!-- Logo -->
        <div class="logo">
          <img src="/img/logo.png" width="465" height="228" title="Lonan" alt="Lonan">
        </div>

        <div class="footer-wrap">

          <!-- Navigation -->
          <div class="nav" role="navigation" aria-label="Footer navigation">
            <ul class="menu d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
              <li>
                <nuxt-link to="/terms" exact>Terms Of Service</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/privacy" exact>Privacy Policy</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/about" exact>About Us</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/contact">Contact Us</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/faq">Frequently Asked Questions</nuxt-link>
              </li>
            </ul>
          </div>

          <!-- Copyright -->
          <div class="copyright">
            &copy; 2019 Lonan Global. All rights reserved. <br class="d-md-none">Site Designed and
            Developed by <a href="https://combustion.com/" target="_blank" rel="noopener">Combustion
            Group</a>
          </div>

        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import LangSwitcher from '@/components/partials/LangSwitcher';
  import Search from '@/components/destinations/Search';
  import Version from '@/components/Version';

  export default {
    components: {
      LangSwitcher, Search, Version
    },

    methods: {
      ...mapActions('destinations', ['toggleSearch'])
    },
    computed: {
      ...mapState('destinations', {
        destination: state => state.model
      }),

      ...mapState('destinations', {
        searchOpened: state => state.searchOpened
      })
    }
  }
</script>

<style>
</style>
