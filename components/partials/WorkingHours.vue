<template>
  <div class="widget widget-text">
    <h4 class="widget-title" v-if="!withoutLabel">Work Hours</h4>
    <div class="widget-content">
      <ul class="days-list">
        <li v-for="(day, key) in Object.values(days)">
          {{ day }}:
          <span v-if="mappedHours[key]">
            {{ $moment(mappedHours[key].start, ['h:m:s']).format('hh:mm A') }} - {{ $moment(mappedHours[key].end, ['h:m:s']).format('hh:mm A') }}
        </span>
          <span v-else>Closed</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import collect from 'collect.js'

  export default {
    name: "WorkingHours",
    props: {
      hours: {
        required: true
      },
      withoutLabel: {
        required: false,
        default() {
          return false;
        }
      }
    },

    computed: {
      mappedHours() {
        return collect(this.hours).mapWithKeys(item => [item.day, {
          start: item.started_at,
          end: item.ended_at
        }]).all()
      }
    },

    data() {
      return {
        days: {
          0: 'Sunday',
          1: 'Monday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday',
        }
      }
    }
  }
</script>

<style scoped>
  .days-list {
    list-style: none;
    padding: 0;
  }

  .days-list li {
    margin-bottom: 0;
  }
</style>
