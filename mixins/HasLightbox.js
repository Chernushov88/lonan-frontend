export default {
  data() {
    return {
      lightbox: {
        visible: false,
        index: 0,
      }
    }
  },

  methods: {
    showImg(index) {
      this.lightbox.index = index
      this.lightbox.visible = true
    },
    handleHide() {
      this.lightbox.visible = false
    }
  },
}
