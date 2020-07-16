<template>
  <b-container style="width=500px;">
    <b-row>
      <b-col lg="6" mb="4">
        <div v-if="isEdit">
          <img
            v-if="!preview"
            class="img-fluid"
            style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
            :src="product.picture"
          />
          <img
            v-else
            class="img-fluid"
            style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
            :src="preview"
          />
        </div>
        <div v-else>
          <img
            v-if="preview"
            class="img-fluid"
            style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
            :src="preview"
            alt
          />
          <img
            v-else
            class="img-fluid"
            style="width: 400px; border-radius: 10px; box-shadow: 0 1rem 1rem rgba(0,0,0,.7);"
            src="@/static/images/placeholder.png"
          />
        </div>
      </b-col>
      <b-col lg="6" mb="4">
        <b-form>
          <b-row>
            <b-col lg="6">
              <b-form-group label="Name" label-for="name">
                <b-form-input placeholder="name" id="name" v-model="product.name" type="text"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="6" class="form-group">
              <b-form-group label="Code" label-for="product_code">
                <b-form-input
                  placeholder="Code"
                  id="code"
                  v-model="product.product_code"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col>
              <b-form-group label="Description" label-for="description">
                <b-form-input
                  placeholder="Description"
                  id="description"
                  v-model="product.description"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <b-form-group label="Price" label-for="price">
                <b-form-input placeholder="Price" id="price" v-model="product.price" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col lg="6" class="form-group">
              <b-form-group label="Quantity" label-for="quantity">
                <b-form-input
                  placeholder="Quantity"
                  id="quantity"
                  v-model="product.quantity"
                  type="number"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row align-h="around">
            <b-col>
              <b-form-group label="Category" label-for="category">
                <b-form-select id="category" v-model="product.category" :options="categories"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Picture" label-for="picture">
                <b-form-file
                  @change="onFileChange"
                  v-model="product.picture"
                  :state="Boolean(product.picture)"
                  id="picture"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6">
              <b-form-group class="form-label-group">
                <b-form-checkbox
                  v-model="product.is_deliverable"
                  id="isDeliverable"
                  required
                >is Deliverable?</b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col lg="6" class="form-group" v-if="product.is_deliverable">
              <b-form-group label="Delay" label-for="delay">
                <b-form-input placeholder="Delay" id="delay" v-model="product.delay" type="text"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-button @click="submitProduct" class="btn btn-primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  props: {
    product: { type: Object },
    isEdit: { type: Boolean, default: false }
  },
  mounted() {
    if (this.product === undefined) {
      this.product = {
        name: "",
        picture: "",
        description: "",
        is_deliverable: false,
        delay: 7,
        code: "",
        price: 0,
        quantity: 0,
        category: null
      };
    }
  },
  data() {
    return {
      categories: [
        { value: null, text: "Please select a category" },
        { value: "ALCOOL", text: "Alcool" },
        { value: "VEGETABLE", text: "Vegetable" },
        { value: "MEAT", text: "Meat" },
        { value: "BAKERY", text: "Bakery" }
      ],
      preview: ""
    };
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.product.picture = files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
      // let image = new Image();
      let reader = new FileReader();
      let vm = this;
      reader.onload = e => {
        vm.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async submitProduct() {
      let action = this.isEdit ? "productor/update" : "productor/post";
      let type = this.isEdit ? "edited" : "added";
      this.$store
        .dispatch(action, this.product)
        .then(() => {
          this.$toast.success(`Product ${this.product.name} ${type}`, {
            icon: this.generateProductIcon()
          });
          this.$store.dispatch("productor/get");
          this.$root.$emit("bv::hide::modal", "modalModifyItem");
        })
        .catch(e => {
          this.$toast.error(
            `Product ${this.product.name} could not be ${type}`,
            { icon: "exclamation" }
          );
        });
    }
  }
};
</script>
<style scoped>
</style>