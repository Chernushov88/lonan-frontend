import https from 'https';

export default function ({ $axios, app }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)

    if (!error.response.data.stop_notifications) {
      if (code === 422) {
        const data = error.response.data;

        const errors = Object.values(data.errors)

        app.$toast.error(errors[0])

      } else {
        app.$toast.error(error.response.data.message)
      }
    }

  });

  $axios.onResponse(response => {
    if (!response.error && app.$toast) {
      app.$toast.success(response.data.message)
    }
  });

  $axios.onRequest(request => {
    console.log(`Making request to ${request.url}`)
  });
}
