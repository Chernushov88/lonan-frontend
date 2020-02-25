<template>
  <main id="main"
        class="signIn-banner background-repeat-no background-size-cover"
        style="background-image: url('/img/sign_in/bg-picture-business.jpg')">
    <section class="signIn">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-lg-6"></div>
          <div class="col-md-8 col-lg-6">
            <div class="signIn-business-content">
              <div class="signIn-business-content-text text-center">
                <h1 class="signIn-content-title sub-title-2 sub-title-text-color bold-900">Join the
                  Lonan network by adding your business</h1>
                <div class="description signIn-content-description signUp-content-description">
                  I Already have an account.
                  <nuxt-link :to="{name: 'login-business'}" class="new_account bold-900">Sign In
                    Now
                  </nuxt-link>
                </div>
              </div>
              <div class="signIn-business-btn ">
                <nuxt-link :to="{name: 'signup-business'}"
                           class="btn btn-primary ic-angle-right ic--right w-100pr text-left">
                  <span class="ic-wrap"></span>Sign up now
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  export default {
    name: "BusinessWelcome"
  }
</script>

<style scoped>

</style>
