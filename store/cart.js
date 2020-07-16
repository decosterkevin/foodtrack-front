export const state = () => ({
  cart: {}
});

export const mutations = {
  set(state, cart) {
    state.cart = cart;
  }
};

export const actions = {
  get({ commit, rootState }, cartId) {
    if (cartId === undefined) {
      cartId = rootState.auth.user.user_profile.current_cart.id;
    }
    return this.$axios.$get(`/core/cart/${cartId}/`).then(res => {
      commit("set", res);
      return Promise.resolve("cart updated");
    });
  },
  add({ commit, rootState }, params) {
    let cartId = rootState.auth.user.user_profile.current_cart.id;
    return this.$axios.$post(`/core/cart/${cartId}/add_to_cart/`, params, {
      "content-type": "application/json"
    });
  },
  delete({ commit, rootState }, params) {
    let cartId = rootState.auth.user.user_profile.current_cart.id;
    return this.$axios.$post(`/core/cart/${cartId}/remove_from_cart/`, params, {
      "content-type": "application/json"
    });
  },
  empty({ commit, rootState }) {
    let cartId = rootState.auth.user.user_profile.current_cart.id;
    return this.$axios.$get(`/core/cart/${cartId}/empty_cart/`);
  }
};
