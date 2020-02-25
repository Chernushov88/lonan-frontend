import { SET_LIST, SET_META, SET_MODEL } from './mutation-types';

export const state = () => ({
  list: [],
  model: null,
  meta: []
});

export const getters = {
  isPrivateFeature: (state) => (authUser) => {
    return authUser ? authUser.id === state.model.id  : false;
  },
  isGuide(state) {
    return Boolean(state.model.guideProfile);
  },
}


export const actions = {
  async show({ commit }, { route_key, params }) {
    const { data } = await this.$axios.$get(`users/${route_key}`,
      { params });

    await commit(SET_MODEL, data);
  },

  async update({ commit }, { route_key, body }) {
    try {
      const { data } = await this.$axios.$post(`users/${route_key}`,
        body,
        { headers: { 'Content-Type': 'multipart/form-data' } });

      await commit(SET_MODEL, data);
    }
    catch (e) {

    }

  }
};


export const mutations = {
  [SET_META](state, input) {
    state.meta = input;
  },
  [SET_LIST](state, input) {
    state.list = input;
  },
  [SET_MODEL](state, input) {
    state.model = input;
  },
};
