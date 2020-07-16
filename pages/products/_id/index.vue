<template>
  <section>
    <b-container>
      <b-row align-h="around">
        <b-col lg="5">
          <product-card :product="product" />
        </b-col>
        <b-col lg="4">
          <AddProductToCart :product="product" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import ProductCard from "~/components/product/ProductCard.vue";
import AddProductToCart from "~/components/product/AddProductToCart.vue";
export default {
  head() {
    return {
      title: "View Product"
    };
  },
  components: {
    ProductCard,
    AddProductToCart
  },
  async asyncData({ params, store }) {
    let product = await store.dispatch("public/getProduct", params.id);
    return { product };
  },
  data() {
    return {
      product: ""
    };
  }
};
</script>
<style>
</style>