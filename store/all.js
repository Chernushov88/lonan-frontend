import { SET_LIST, SET_META } from './mutation-types';

export const state = () => ({
  list: [],
  meta: []
});

export const actions = {
  async index({ commit }, { destination, params }) {
    const { data, meta } = await this.$axios.$get(`destinations/${destination}/all`,
      { params });

    await commit(SET_LIST, data);
    await commit(SET_META, meta);
  },
};


export const mutations = {
  [SET_LIST](state, input) {
    state.list = input;
  },
  [SET_META](state, input) {
    state.meta = input;
  },
};
