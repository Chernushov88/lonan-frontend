<template>
  <div class="dropdown-collapse dropdown-default profile-dropdown-content profile-languages"
       :class="{show: isActive}"
       @click="isActive = !isActive">
    <div class="dropdown-collapse-toggle" v-text="title"></div>
    <div class="dropdown-collapse-menu" :class="{'d-block': isActive}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileDropdown",

    props: {
      title: {
        required: true
      },
      collapsed: {
        required: false,
        default() {
          return true;
        }
      }
    },

    data() {
      return {
        isActive: !this.collapsed
      }
    }
  }
</script>

<style scoped>

</style>
