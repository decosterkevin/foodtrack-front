<template>
  <section>
    <b-container>
      <b-button
        href="https://pay.sandbox.datatrans.com/upp/jsp/upStart.jsp
		?merchantId=1100004624
		&refno=1234567890
		&amount=1000
		&currency=CHF
		&theme=DT2015"
      >Pay</b-button>
      <b-table striped class="products-table" show-empty :items="items" :fields="fields">
        <template v-slot:cell(product_name)="data">
          <nuxt-link :to="`/products/${data.item.product}`"><strong>{{data.item.product_name}}</strong></nuxt-link>
        </template>
        <template v-slot:cell(totalPrice)="data">{{ data.item.quantity*data.item.price }}</template>
        <template v-slot:cell(actions)="data">
            <b-button variant="light" @click="deleteItem(data.item)">
              <font-awesome-icon v-bind:icon="['far', 'times-circle']" />
            </b-button>
          </template>
        <!-- <template slot="[actions]" slot-scope="data">
          <div class="action-buttons">
            <b-button @click="deleteItem(data.item)">TT
            </b-button>
          </div>
        </template> -->
      </b-table>
    </b-container>
  </section>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({
      cart: state => {
        return state.cart.cart;
      },
      items: state => {
        return state.cart.cart.items;
      }
    })
  },
  async fetch({ store }) {
    await store.dispatch("cart/get");
  },
  data() {
    return {
      fields: [
        {
          key: "product_name",
          label: "Name"
        },
        {
          key: "quantity",
          label: "Quantity"
        },
        {
          key: "unit_price",
          label: "Unit Price"
        },
        {
          key: "total_price",
          label: "Total Price"
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  head() {
    return {
      title: "My cart"
    };
  },
  methods: {
    deleteItem(item) {
      this.$bvModal.msgBoxConfirm("Are you sure?").then(value => {
        if (value) {
          this.$store
            .dispatch("cart/delete", {product_id: item.product, quantity: item.quantity})
            .then((res) => {
                return this.$store.dispatch("cart/get")
            })
            .then((res)=> {
                this.$toast.success(`Cart: ${item.product_name} removed`, {icon: "trash-alt"})
            })
            .catch((e) => {
                this.$toast.error(`Error: while removing ${cart.name} from cart`, {icon: "exclamation"})
            });
        }
      });
    }
  }
};
</script>

<style scoped>
#products-table {
  margin-top: 50px;
  background: white;
}
</style>