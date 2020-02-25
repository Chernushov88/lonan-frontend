<template>
  <main id="main" class="site-main">

    <!-- FAQ -->
    <section class="section section--boxed">
      <div class="container container-md">
        <header class="section-header">
          <h1>Contact us</h1>
        </header>
        <div class="section-content">
          <p>Lorem ipsum dolor sit amet, sit at etiam temporibus reprehendunt, sanctus deseruisse
            vel cu. Usu enim reformidans conclusionemque eu, graece ancillae ea nec. Usu eu assum
            officiis voluptatum, modo quas ullum his id, est ex mediocrem consequuntur. Mea ei
            mucius mediocritatem.</p>
          <form v-if="!formSent" @submit.prevent="onFormSubmit">
            <div class="row">
              <div class="form-group col-12 col-sm-6">
                <label for="contact-name">Your Name</label>
                <input type="text"
                       v-model="form.name"
                       id="contact-"
                       class="form-control"
                       required="">
              </div>
              <div class="form-group col-12 col-sm-6">
                <label for="contact-subject">Reason for contacting</label>
                <input type="text"
                       name="subject"
                       v-model="form.subject"
                       id="contact-subject"
                       class="form-control"
                       required="">
              </div>
              <div class="form-group col-12 col-sm-6">
                <label for="contact-phone">Phone Number</label>
                <input type="tel"
                       name="phone"
                       v-model="form.phone"
                       id="contact-phone"
                       class="form-control"
                       required="">
              </div>
              <div class="form-group col-12 col-sm-6">
                <label for="contact-email">Email</label>
                <input type="email"
                       name="email"
                       v-model="form.email"
                       id="contact-email"
                       class="form-control"
                       required="">
              </div>
              <div class="form-group col-12">
                <label for="contact-message" class="sr-only">Message</label>
                <textarea name="message"
                          id="contact-message"
                          rows="7"
                          class="form-control"
                          v-model="form.text"
                          placeholder="Enter your message"></textarea>
              </div>
              <div class="form-button col-12">
                <button type="submit"
                        class="btn btn-primary ic--right ic-angle-right w-190p text-left">
                  <div class="ic-wrap"></div>
                  Send Message
                </button>
              </div>
            </div>
          </form>
          <p v-else>
            Thank you, we will process your request soon
          </p>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
  export default {
    name: "ContactUs",

    data() {
      return {
        form: {
          name: '',
          subject: '',
          phone: '',
          email: '',
          text: ''
        },
        formSent: false
      }
    },

    methods: {
      async onFormSubmit() {
        try {
          const { data } = await this.$axios.$post('contact', this.form);

          this.formSent = true;
        }
        catch {

        }
      }
    }
  }
</script>

<style scoped>

</style>
