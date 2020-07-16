<template>
  <div style="height: 90vh;">
    <client-only>
      <l-map
        :zoom="13"
        :bounds="bounds"
        @update:bounds="boundsUpdated"
        :center="hoverProductCreator? hoverProductCreator.address : defaultCenter"
      >
        <l-control class="example-custom-control">
          <b-button variant="outline-danger" @click="searchZone">Search here</b-button>
        </l-control>
        <l-tilelayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tilelayer>
        <l-marker-cluster>
          <l-marker
            :icon="hoverProductCreator && productor.id == hoverProductCreator.id? selectedIcon : defaultIcon"
            v-for="productor in productors"
            @click="focus(productor.id)"
            :key="productor.id"
            :lat-lng="productor.address"
          >
            <l-popup>
              <productor-card :productor="productor"></productor-card>
            </l-popup>
          </l-marker>
        </l-marker-cluster>
      </l-map>
    </client-only>
  </div>
</template>
<script>
import ProductorCard from "~/components/productor/ProductorCard.vue";
import { mapState } from "vuex";

export default {
  props: ["hoverProductCreator", "productors"],
  data: () => ({
    defaultCenter: ["46.607186", "2.499115"],
    defaultIcon: null,
    selectedIcon: null,
    bounds: null,
    draggable: true
  }),
  components: {
    ProductorCard
  },
  // computed: {
  //   ...mapState({
  //     markers: state => {
  //       let markersTmp = {};
  //       for (let product of this.products) {
  //         let creator = { ...product.creator };

  //         if (markersTmp[creator.id] === undefined) {
  //           markersTmp[creator.id] = creator;
  //           markersTmp[creator.id]["nb_products"] = 1;
  //         } else {
  //           markersTmp[creator.id]["nb_products"] =
  //             markersTmp[creator.id]["nb_products"] + 1;
  //         }
  //       }
  //       return Object.values(markersTmp);
  //     }
  //   })
  // },
  mounted() {
    let arrayBox = this.$store.state.public.filters['box'].split(",");
    this.bounds = [[arrayBox[1], arrayBox[0]], [arrayBox[3], arrayBox[2]]];
    this.defaultIcon = this.$L.icon({
      iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
      shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    });
    this.selectedIcon = this.$L.icon({
      iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
      shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    });
  },
  methods: {
    searchZone() {
      this.$store.commit("public/setFilter", {"box": this.bounds.toBBoxString()});
      this.$store.dispatch("public/getProducts");
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    focus(productId) {}
  }
};
</script>

<style >
@import "leaflet/dist/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";
.mini-map {
  width: 100%;
  height: 600px !important;
}
.leaflet-popup-content {
  width: 500px;
  height: 300px;
  overflow: scroll;
}
</style>