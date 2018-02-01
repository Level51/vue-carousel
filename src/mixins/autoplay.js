const autoplay = {
  props: {
    /**
     * Flag to enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: false,
    },
    /**
     * Time elapsed before advancing slide
     */
    autoplayTimeout: {
      type: Number,
      default: 2000,
    },
    /**
     * Flag to pause autoplay on hover
     */
    autoplayHoverPause: {
      type: Boolean,
      default: true,
    },
    /**
     * Element class to which the "pause autoplay on hover" listener should be bound.
     * Defaults to the whole element.
     */
    autoplayElementClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      autoplayInterval: null,
    }
  },
  destroyed() {
    if (!this.$isServer) {
      this.$el.removeEventListener("mouseenter", this.pauseAutoplay)
      this.$el.removeEventListener("mouseleave", this.startAutoplay)
    }
  },
  methods: {
    pauseAutoplay() {
      if (this.autoplayInterval) {
        this.autoplayInterval = clearInterval(this.autoplayInterval)
      }
    },
    startAutoplay() {
      if (this.autoplay) {
        this.autoplayInterval = setInterval(this.advancePage, this.autoplayTimeout)
      }
    },
  },
  mounted() {
    if (!this.$isServer && this.autoplayHoverPause) {

      // Check for a custom autoplay element class, if set bind the event listener to elements with this class
      if (this.autoplayElementClass) {
        for (let el of this.$el.getElementsByClassName(this.autoplayElementClass)) {
            el.addEventListener("mouseenter", this.pauseAutoplay)
            el.addEventListener("mouseleave", this.startAutoplay)
        }
      } else {
          this.$el.addEventListener("mouseenter", this.pauseAutoplay)
          this.$el.addEventListener("mouseleave", this.startAutoplay)
      }
    }

    this.startAutoplay()
  },
}

export default autoplay
