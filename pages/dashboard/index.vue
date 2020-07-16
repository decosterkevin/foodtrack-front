<template>
  <section>
    <b-container class="my-5 dark-theme">
      <b-row>
      <b-col lg="12" class="text-center" >
        <h2 class="text-uppercase">{{ loggedInUser.username }}</h2>
      </b-col>
      <b-col lg="6" mb="4">
        <b-img 
          rounded
          thumbnail
          v-if="loggedInUser.user_profile"
          :src="loggedInUser.user_profile.picture"
          alt
        />
        <b-img 
          v-else
          rounded
          thumbnail
          :src="loggedInUser.productor_profile.user_picture"
          alt
        />
      </b-col>
      <b-col lg="6">
        <div class="product-details">
          <h4>{{ this.$t("loggedInUser.bio") }}:</h4>
          <p>{{ loggedInUser.birth_date }}</p>
        <div v-if="isProductor">
          <h4>Productor info:</h4>
          <p>Test</p>
        </div>
        </div>
      </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  head() {
    return {
      title: "My profile"
    };
  },
  // async fetch({ store }) {
    // await store.dispatch("profile/get");
  // },
  computed: {
    ...mapGetters(["loggedInUser", "isProductor"]),
  }
};
</script>