export const strict = false;


export const actions = {
  nuxtServerInit({ state }, { isDev }) {
    state.isDev = isDev;
  }
};


export const state = () => ({
  isDev: null
});
