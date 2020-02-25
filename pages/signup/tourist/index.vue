<template>
  <div class="col-md-8 col-lg-6">
    <div class="signIn-content signUp-content">
      <h1 class="signIn-content-title text-center sub-title-2 sub-title-text-color bold-900">
        Welcome!</br>Let’s make things official!</h1>
      <div class="description signIn-content-description text-center">
        I already have an account.
        <nuxt-link :to="{name: 'login'}" class="new_account bold-900">Sign In</nuxt-link>
      </div>
      <div class="power-check-list">
        <ul class="list">
          <li class="item">
            <label class="check-label">
              <input type="radio" v-model="isGuide" :value="1" name="status">
              <span class="check-text">Signup as a Guide</span>
            </label>
          </li>
          <li class="item">
            <label class="check-label">
              <input type="radio" v-model="isGuide" :value="0" name="status">
              <span class="check-text">Signup as a Tourist</span>
            </label>
          </li>
        </ul>
      </div>
      <div class="signIn-social signUp-social signIn-content-xs">
        <div class="row">
          <div class="col-12">
            <button type="button"
                    class="btn btn-icons-facebook btn-facebook w-100pr justify-content-center"
                    @click.prevent="$auth.loginWith('facebook', 1, isGuide)">Sign Up with
              Facebook
            </button>
          </div>
          <div class="col-12">
            <button type="button"
                    class="btn btn-icons-google btn-google w-100pr justify-content-center"
                    @click.prevent="$auth.loginWith('google', 1, isGuide)">Sign Up with Google
            </button>
          </div>
          <div class="col-12">
            <nuxt-link :to="{name: 'signup-tourist-email'}"
                       class="btn btn-primary ic-angle-right ic--right w-100pr text-left">
              <span class="ic-wrap"></span>Sign up with Email
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TouristSignup",

    data() {
      return {
        isGuide: 0
      }
    }
  }
</script>

<style scoped>

</style>
