import { SET_MODEL } from './mutation-types';

export const state = () => ({
  model: null,
});

export const actions = {
  async show({ commit }, { route_key, params }) {
    const { data } = await this.$axios.$get(`pages/${route_key}`,
      { params });

    await commit(SET_MODEL, data);
  },
};

export const mutations = {
  [SET_MODEL](state, input) {
    state.model = input;
  },
};
