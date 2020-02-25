import { SET_LIST, SET_META, SET_MODEL } from './mutation-types';

export const state = () => ({
  list: [],
  meta: []
});

export const actions = {
  async index({ commit }, { model, route_key, params }) {
    const { data, meta } = await this.$axios.$get(`${model}/${route_key}/reviews`,
      { params });

    await commit(SET_LIST, data);
    await commit(SET_META, meta);
  },
  async favorite({ commit }, { model, silent }) {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'login' });

      return;
    }

    try {
      const { data } = await this.$axios.$post(`reviews/${model.route_key}/favorite`);

      model.is_liked = true;
    }
    catch (e) {

    }

    if (!silent) {
      await commit(SET_MODEL, data);
    }
  },
  async unfavorite({ commit }, { model, silent }) {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'login' });

      return;
    }

    try {
      const { data } = await this.$axios.$post(`reviews/${model.route_key}/unfavorite`);

      model.is_liked = false;
    }
    catch (e) {

    }

    if (!silent) {
      await commit(SET_MODEL, data);
    }
  },

  async create({ commit }, { entityName, entityId, data }) {
    return this.$axios.$post(`reviews/${entityName}/${entityId}`,
      data, { headers: { 'Content-Type': 'multipart/form-data' } });
  }
};


export const mutations = {
  [SET_META](state, input) {
    state.meta = input;
  },
  [SET_LIST](state, input) {
    state.list = input;
  },
};
