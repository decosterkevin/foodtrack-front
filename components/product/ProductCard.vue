<template>
  <b-card no-body :img-src="product.picture" img-top>
    <b-card-body>
      <b-card-sub-title>{{product.category}}</b-card-sub-title>
      <b-card-title>{{product.name}}</b-card-title>
      <b-card-text>{{product.description}}</b-card-text>
    </b-card-body>
    <b-card-body class="text-center">
      <favorite class="favorite" :favorited="product.is_favorite" :productId="product.id" :productName="product.name"></favorite>
      <b-row>
        <b-col lg="3">
          <b-img
            style="margin-top: -30px; max-width: 5rem;"
            :src="product.creator.user_picture"
            rounded="circle"
          ></b-img>
        </b-col>
        <b-col lg="3">
          <star-rating
            :star-size="15"
            :round-start-rating="false"
            :rating="product.creator.rating"
            :read-only="true"
            :show-rating="false"
          ></star-rating>
        </b-col>
        <b-col lg="6">
          <nuxt-link :to="`/profile/${product.creator.id}/`">{{product.creator.name}}</nuxt-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a :href="`https://www.google.com/maps/place/${address}`" target="_blank">{{address}}</a>
        </b-col>
      </b-row>
    </b-card-body>
    <b-card-text class="small text-center">Created {{product.created_at}}</b-card-text>
  </b-card>
</template>
<script>
import Favorite from "~/components/Favorite.vue";
export default {
  props: ["product"],
  components: {
    Favorite
  },
  data: () => ({
    address: ""
  }),
  mounted() {
    let productor = this.product.creator;
    this.address =
      productor.address.street +
      ", " +
      productor.address.postal_code +
      " " +
      productor.address.city;
  }
};
</script>
<style>
.product-card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
}
.favorite {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
}
</style>