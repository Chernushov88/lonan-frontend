import { SET_LIST, SET_META, SET_MODEL } from './mutation-types';

export const state = () => ({
  model: null,
  list: [],
  meta: []
});

export const actions = {
  async index({ commit }, { destination, params }) {
    const { data, meta } = await this.$axios.$get(`destinations/${destination}/hotels`,
      { params });

    await commit(SET_LIST, data);
    await commit(SET_META, meta);
  },
  async show({ commit }, { route_key, params }) {
    const { data } = await this.$axios.$get(`hotels/${route_key}`,
      { params });

    await commit(SET_MODEL, data);
  },
  async favorite({ commit }, { model, silent }) {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'login' });

      return;
    }

    const { data } = await this.$axios.$post(`hotels/${model.route_key}/favorite`);

    if (!silent) {
      await commit(SET_MODEL, data);
    }
  },
  async unfavorite({ commit }, { model, silent }) {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'login' });

      return;
    }

    const { data } = await this.$axios.$post(`hotels/${model.route_key}/unfavorite`);

    if (!silent) {
      await commit(SET_MODEL, data);
    }
  },
};

export const getters = {
  avgPercents(state) {
    if (state.model) {
      return (100 * state.model.avg_rating) / 5;
    }

    return 0;
  }
};

export const mutations = {
  [SET_MODEL](state, input) {
    state.model = input;
  },
  [SET_META](state, input) {
    state.meta = input;
  },
  [SET_LIST](state, input) {
    state.list = input;
  },
};
