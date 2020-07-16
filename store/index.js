export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  },
  isProductor(state) {
    if (state.auth.user) {
      return state.auth.user.is_productor;
    } else {
      return false;
    }
  }
};
export const actions = {
  async nuxtServerInit({ dispatch, state }, req) {
    if (state.auth.loggedIn) {
      console.log("get cart");
      await dispatch("cart/get");
    } else {
      console.log("can't get cart because no user");
    }
  }
};
