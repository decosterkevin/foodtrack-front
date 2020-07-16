<template>
  <b-navbar class="bg-transparent" type="dark" variant="primary" sticky>
    <b-navbar-brand><nuxt-link to="/" >Foodtrack</nuxt-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button variant="outline-primary" :to='"/dashboard/cart"' v-if="isAuthenticated" class="text-decoration-none">
          <!-- <md-icon class="fa fa-shopping-cart"></md-icon> -->
          <font-awesome-icon v-bind:icon="['fas', 'shopping-cart']" size="lg" />
          <b-badge variant="light">{{cart.items.length}}</b-badge>
        </b-button>
        <b-nav-item-dropdown right v-if="isAuthenticated">
          <!-- Using 'button-content' slot -->

          <template slot="button-content">
            <em>{{ loggedInUser.username }}</em>
          </template>
          <b-dropdown-item to="/dashboard">{{ this.$t("general.profile") }}</b-dropdown-item>
          <b-dropdown-item to="/dashboard/products"  v-if="isProductor">{{ this.$t("general.my_product") }}</b-dropdown-item>
          <b-dropdown-item @click="logout">{{ this.$t("general.logout") }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-row right v-else no-gutters>
          <b-nav-item><nuxt-link to="/register" >{{ this.$t("general.register") }}</nuxt-link> </b-nav-item>
          <b-nav-item><nuxt-link to="/login" >{{ this.$t("general.login") }}</nuxt-link> </b-nav-item>
        </b-row>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser", "isProductor"]),
    ...mapState({
      cart: state => {
        return state.cart.cart;
      }
    }),
    products() {
      return this.$route.path === "/products";
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
};
</script>
<style>
b-navbar-nav a {
    text-decoration: none;
}
/* @keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes godown {
  100% {
    top: 180px;
  }
}

@keyframes goright {
  100% {
    left: 70px;
  }
} */
</style>
