import { SET_LIST, SET_META, SET_MODEL, TOGGLE_SEARCH } from './mutation-types';

export const state = () => ({
  model: null,
  list: [],
  meta: [],
  searchOpened: false
});

export const actions = {
  async index({ commit }, { params }) {
    const { data, meta } = await this.$axios.$get(`destinations`, { params });

    await commit(SET_LIST, data);
    await commit(SET_META, meta);
  },
  async show({ commit }, { route_key, params }) {
    const { data } = await this.$axios.$get(`destinations/${route_key}`, { params });

    await commit(SET_MODEL, data);
  },

  async toggleSearch({ commit }) {
    await commit(TOGGLE_SEARCH)
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
  [TOGGLE_SEARCH](state) {
    state.searchOpened = !state.searchOpened;
  },
};
