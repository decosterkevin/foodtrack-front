<template>
  <section>
    <b-container>
      <b-row>
        <b-col>
          <productor-card :productor="productor"></productor-card>
        </b-col>
        <b-col class="wrapper">
          <b-list-group>
            <b-list-group-item
              v-for="product in productor.products"
              :key="product.id"
              @click="seeProduct(product.id)"
              action
            >
              <product-item :product="product"></product-item>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import ProductorCard from "~/components/productor/ProductorCard.vue";
import ProductItem from "~/components/product/ProductItem.vue";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "View Profile"
    };
  },
  async asyncData({ params, store }) {
    let productor = await store.dispatch("public/getProductorProfile", params.id);
    return { productor };
  },
  components: {
    ProductorCard,
    ProductItem
  },
  data() {
    return {
      productor: null
    };
  },
  methods: {
    seeProduct(productId) {
      this.$router.push(`/products/${productId}/`);
    }
  }
};
</script>
<style scoped>
.wrapper {
  height: 90vh;
  overflow: scroll;
}
</style>