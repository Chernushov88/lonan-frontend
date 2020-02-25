import Vue from 'vue'
import vTinySlider from 'vue-tiny-slider'
import Lightbox from 'vue-easy-lightbox'

Vue.use(Lightbox)

const VueTinySlider = {
  install(Vue, options) {
    Vue.component('tiny-slider', vTinySlider)
  }
}
Vue.use(VueTinySlider)

import "tiny-slider/src/tiny-slider";
import 'vue-pure-lightbox/dist/VuePureLightbox.css'
