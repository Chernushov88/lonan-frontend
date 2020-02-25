<template>
  <main id="main"
        class="signIn-banner background-repeat-no background-size-cover"
        style="background-image: url('/img/sign_in/bg-picture-user.png')">
    <section class="signIn">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-lg-6"></div>
          <div class="col-md-8 col-lg-6">
            <div class="signIn-content">
              <div class="signIn-content-header text-center">
                <h1 class="signIn-content-title text-center sub-title-2 sub-title-text-color bold-900">
                  Welcome! </br>Nice to see you again!</h1>
                <div class="description signIn-content-description text-center">
                  Don’t have an account yet? <a href="#" class="new_account">Create New</a>
                </div>
              </div>
              <div class="signIn-social">
                <div class="row">
                  <div class="col-sm-6">
                    <button type="button"
                            class="btn btn-icons-facebook btn-facebook w-100pr"
                            @click.prevent="$auth.loginWith('facebook')">Sign
                      In with Facebook
                    </button>
                  </div>
                  <div class="col-sm-6">
                    <button type="button"
                            class="btn btn-icons-google btn-google w-100pr"
                            @click.prevent="$auth.loginWith('google')">Sign in
                      with Google
                    </button>
                  </div>
                </div>
              </div>
              <div class="signIn-form signIn-form-border-top">
                <form @submit.prevent="onUserLogin">
                  <div class="row">
                    <div class="form-group col-12">
                      <label for="signIn-email">Email</label>
                      <div class="signIn-input signIn-input-email">
                        <input type="text"
                               name="signIn Email"
                               v-model="user.username"
                               id="signIn-email"
                               class="form-control"
                               required>
                      </div>
                    </div>
                    <div class="form-group col-12">
                      <label for="signIn-password">Password</label>
                      <div class="signIn-input signIn-input-password">
                        <input type="password"
                               name="signIn password"
                               v-model="user.password"
                               id="signIn-password"
                               class="form-control"
                               required>
                      </div>
                    </div>
                  </div>
                  <div class="signIn-form-btn row">
                    <div class="form-group col-6">
                      <button class="btn btn-primary ic-angle-right ic--right w-100pr text-left">
                        <span class="ic-wrap"></span>Login
                      </button>
                    </div>
                    <div class="form-group col-6">
                      <nuxt-link :to="localePath({name: 'password-request'})"
                                 class="btn btn-forgot text-right w-100pr">Forgot
                        password?
                      </nuxt-link>
                    </div>
                  </div>
                </form>
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
    name: "UserLogin",

    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },

    methods: {
      async onUserLogin() {
        try {
          await this.$auth.loginWith("password_grant", {
            data: {
              grant_type: "password",
              client_id: process.env.PASSPORT_CLIENT_ID,
              client_secret: process.env.PASSPORT_CLIENT_SECRET,
              scope: "*",
              ...this.user
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
    }
  }
</script>

<style scoped>

</style>
