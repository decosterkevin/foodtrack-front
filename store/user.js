export const state = () => ({
  user: {}
});

export const mutations = {
  set(state, user) {
    state.user = user;
  }
};
export const actions = {
  // async get({ commit, rootState}, profileId) {
  //     if (!profileId) {
  //         profileId = rootState.auth.user.user_profile
  //     }
  //     await this.$axios.$get(`/authentication/user`)
  //         .then(res => {
  //             commit('set', res)
  //         })
  // },
  update({ commit }, profile) {
    return this.$axios.$patch(`/authentication/user`, profile);
  }
};
