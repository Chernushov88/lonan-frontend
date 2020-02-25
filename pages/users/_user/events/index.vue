<template>
  <article class="post">
    <section class="settings-content my-events">
      <div class="row flex-xl-nowrap align-items-start">
        <div class="flex-xl-basis-9 profile-settings-content section-items">
          <section class="post-settings settings-events settings-events-list active">
            <div class="d-flex align-items-center justify-content-sm-between">
              <div class="sub-title bold-900 sub-title-6">My Events</div>
              <nuxt-link :to="{name: 'users-user-events-create', params: $route.params}"
                         class="btn btn-primary btn-radius mw-190p">Add an Event
              </nuxt-link>
            </div>
            <div class="post-settings-events-empty" v-if="events.length === 0">
              <div class="post-settings-events container-xs">
                <div class="post-settings-events-empty-content text-center">
                  <div class="post-settings-events-empty-icon"></div>
                  <div class="description">You have not created any events yet</div>
                  <nuxt-link :to="{name: 'users-user-events-create', params: $route.params}"
                             class="btn btn-primary btn-radius mw-190p">Add an Event
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="post-settings-events-list-content" v-else>
              <div class="list-empty">
                <svg  viewBox="0 0 160 140" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                  <title>ic-events-grey</title>
                  <desc>Created with Sketch.</desc>
                  <g id="01_Pages" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="D_02C_Events--Empty-State" transform="translate(-735.000000, -399.000000)" fill="#C9CED6">
                      <path d="M856.55064,399.91095 C860.259729,398.553969 864.29251,398.716571 867.900632,400.375103 C871.508754,402.033635 874.249738,404.981151 875.615776,408.673676 L875.615776,408.673676 L894.084014,458.609976 C895.450051,462.305458 895.283751,466.317272 893.614809,469.90928 C891.948837,473.504245 888.988099,476.230032 885.279009,477.589969 C884.940469,477.714137 884.59302,477.773265 884.254481,477.773265 C883.990182,477.773265 883.731823,477.723006 883.482372,477.655009 L883.482372,477.655009 L883.482372,524.218075 C883.482372,532.368828 876.821453,539 868.634135,539 L868.634135,539 L856.755545,539 C855.1163,539 853.785898,537.678496 853.785898,536.043615 C853.785898,532.782722 851.122124,530.130845 847.846603,530.130845 C844.571082,530.130845 841.907308,532.782722 841.907308,536.043615 C841.907308,537.678496 840.576906,539 838.937661,539 L838.937661,539 L749.848237,539 C741.660919,539 735,532.368828 735,524.218075 L735,524.218075 L735,471.003143 C735,467.405222 736.34822,464.147286 738.504184,461.581143 C737.521231,461.388978 736.648154,460.753356 736.276948,459.748185 C734.910911,456.052703 735.077211,452.040889 736.743183,448.448881 C738.409155,444.853917 741.369894,442.128129 745.081953,440.768192 L745.081953,440.768192 L828.683468,410.125261 C829.42291,409.853273 830.242533,409.88875 830.955248,410.213952 C831.670933,410.542111 832.223288,411.142257 832.496495,411.878397 C833.04291,413.359546 834.13871,414.539144 835.578989,415.201374 C837.022238,415.866561 838.634757,415.928645 840.11958,415.381713 C841.610343,414.834782 842.798202,413.746832 843.460434,412.312986 C844.125635,410.879139 844.190967,409.273822 843.641582,407.792673 C843.371344,407.056533 843.40401,406.243527 843.733641,405.531038 C844.063272,404.818549 844.666111,404.265705 845.405553,403.993718 L845.405553,403.993718 Z M836.342189,462.133987 L749.848237,462.133987 C744.93644,462.133987 740.939295,466.113282 740.939295,471.003143 L740.939295,471.003143 L740.939295,524.218075 C740.939295,529.110892 744.93644,533.08723 749.848237,533.08723 L749.848237,533.08723 L836.342189,533.08723 C837.666651,527.993378 842.320089,524.218075 847.846603,524.218075 C853.370147,524.218075 858.026554,527.993378 859.348047,533.08723 L859.348047,533.08723 L868.634135,533.08723 C873.545932,533.08723 877.543077,529.110892 877.543077,524.218075 L877.543077,524.218075 L877.543077,471.003143 C877.543077,466.113282 873.545932,462.133987 868.634135,462.133987 L868.634135,462.133987 L859.348047,462.133987 C858.026554,467.230795 853.370147,471.003143 847.846603,471.003143 C842.320089,471.003143 837.666651,467.230795 836.342189,462.133987 L836.342189,462.133987 Z M812.142857,512 C813.72,512 815,513.568 815,515.5 C815,517.432 813.72,519 812.142857,519 L812.142857,519 L757.857143,519 C756.28,519 755,517.432 755,515.5 C755,513.568 756.28,512 757.857143,512 L757.857143,512 Z M778,492 C779.656,492 781,493.568 781,495.5 C781,497.432 779.656,499 778,499 L778,499 L751,499 C749.344,499 748,497.432 748,495.5 C748,493.568 749.344,492 751,492 L751,492 Z M765.4,479 C766.8352,479 768,480.568 768,482.5 C768,484.432 766.8352,486 765.4,486 L765.4,486 L757.6,486 C756.1648,486 755,484.432 755,482.5 C755,480.568 756.1648,479 757.6,479 L757.6,479 Z M792.142857,479 C793.72,479 795,480.568 795,482.5 C795,484.432 793.72,486 792.142857,486 L792.142857,486 L777.857143,486 C776.28,486 775,484.432 775,482.5 C775,480.568 776.28,479 777.857143,479 L777.857143,479 Z M865.409098,405.740942 C863.241255,404.74464 860.820993,404.644123 858.602666,405.460085 L858.602666,405.460085 L849.89269,408.650025 C850.109474,410.73132 849.759056,412.842179 848.853313,414.790436 C847.522911,417.661086 845.150163,419.839942 842.171607,420.930848 C839.19602,422.021754 835.970983,421.89463 833.090425,420.570169 C831.130457,419.671428 829.491212,418.28784 828.297414,416.567224 L828.297414,416.567224 L747.133979,446.317327 C744.912683,447.130333 743.136834,448.76817 742.136063,450.926332 C741.135292,453.084493 741.034324,455.49099 741.850977,457.702366 C741.951945,457.974354 741.957884,458.249297 741.978671,458.521285 C744.2653,457.084482 746.949861,456.221217 749.848237,456.221217 L749.848237,456.221217 L838.937661,456.221217 C840.576906,456.221217 841.907308,457.545678 841.907308,459.177602 C841.907308,462.441451 844.571082,465.090373 847.846603,465.090373 C851.122124,465.090373 853.785898,462.441451 853.785898,459.177602 C853.785898,457.545678 855.1163,456.221217 856.755545,456.221217 L856.755545,456.221217 L868.634135,456.221217 C876.821453,456.221217 883.482372,462.855345 883.482372,471.003143 L883.482372,471.003143 L883.482372,471.919622 C885.575974,471.074096 887.262733,469.504255 888.224899,467.43183 C889.22567,465.273668 889.326638,462.867171 888.509985,460.655795 L888.509985,460.655795 L870.041748,410.716538 C869.225095,408.505162 867.57991,406.7402 865.409098,405.740942 Z" id="ic-events-grey"></path>
                    </g>
                  </g>
                </svg>
                <h4 class="title">
                  There are no events matching your search requirements.<br>
                  Please try to search for different days or event types
                </h4>
              </div>
              <ul>
                <li class="post-settings-events-item" v-for="(event, index) in events">
                  <div class="post-settings-events-img">
                    <img :src="event.cover" width="95" height="75">
                  </div>
                  <div class="post-settings-events-post">
                    <div class="post-settings-events-content">
                      <div class="post-settings-events-title sub-title sub-title-7"
                           v-text="event.title"></div>
                      <div class="post-settings-events-date"
                           v-text="$moment(event.started_at).format('MM/DD/YYYY hh:mm A')">
                        MM/DD/YYYY at 08:00PM
                      </div>
                      <div class="description"></div>
                    </div>
                    <div class="post-settings-events-options">
                      <ul>
                        <li class="post-settings-events-options-item">
                          <nuxt-link :to="{name: 'users-user-events-event', params: {event: event.id,...$route.params}}"
                                     type="button"
                                     class="btn btn-icons btn-icons-settings-link"></nuxt-link>
                        </li>
                        <li class="post-settings-events-options-item">
                          <button @click="onEventDelete(event.route_key, index)" type="button" class="btn btn-icons btn-icons-delete"></button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div class="flex-xl-basis-3 profile-settings-sidebar right-sidebar-banner section-items">
          <a href="#" target="_blank">
            <img src="img/_demo/banner-1.jpg" style="width: 100%" title="" alt="">
          </a>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
  export default {
    name: "UserProfileEvents",

    async asyncData({ $axios, params }) {
      const { data } = await $axios.$get(`users/${params.user}/events`);
      const events = data;

      return { events }
    },

    methods: {
      async onEventDelete(eventId, index) {
        try {
          const { data } = await this.$axios.$delete(`events/${eventId}`);

          this.events.splice(index, 1);
        }
        catch (e) {

        }
      }
    }
  }
</script>

<style scoped>

</style>
