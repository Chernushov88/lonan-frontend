import { SET_LIST, SET_META } from './mutation-types';

export const state = () => ({
  list: [],
  meta: []
});

export const actions = {
  async index({ commit }) {
    const { data } = await this.$axios.$get(`event-categories`);

    await commit(SET_LIST, data);
  },
};

export const mutations = {
  [SET_META](state, input) {
    state.meta = input;
  },
  [SET_LIST](state, input) {
    state.list = input;
  },
};
