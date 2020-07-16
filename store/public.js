function map2query(filters) {
  let queryString = "";
  queryString =
    "&" +
    Object.keys(filters)
      .map(key => key + "=" + filters[key])
      .join("&");
  return queryString
}

export const state = () => ({
  products: [],
  productors: [],
  filters: {
    "box": "-4.46,42.31,9.04,51.15"
  }
});

export const mutations = {
  setProducts(state, res) {
    state.products = res
    state.productors = res.map(function (item) {
      return item.creator
    })
  },
  setFilter(state, filter) {
    state.filters = Object.assign(state.filters, filter)
  }
};
export const actions = {
  getProducts({ commit, state }) {

    let queryString = map2query(state.filters)
    return this.$axios.$get(`/core/products/?with_creator=True&${queryString}`)
      .then((res) => {
        commit("setProducts", res)
        return true;
      });
  },
  getProduct({ commit }, productId) {
    console.log("sdjb")
    return this.$axios.$get(`/core/products/${productId}/?with_creator=True`);
  },
  addToFavorite({ commit }, productId) {
    return this.$axios.$get(`/core/products/${productId}/add_to_favorite`);
  },
  removeFromFavorite({ commit }, productId) {
    return this.$axios.$get(`/core/products/${productId}/remove_from_favorite`);
  },
  getProductorProfile({ commit, rootState }, profileId) {
    if (profileId === undefined) {
      profileId = rootState.auth.user.productor_profile.id;
    }
    return this.$axios.$get(
      `/core/profile/productors/${profileId}?with_products=True`
    );
  },
  getUserProfile({ commit, rootState }, profileId) {
    if (profileId === undefined) {
      profileId = rootState.auth.user.user_profile.id;
    }
    return this.$axios.$get(`/core/profile/users/${profileId}`);
  },
  subscribe({ commit }, email) {
    return this.$axios.$post(`/mailing/subscribe`, { email: email });
  },
  contact({ commit }, params) {
    console.log(params)
    return this.$axios.$post(`mailing/contact`, params);
  }
};
