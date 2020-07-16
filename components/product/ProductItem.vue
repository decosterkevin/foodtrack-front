<template>
  <b-card @click="seeProduct(product.id)" no-body class="overflow-hidden" style="height: 170px;">
    <b-row no-gutters>
      <b-col lg="6">
        <favorite
        class="favorite"
        :favorited="product.is_favorite"
        :productId="product.id"
        :productName="product.name"
        ></favorite>
        <b-card-img :src="product.picture" class="rounded-0"></b-card-img>
      </b-col>
      <b-col lg="6">
        <b-button class="float-right button-cart" variant="outline-primary" @click.stop="addToCart">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        </b-button>
        <b-card-body :sub-title="product.category">
          <b-card-title title-tag="h5">{{ product.name }}</b-card-title>
          <!-- <b-card-text>
            <b-row>{{product.description}}</b-row>
          </b-card-text>-->
          <b-card-text>
            <b-row>
              <b-col>
                <star-rating
                  :star-size="15"
                  :round-start-rating="false"
                  :rating="product.rating"
                  :read-only="true"
                  :show-rating="false"
                ></star-rating>
              </b-col>
              <b-col>quantity: {{product.quantity}}</b-col>
            </b-row>
          </b-card-text>
          <footer>
            <b-row class="float-right">
              <b-col>
                <h2>{{product.price}} €</h2>
              </b-col>
            </b-row>
          </footer>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>

import Favorite from "~/components/Favorite.vue";

export default {
  props: ["product"],
  components: {
    Favorite
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product);
      // this.$store.dispatch("cart/add", this.product)
      // this.$root.$emit('bv::show::modal', 'modalAddCart', $event.target)
    },
    seeProduct(productId) {
      this.$router.push(`/products/${productId}/`);
    },
  }
};
</script>
<style>
.product-card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
}

.favorite {
  position:absolute;
  top:0;
  margin: 10px
}
.button-cart {
  margin: 10px
}
</style>