<template>
  <span>
    <b-button variant="link" class="text-decoration-none" v-if="isFavorited" @click.stop="unFavorite()">
      <font-awesome-icon v-bind:icon="['fas', 'heart']" size="lg" />
    </b-button>
    <b-button variant="link" class="text-decoration-none" v-else @click.stop="favorite()">
      <font-awesome-icon :icon="['far', 'heart']" size="lg"/>
    </b-button>
  </span>
</template>

<script>
export default {
  props: ["favorited", "productId", "productName"],

  data: function() {
    return {
      isFavorited: ""
    };
  },

  mounted() {
    this.isFavorited = this.isFavorite ? true : false;
  },

  computed: {
    isFavorite() {
      return this.favorited;
    }
  },

  methods: {
    favorite() {
      this.$store
        .dispatch("public/addToFavorite", this.productId)
        .then(() => {
          this.isFavorited = !this.isFavorited;
          this.$toast.success(`${this.productName} added to favorite`, {icon: "heart"})
        })
        .catch(e => {
          this.$toast.error('Error: can not add to favorite', {icon: "exclamation"})
        });
    },

    unFavorite() {
      this.$store
        .dispatch("public/removeFromFavorite", this.productId)
        .then(() => {
          this.isFavorited = !this.isFavorited;
          this.$toast.success(`${this.productName} removed from favorite`, {icon: "heart-broken"})
        })
        .catch(e => {
          this.$toast.error('Error: can not remove from favorite', {icon: "exclamation"})
        });
    }
  }
};
</script>