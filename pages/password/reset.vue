<template>
  <main id="main" class="">
    <section class="forgot">
      <div class="container">
        <div class="forgot-content" v-if="!formSubmitted">
          <h1 class="forgot-content-title text-center sub-title-2 sub-title-text-color bold-900">
            Create new password</h1>
          <div class="description signIn-content-description signUp-content-description text-center">
            Enter your new password
          </div>
          <div class="signIn-form forgot-form forgot-form-create-new signIn-content-xs">
            <form @submit.prevent="onFormSubmit">
              <div class="row">
                <div class="form-group col-12">
                  <label for="signIn-password">Password</label>
                  <div class="signIn-input signIn-input-password">
                    <input type="password"
                           name="signIn password"
                           v-model="form.password"
                           id="signIn-password"
                           class="form-control"
                           required="">
                  </div>
                </div>
                <div class="form-group col-12">
                  <label for="signIn-confirm-password">Confirm Password</label>
                  <div class="signIn-input signIn-input-password">
                    <input type="password"
                           name="signIn confirm-password"
                           v-model="form.password_confirmation"
                           id="signIn-confirm-password"
                           class="form-control"
                           required="">
                  </div>
                </div>
                <div class="form-group signIn-form-btn col-12">
                  <button type="submit"
                          class="btn btn-primary ic-angle-right ic--right w-100pr text-left">
                    <span class="ic-wrap"></span>Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="forgot-content forgot-changes-content signIn-content-xs" v-else>
          <h1 class="forgot-changes-content-title text-center sub-title-2 sub-title-text-color bold-900">
            Congratulations.<br>Your password has<br>been updated</h1>
          <nuxt-link :to="{path: '/'}" class="btn btn-primary w-100pr">Go to homepage</nuxt-link>
        </div>
      </div>

    </section>
  </main>
</template>

<script>
  export default {
    name: "ForgotPasswordReset",

    data() {
      return {
        form: {
          password: '',
          password_confirmation: '',
          email: this.$route.query.email,
          token: this.$route.query.token,
        },
        formSubmitted: false
      }
    },

    async validate({ query, $axios, error }) {
      if (query.token && query.email) {
        try {
          await $axios.$get('users/password/validate', {
            params: query
          });

          return true;
        }
        catch (e) {

        }
      }

      error(403);
    },

    methods: {
      async onFormSubmit() {
        try {
          const { data } = await this.$axios.$post('users/password/reset', this.form);

          this.formSubmitted = true;

        }
        catch (e) {

        }
      }
    }
  }
</script>

<style scoped>

</style>
