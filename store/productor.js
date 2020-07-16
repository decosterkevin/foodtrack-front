export const state = () => ({
  list: [],
});

export const mutations = {
  set(state, products) {
    state.list = products;
  }
};
export const actions = {
  get({ commit, rootState }, productorId) {
    if (productorId === undefined) {
      productorId =rootState.auth.user.productor_profile
    }
    return this.$axios
      .$get(`/core/productor/${productorId}/products`)
      .then(res => {
        console.log(res.length)
        commit("set", res);
        return Promise.resolve("get");
      })
      .catch(((err)=> {
        return Promise.reject(err)
      }))
  },
  delete({ commit, rootState }, productId) {
    let productorId =rootState.auth.user.productor_profile
    return this.$axios.$delete(`/core/productor/${productorId}/products/${productId}/`).then((res)=> {

    });
  },
  post({ commit, rootState }, params) {
    let formData = new FormData();
    for (let data in params) {
      formData.append(data, params[data]);
    }
    let productorId =rootState.auth.user.productor_profile
    return this.$axios.$post(`/core/productor/${productorId}/products/`, formData, {
      "content-type": "multipart/form-data"
    });
  },
  update({ commit, rootState }, params) {
    let formData = new FormData();
    for (let data in params) {
      formData.append(data, params[data]);
    }
    let productorId =rootState.auth.user.productor_profile
    return this.$axios.$put(`/core/productor/${productorId}/products/${params.id}/`, formData, {
      "content-type": "multipart/form-data"
    });
  }
};
