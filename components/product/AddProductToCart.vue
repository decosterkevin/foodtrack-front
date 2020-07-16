<template>
  <b-card class="text-center">
    <b-card-text>
      <span class="text-primary h2">{{product.price}} €</span> the piece
    </b-card-text>
    <b-form>
      <b-form-group
        :label="`Quantité souhaitée : (
                  ${product.quantity} pièce(s) en stock)`"
        label-for="quantity"
      >
        <b-form-input placeholder="0" id="quantity" v-model="cart.quantity" type="number"></b-form-input>
      </b-form-group>

      <b-form-group label="Mode de livraison" label-for="delivery">
        <b-form-select id="delivery" v-model="cart.deliveryMode">
          <option :value="null" disabled>--- Please select an option ---</option>
          <option v-if="product.is_pickup" value="pickup">Pickup at producting location</option>
          <option
            v-if="product.is_deliverable"
            value="delivery"
          >Delivery in {{product.delivery_time_days}} days</option>
        </b-form-select>
      </b-form-group>
      <b-form-group>
        <b-button block @click="addToCart" variant="primary">Ajouter au panier</b-button>
      </b-form-group>
      <b-card-text>Si vous avez des doutes sur le moyen de livraison, veuillez vous référer au paragraphe : "Les modes de livraison"</b-card-text>
    </b-form>
  </b-card>
</template>
<script>
export default {
  props: ["product"],
  data() {
    return {
      cart: {
        delivery_mode: null,
        quantity: 0,
        name: this.product.name,
        price: this.product.price,
        product_id: this.product.id
      }
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch("cart/add", this.cart)
      .then((res) => {
        return this.$store.dispatch("cart/get")
      })
      .then((res) => {
          this.$toast.success(`Cart: ${this.cart.name} added`, {icon: this.generateProductIcon()})
      })
      .catch((e)=> {
          this.$toast.error(`Cart: ${this.cart.name} could not be added`, {icon: "exclamation"})
      })
      this.$root.$emit('bv::hide::modal', 'modalAddCart')
    }
  }
};
</script>
<style>
</style>