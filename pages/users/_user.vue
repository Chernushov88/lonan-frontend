<template>
  <main id="main" class="">

    <!-- HERO -->
    <section class="section banner settings banner-personal"
             :style="`background-image: url('${user.cover}')`">
      <button class="btn btn-icons btn-icons-settings"
              @click="() => {this.$refs.coverInput.click()}"
              v-if="isPrivateFeature($auth.user)"></button>
      <input ref="coverInput" type="file" hidden @change="handleImageUpload($event,'cover')">
    </section>

    <!-- ITEMS -->
    <div class="container sidebar-container profile-guide-container profile-personal-container">
      <aside class="profile settings" :class="{'profile-personal': !user.is_guide}">
        <div class="profile-user">
          <div class="profile-avatar">
            <img width="210px"
                 height="210px"
                 :src="user.avatar"
                 alt="profile-avatar">
            <button class="btn btn-icons btn-icons-settings"
                    @click="() => {this.$refs.avatar.click()}"
                    v-if="isPrivateFeature($auth.user)"></button>
            <input type="file" @change="handleImageUpload($event, 'avatar')" hidden ref="avatar">
          </div>
          <div class="profile-name sub-title sub-title-6" v-text="user.name"></div>
          <div class="profile-prise sub-title sub-title-6" v-if="isGuide">
            $<span>{{ user.price | formatMoney }}</span>/h
          </div>
          <div class="profile-rating rating" v-if="isGuide">
            <div class="rating-bar">
              <div class="rating-bar-inner" :style="`width: ${(user.avgRating / 5) * 100}%;`"></div>
            </div>
            <div class="rating-label">Rate Guide</div>
          </div>
          <div class="profile-dropdown">
            <button class="btn profile-btn profile-learn-more btn-primary-dark2 margin-top-25p w-100pr">
              <span class="menu-bar"><span class="bar"></span><span class="bar"></span><span class="bar"></span></span>Menu
            </button>
            <div class="profile-dropdown-container">
              <div class="profile-mobile-container">
                <div class="profile-personal-content">
                  <div class="profile-age"></div>
                  <div class="profile-information">
                    <ul>
                      <li class="icon icon-location">New York, USA</li>
                      <li class="icon icon-date">Joined {{ $moment(user.created_at).format('MMMM Y')
                        }}
                      </li>
                      <li class="icon icon-site"
                          v-if="user.guideProfile && user.guideProfile.website">
                        <a :href="user.guideProfile.website" v-text="user.guideProfile.website"></a>
                      </li>
                      <li class="icon icon-email"
                          v-if="user.guideProfile && user.guideProfile.contact_email">
                        <a :href="`mailto:${user.guideProfile.contact_email}`"
                           v-text="user.guideProfile.contact_email"></a></li>
                      <li class="icon icon-phone"
                          v-if="user.guideProfile && user.guideProfile.phone">
                        <a :href="`tel:${user.guideProfile.phone}`"
                           v-text="user.guideProfile.phone"></a></li>
                    </ul>
                  </div>
                </div>
                <div class="profile-work-hours" v-if="user.is_guide">
                  <div class="sub-title sub-title-6">Work Hours</div>
                  <WorkingHours :without-label="true" :hours="user.working_hours"/>
                </div>


                <div class="profile-album" v-if="albums.length > 0">
                  <div class="sub-title sub-title-6 margin-bottom-15p">Pictures (Album)</div>
                  <ul>
                    <li v-for="albumImage in albums">
                      <img :src="albumImage.url" width="88" height="88">
                    </li>
                    <li class="show-more">
                      <div class="count" v-if="albumsMeta.total - (albums.length + 1) > 0">+<span
                        v-text="albumsMeta.total - (albums.length + 1)"></span></div>
                      <a href="#"><img :src="lastAlbumItem.url" width="88" height="88"></a>
                    </li>
                  </ul>
                </div>

                <div class="profile-menu" v-if="isPrivateFeature($auth.user)">
                  <ul>
                    <nuxt-link class="profile-menu-item profile-menu-item-profile profile-menu-icon profile-menu-icon-profile"
                               tag="li"
                               active-class="active"
                               exact
                               :to="localePath({name: 'users-user', params: $route.params})">
                      <span class="icon"></span>
                      My Profile
                    </nuxt-link>
                    <nuxt-link class="profile-menu-item profile-menu-item-events profile-menu-icon profile-menu-icon-events"
                               tag="li"
                               active-class="active"
                               :to="localePath({name: 'users-user-events', params: $route.params})">
                      <span class="icon"></span>My
                      Events
                    </nuxt-link>
                    <nuxt-link class="profile-menu-item profile-menu-item-settings profile-menu-icon profile-menu-icon-settings"
                               tag="li"
                               active-class="active"
                               :to="localePath({name: 'users-user-settings', params: $route.params})">
                      <span class="icon"></span>My Settings
                    </nuxt-link>
                    <nuxt-link class="profile-menu-item profile-menu-item-guide profile-menu-icon profile-menu-icon-guide"
                               tag="li"
                               active-class="active"
                               :to="localePath({name: 'users-user-become-guide', params: $route.params})">
                      <span class="icon"></span>Become a Guide
                    </nuxt-link>
                  </ul>
                </div>
                <button @click="$auth.logout()"
                        v-if="isPrivateFeature($auth.user)"
                        type="button"
                        class="btn btn-icons-text btn-icons-logout">Logout
                </button>
              </div>

            </div>
          </div>
        </div>

        <div class="profile-btn-content" v-if="!isPrivateFeature($auth.user)">
          <nuxt-link :to="{name: 'users-messages-to-participant', params: {participant: user.route_key}}"
                     v-if="$auth.user.is_guide === false"
                     class="btn profile-btn btn-primary margin-bottom-5p margin-top-20p w-100pr">
            Message
          </nuxt-link>
          <button class="btn profile-btn btn-default margin-bottom-20p margin-top-5p w-100pr modal-button"
                  data-modal="calendar-modal">Calendar
          </button>
        </div>

        <div class="profile-dropdown" v-if="!isPrivateFeature($auth.user)">
          <button class="btn profile-btn profile-learn-more btn-primary-dark2 margin-bottom-20p w-100pr active">
            <span class="menu-bar"><span class="bar"></span><span class="bar"></span><span class="bar"></span></span>Learn
            More About Guide
          </button>
          <div class="profile-dropdown-container" style="">
            <ProfileDropdown title="Languages" :collapsed="false">
              <ul>
                <li>English</li>
                <li>Spanish</li>
                <li>French</li>
              </ul>
            </ProfileDropdown>
            <ProfileDropdown class="check-mark-list profile-ameneties" title="Amenities">
              <ul>
                <li>Car</li>
                <li>Pool</li>
                <li>Bike</li>
              </ul>
            </ProfileDropdown>

            <ProfileDropdown class="profile-about" title="About">
              <div class="profile-guide">
                <div class="title">History (Background)</div>
                <div class="description">
                  <p>Lorem ipsum dolor sit amet, sit at etiam temporibus reprehendunt, sanctus vel
                    cu. Usu enim reformidans conclusionemque eu, graece ancillae ea nec. Usu eu
                    assum officiis voluptatum, modo quas ullum his id, est ex mediocrem
                    consequuntur. Mea ei mucius.</p>
                </div>
              </div>
              <div class="profile-guide">
                <div class="title">Experience</div>
                <div class="description">
                  Lorem ipsum dolor sit amet, sit at etiam temporibus reprehendunt, sanctus vel
                  cu. Usu enim reformidans conclusionemque eu, graece ancillae ea nec. Usu eu
                  assum officiis voluptatum, modo quas ullum his id, est ex mediocrem
                  consequuntur. Mea ei mucius.
                </div>
              </div>
              <div class="profile-guide">
                <div class="title">Other</div>
                <div class="description">
                  Lorem ipsum dolor sit amet, sit at etiam temporibus reprehendunt, sanctus vel
                  cu. Usu enim reformidans conclusionemque eu, graece ancillae ea nec. Usu eu
                  assum officiis voluptatum, modo quas ullum his id, est ex mediocrem
                  consequuntur. Mea ei mucius.
                </div>
              </div>
            </ProfileDropdown>

            <ProfileDropdown class="check-mark-list profile-to-do" title="Things to do">
              <ul>
                <li>Aliquet diam gravida</li>
                <li>Phasellus eu condimentum</li>
                <li>Metus non venenatis turpis</li>
                <li>Aliquet diam gravida</li>
                <li>Phasellus eu condimentum</li>
              </ul>
            </ProfileDropdown>

          </div>
        </div>
      </aside>
      <nuxt-child></nuxt-child>
    </div>


  </main>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { objectToFormData } from 'object-to-formdata';
  import WorkingHours from '@/components/partials/WorkingHours';
  import ProfileDropdown from '@/components/user/ProfileDropdown';

  export default {
    async validate({ params, store }) {
      await store.dispatch('users/show', { route_key: params.user });

      return Boolean(store.state.users.model);
    },

    components: {
      WorkingHours,
      ProfileDropdown
    },

    scrollToTop: true,

    computed: {
      ...mapState('users', {
        user: state => state.model,
      }),

      ...mapGetters('users', ['isPrivateFeature', 'isGuide'])
    },

    methods: {
      ...mapActions('users', ['update']),
      async handleImageUpload($event, imageName) {
        const image = $event.target.files[0];

        const body = {
          [imageName]: image
        };

        await this.update({ route_key: this.user.route_key, body: objectToFormData(body) })

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
    },

    async asyncData({ $axios, store, params }) {

      const resAlbums = await $axios.$get(`users/${params.user}/albums`);
      const albums = resAlbums.data;
      const albumsMeta = resAlbums.meta;
      const lastAlbumItem = albums.pop();

      return { albums, lastAlbumItem, albumsMeta }
    }
  }
</script>

<style scoped>

</style>
