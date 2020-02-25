import { encodeQuery, parseQuery, randomString } from '../utilities'

const DEFAULTS = {
  token_type: 'Bearer',
  response_type: 'token',
  tokenName: 'Authorization',
};

export default class Oauth2Scheme {
  constructor(auth, options) {
    this.$auth = auth
    this.name = options._name;

    this.options = Object.assign({}, DEFAULTS, options)
  }

  get _scope() {
    return Array.isArray(this.options.scope)
      ? this.options.scope.join(' ')
      : this.options.scope
  }

  _redirectURI(signUp = false, isGuide = false) {
    const query = new URLSearchParams({
      signUp,
      isGuide
    });

    const url = `${this.options.redirect_uri}?${query.toString()}`;

    if (url) {
      return url
    }

    if (process.browser) {
      return window.location.origin + this.$auth.options.redirect.callback
    }
  }

  async mounted() {
    // Sync token
    const token = this.$auth.syncToken(this.name)
    // Set axios token
    if (token) {
      this._setToken(token)
    }

    // Handle callbacks on page load
    const redirected = await this._handleCallback()

    if (!redirected) {
      return this.$auth.fetchUserOnce()
    }
  }

  _setToken(token) {
    // Set Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, token)
  }

  _clearToken() {
    // Clear Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, false)
  }

  async logout() {
    this._clearToken()
    return this.$auth.reset()
  }

  login(signUp = false, isGuide = false) {
    const opts = {
      protocol: 'oauth2',
      response_type: this.options.response_type,
      client_id: this.options.client_id,
      redirect_uri: this._redirectURI(signUp, isGuide),
      scope: this._scope,
      // Note: The primary reason for using the state parameter is to mitigate CSRF attacks.
      // @see: https://auth0.com/docs/protocols/oauth2/oauth-state
      state: this.options.state || 'fsdfsdsf',
    };

    if (this.options.audience) {
      opts.audience = this.options.audience
    }

    this.$auth.$storage.setLocalStorage(this.name + '.state', opts.state)

    const url = this.options.authorization_endpoint + '?' + encodeQuery(opts)

    window.location = url
  }

  async fetchUser() {
    if (!this.$auth.getToken(this.name)) {
      return
    }
    if (!this.options.userinfo_endpoint) {
      this.$auth.setUser({})
      return
    }

    const user = await this.$auth.requestWith(this.name, {
      url: this.options.userinfo_endpoint
    })

    this.$auth.setUser(user)
  }

  async _handleCallback(uri) {
    // Callback flow is not supported in server side
    if (process.server) {
      return
    }
    // Parse query from both search and hash fragments
    const hash = parseQuery(window.location.hash.substr(1))
    const search = parseQuery(window.location.search.substr(1))
    const parsedQuery = Object.assign({}, search, hash)

    // accessToken/idToken
    let token = parsedQuery[this.options.token_key || 'access_token']

    // refresh token
    let refreshToken = parsedQuery[this.options.refresh_token_key || 'refresh_token']

    if (!token || !token.length) {
      return
    }

    // Validate state
    const state = this.$auth.$storage.getLocalStorage(this.name + '.state')
    this.$auth.$storage.setLocalStorage(this.name + '.state', null)
    if (state && parsedQuery.state !== state) {
      return
    }

    await this.$auth.loginWith('password_grant', {
      data: {
        grant_type: "social",
        provider: this.options.provider,
        client_id: process.env.PASSPORT_CLIENT_ID,
        client_secret: process.env.PASSPORT_CLIENT_SECRET,
        access_token: token,
        signUp: parsedQuery.signUp || false,
        isGuide: parsedQuery.isGuide || false
      }
    });

    // Redirect to home
    // this.$auth.redirect('home', true);

    return true // True means a redirect happened
  }
}
