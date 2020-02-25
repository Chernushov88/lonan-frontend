<template>
  <div class="collapse-item">
    <div class="collapse-header">
      <button :class="{collapsed: !collapsed}"
              @click="collapsed = !collapsed"
              v-text="question.title"></button>
    </div>
    <div v-show="collapsed">
      <div class="collapse-content" v-text="question.text">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FaqItem",
    props: {
      question: {
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
        collapsed: true
      }
    }
  }
</script>

<style scoped>

</style>
