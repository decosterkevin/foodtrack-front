<template>
  <section>
    <client-only>
      <b-container fluid>
        <b-row align-h="center">
          <b-col lg="6" cols="12">
            <b-row>
              <b-col lg="8">
                <b-input-group>
                  <b-form-input></b-form-input>
                  <b-input-group-append>
                    <b-button variant="secondary">Search</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col lg="4">
                <b-button v-b-toggle.collapse-1 variant="outline-primary">Filtering</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-collapse id="collapse-1" class="mt-2">
                <b-card>
                  <b-row>
                    <b-col sm="1">
                      <b-dropdown id="dropdown-form" text="Category" ref="dropdown">
                        <b-dropdown-form>
                          <b-form-checkbox>Alcool</b-form-checkbox>
                          <b-form-checkbox>Vegetable</b-form-checkbox>
                          <b-form-checkbox>Fruits</b-form-checkbox>
                          <b-form-checkbox>Bakery</b-form-checkbox>
                          <b-form-checkbox>Meat</b-form-checkbox>
                        </b-dropdown-form>
                      </b-dropdown>
                    </b-col>
                    <b-col sm="1">
                      <b-form-group>
                        <b-form-checkbox
                          id="is_deliverable_filter"
                          value="accepted"
                          unchecked-value="not_accepted"
                        >Is deliverable?</b-form-checkbox>
                      </b-form-group>
                    </b-col>
                    <b-col sm="1">
                      <b-form-input id="input-small" size="sm" placeholder="min price"></b-form-input>
                      <b-form-input id="input-small" size="sm" placeholder="max price"></b-form-input>
                    </b-col>
                    <b-col sm="1">
                      <b-form-input id="input-small" size="sm" placeholder="min rating"></b-form-input>
                      <b-form-input id="input-small" size="sm" placeholder="max rating"></b-form-input>
                    </b-col>
                    <b-col>
                      <b-button v-b-toggle.collapse-1 variant="primary">Reset</b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </b-collapse>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-1" align-h="center">
          <b-col class="wrapper mr-1 ml-1" lg="4" sm="12" cols="12">
            <b-modal hide-footer id="modalAddCart" title="Add to Cart">
              <addProductToCart v-if="addToCartProduct" :product="addToCartProduct" />
            </b-modal>
            <b-list-group>
              <b-list-group-item
                v-for="product in products"
                :key="product.id"
                @mouseover="onHover(product)"
                action
              >
                <product-item :product="product" @addToCart="addToCart"></product-item>
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col lg="7" sm="12" cols="0" class="map">
            <LeafMap :hoverProductCreator="hoverProductCreator" :productors="productors" />
          </b-col>
        </b-row>
      </b-container>
    </client-only>
  </section>
</template>
<script>
import ProductItem from "~/components/product/ProductItem.vue";
import AddProductToCart from "~/components/product/AddProductToCart.vue";
import LeafMap from "~/components/LeafMap";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "Products"
    };
  },
  data: () => ({
    hoverProductCreator: null,
    addToCartProduct: null,
  }),
  fetch({ store }) {
    return store.dispatch("public/getProducts")
  },

  computed: {
    ...mapGetters(["loggedInUser"]),
    ...mapState({
      products: state => {
        return state.public.products;
      },
      productors: state => {
        return state.public.productors;
      },
      filters: state => {
        return state.public.filters;
      }
    })
  },
  components: {
    ProductItem,
    LeafMap,
    AddProductToCart
  },
  mounted() {
    if (this.products && this.products.length > 0) {
      this.hoverProductCreator = this.products[0].creator;
    }
  },
  methods: {
    onHover(product) {
      if (product.creator.id != this.hoverProductCreator.id) {
        this.hoverProductCreator = product.creator;
      }
    },
    addToCart(product) {
      this.addToCartProduct = product;
      this.$root.$emit("bv::show::modal", "modalAddCart");
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 90vh;
  overflow: scroll;
}

@media (max-width: 768px) {
  .map {
    display: none;
  }
}
</style>