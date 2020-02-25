<template>
  <div class="col-md-8 col-lg-6">
    <div class="signIn-content signUp-content">
      <h1 class="signIn-content-title text-center sub-title-2 sub-title-text-color bold-900">
        Welcome!<br>Let’s make things official!</h1>
      <div class="description signIn-content-description signUp-content-description text-center">
        I already have an account.
        <nuxt-link :to="localePath({name: 'login'})" class="new_account bold-900">Sign In
        </nuxt-link>
      </div>
      <div class="signIn-avatar">
        <div class="signIn-avatar-image signIn-avatar-image-no signIn-avatar-edit">
          <label for="signIn-avatar-upload" class="btn btn-icons btn-icons-settings">
          </label>
          <input type="file"
                 id="signIn-avatar-upload"
                 class="signIn-avatar-upload"
                 @chang="onAvatarChange($event)">
        </div>
      </div>
      <div class="signIn-form signUp-form signIn-content-xs">
        <form @submit.prevent="onUserRegister">
          <div class="row">
            <div class="form-group col-12">
              <label for="signIn-name">Full Name</label>
              <div class="signIn-input signIn-input-name">
                <input type="text"
                       name="signIn name"
                       v-model="user.name"
                       id="signIn-name"
                       class="form-control"
                       required>
              </div>
            </div>
            <div class="form-group col-12">
              <label for="signIn-email">Email</label>
              <div class="signIn-input signIn-input-email">
                <input type="text"
                       name="signIn Email"
                       id="signIn-email"
                       v-model="user.email"
                       class="form-control"
                       required>
              </div>
            </div>
            <div class="form-group col-12">
              <label for="signIn-password">Password</label>
              <div class="signIn-input signIn-input-password">
                <input type="password"
                       name="signIn password"
                       id="signIn-password"
                       v-model="user.password"
                       class="form-control"
                       required>
              </div>
            </div>
          </div>
          <div class="signIn-form-btn row">
            <div class="form-group col-12">
              <button type="submit"
                      class="btn btn-primary ic-angle-right ic--right w-100pr text-left">
                <span class="ic-wrap"></span>Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { objectToFormData } from 'object-to-formdata';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "TouristSignupEmail",

    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          avatar: null
        },

        avatarPreview: null
      }
    },

    methods: {
      async onUserRegister() {
        const formData = objectToFormData(this.user);

        try {
          const { data } = await this.$axios.$post('users/register',
            formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          ); // Register User

          try {
            await this.$auth.loginWith("password_grant", {
              data: {
                grant_type: "password",
                client_id: process.env.PASSPORT_CLIENT_ID,
                client_secret: process.env.PASSPORT_CLIENT_SECRET,
                scope: "*",
                username: this.user.email,
                password: this.user.password
              }
            });
            if (this.$route.query.redirect) {
              this.$router.push({ path: this.$route.query.redirect })
            } else {
              this.$router.push({ name: 'index' })
            }
          }
          catch (err) {
          }
        }
        catch (e) {

        }
      },
      onAvatarChange($event) {

      }
    }
  }
</script>

<style scoped>

</style>
