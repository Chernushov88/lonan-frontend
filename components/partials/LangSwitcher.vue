<template>
  <!-- Language -->
  <div class="language dropdown" :class="{show: dropped}">
    <button type="button"
            @click="dropped = !dropped"
            class="dropdown-toggle">
      <span class="toggler-text sr-only">English</span>
      <img :src="`/img/icons/ic-lang-${currentLocale}.svg`"
           width="72"
           height="39"
           title="English"
           alt="Eng">
    </button>
    <div class="dropdown-menu">
      <a
        v-for="locale in availableLocales"
        :key="locale.code"
        class="dropdown-item" tabindex="-1"
        @click.prevent="setLocale(locale.code)">{{ $t(locale.code) }}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LangSwitcher",

    computed: {
      availableLocales() {
        return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
      },
      currentLocale() {
        return this.$i18n.locale;
      }
    },

    methods: {
      setLocale(locale) {
        this.$i18n.setLocale(locale)
      }
    },

    data() {
      return {
        dropped: false
      }
    }
  }
</script>

<style scoped>

</style>
