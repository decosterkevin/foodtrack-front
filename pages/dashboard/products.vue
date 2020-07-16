<template>
  <section>
    <b-container fluid>
      <b-row>
        <b-modal size="xl" hide-footer ref="modalModifyItem" id="modalModifyItem" title="Product">
          <addEditProduct-card :product="productToModify" :isEdit="isEdit" />
        </b-modal>
      </b-row>
      <b-row>
        <b-col class="align-self-end">
          <b-button variant="outline-light" class="float-right" @click="addProduct">Add Product</b-button>
        </b-col>
      </b-row>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="6">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <!-- <b-col sm="7" md="6">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination> -->
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-row align-h="around">
        <b-col lg="10">
          <b-table
            class="products-table"
            sticky-header="60vh"
            striped
            show-empty
            :items="products"
            :fields="fields"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          >
            <template v-slot:cell(picture)="row">
              <b-img :src="row.value" width="100px" thumbnail alt="Responsive image"></b-img>
            </template>
            <template v-slot:cell(description)="row" class="w-25">
              <b-col>{{row.value}}</b-col>
            </template>
            <template v-slot:cell(actions)="row">
              <div class="action-buttons">
                <b-button
                  :to="`/products/${row.item.id}/`"
                  variant="outline-primary"
                >{{ $t("general.view") }}</b-button>
                <b-button
                  @click="editProduct(row.item)"
                  variant="outline-warning"
                >{{ $t("general.edit") }}</b-button>
                <b-button
                  @click="deleteProduct(row.item)"
                  variant="outline-danger"
                >{{ $t("general.delete") }}</b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import AddEditProductCard from "~/components/product/AddEditProductCard.vue";
export default {
  head() {
    return {
      title: "My products"
    };
  },
  middleware: "productor",
  fetch({ store }) {
    return store.dispatch("productor/get").then(res => {});
  },
  components: {
    AddEditProductCard
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    ...mapState({
      products: state => {
        console.log(state.productor.list.length)
        return state.productor.list;
      }
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  data() {
    return {
      productToModify: undefined,
      isEdit: false,
      fields: [
        {
          key: "picture",
          label: "Picture",
          sortable: false
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
          class: "text-center"
        },
        {
          key: "price",
          label: "Price",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "quantity",
          label: "Quantity",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "is_deliverable",
          label: "is deliverable?",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "delivery_time_days",
          label: "Delivery delay",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "is_active",
          label: "is Active",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "description",
          label: "Description",
          sortable: false
        },
        { key: "actions", label: "Actions" }
      ],
      // totalRows: 1,
      // currentPage: 1,
      // perPage: 7,
      // pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: []
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.products.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    deleteProduct(product) {
      this.$bvModal.msgBoxConfirm("Are you sure?").then(value => {
        if (value) {
          this.$store
            .dispatch("productor/delete", product.product_id)
            .then(() => {
              this.$toast.success(`Product ${product.name} deleted`, {
                icon: "trash-alt"
              });
              this.$store.dispatch("productor/get");
            })
            .catch(e => {
              this.$toast.error(`Could not delete ${product.name}`, {
                icon: "exclamation"
              });
            });
        }
      });
    },
    addProduct() {
      this.productToModify = {};
      this.isEdit = false;
      this.$root.$emit("bv::show::modal", "modalModifyItem");
    },
    editProduct(product) {
      this.productToModify = {...product};
      this.isEdit = true;
      this.$root.$emit("bv::show::modal", "modalModifyItem");
    }
  }
};
</script>
<style>
.table > tbody > tr > td {
  vertical-align: middle;
}
</style>