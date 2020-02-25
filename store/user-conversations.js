import { SET_LIST, SET_META, SET_MODEL, SET_MESSAGES } from './mutation-types';

export const state = () => ({
  list: [],
  messages: [],
  model: null,
  meta: []
});

export const getters = {}


export const actions = {
  async messages({ commit }, { route_key, params }) {
    try {
      const { data } = await this.$axios.$get(`users/conversations/${route_key}/messages`,
        { params });

      await commit(SET_MESSAGES, data);

    }
    catch (e) {

    }
  },
  async show({ commit }, { route_key, params }) {
    try {
      const { data } = await this.$axios.$get(`users/conversations/${route_key}`,
        { params });

      await commit(SET_MODEL, data);

    }
    catch (e) {

    }
  },
  startConversation({ commit }, user_route_key) {
    return this.$axios.$get(`users/conversations/to/${user_route_key}`)
  },
  async index({ commit }, { params }) {
    try {
      const { data, meta } = await this.$axios.$get(`users/conversations`,
        { params });

      await commit(SET_LIST, data);
      await commit(SET_META, meta);
    }
    catch (e) {

    }
  },
};


export const mutations = {
  [SET_META](state, input) {
    state.meta = input;
  },
  [SET_LIST](state, input) {
    state.list = input;
  },
  [SET_MESSAGES](state, input) {
    state.messages = input;
  },
  [SET_MODEL](state, input) {
    state.model = input;
  },
};
