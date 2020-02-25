<template>
  <main>
    <section class="forgot">
      <div class="container">
        <div class="forgot-content" v-if="!formSubmitted">
          <h1 class="forgot-content-title text-center sub-title-2 sub-title-text-color bold-900">
            Forgot your password?</h1>
          <div class="description signIn-content-description signUp-content-description text-center">
            Enter your email
          </div>
          <div class="signIn-form forgot-form signIn-content-xs">
            <form @submit.prevent="onFormSubmit">
              <div class="row">
                <div class="form-group col-12">
                  <label for="signIn-email">Email</label>
                  <div class="signIn-input signIn-input-email">
                    <input type="text"
                           v-model="email"
                           name="signIn Email"
                           id="signIn-email"
                           class="form-control"
                           required="">
                  </div>
                </div>
                <div class="form-group col-12">
                  <button class="btn btn-primary ic-angle-right ic--right w-100pr text-left">
                    <span class="ic-wrap"></span>Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="forgot-content forgot-changes-content signIn-content-xs" v-else>
          <h1 class="forgot-changes-content-title text-center sub-title-2 sub-title-text-color bold-900">
            Congratulations.<br>We sent you reset link to your email!</h1>
          <nuxt-link :to="{path: '/'}" class="btn btn-primary w-100pr">Go to homepage</nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    name: "ForgotPasswordRequest",

    data() {
      return {
        email: '',
        formSubmitted: false
      }
    },

    methods: {
      async onFormSubmit() {
        try {
          const {data} = await this.$axios.$post('users/password/request', { email: this.email });

          this.formSubmitted = true;
        }
        catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
