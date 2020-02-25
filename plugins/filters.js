import Vue from 'vue'

Vue.filter('formatMoney', (value) => {
  return Number(value).toLocaleString('en-US',
      {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).replace(".00", "")
  }
);
