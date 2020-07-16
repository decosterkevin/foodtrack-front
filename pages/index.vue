<template>
  <section>
    <b-container>
      <div class="dark-theme main">
        <h1>Foodtrack</h1>
        <p class="mt-3">
          Eat Local
          <font-awesome-icon class="mr-2" v-for="item in icons" :key="item" :icon="['fas', item]" />
        </p>

        <b-button variant="outline-primary" :to='"/products"' v-if="isAuthenticated">
          View products
          <span class="ml-2">&rarr;</span>
        </b-button>
        <b-button variant="outline-primary" to="/register" v-else>
          Register
          <span class="ml-2">&rarr;</span>
        </b-button>
      </div>
    </b-container>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  auth: false,
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  data: function() {
    return {
      icons: this.getIcons()
    };
  },
  head() {
    return {
      title: "Home"
    };
  }
};
</script>
<style>
.main {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
}
</style>