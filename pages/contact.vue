<template>
  <section>
    <b-container>
      <h1 class="dark-theme">Contact us</h1>
      <b-row>
        <b-col lg="6" sm="12" cols="12" class="content">
          <b-form>
            <label for="input-name">Name:</label>
            <b-form-input
              id="input-name"
              v-model="form.name"
              :state="nameState"
              aria-describedby="input-name-feedback"
              placeholder="Enter your name"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-name-feedback">Enter at least 3 letters</b-form-invalid-feedback>
            <label for="input-email">Email:</label>
            <b-form-input
              id="input-email"
              v-model="form.from"
              :state="emailState"
              aria-describedby="input-email-feedback"
              placeholder="Enter your email"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-email-feedback">Enter a valid email</b-form-invalid-feedback>
            <label for="input-msg">Message:</label>
            <b-form-textarea
              id="input-msg"
              v-model="form.msg"
              :state="msgState"
              aria-describedby="input-msg-feedback"
              placeholder="Your message"
              rows="6"
              max-rows="10"
            ></b-form-textarea>
            <b-button variant="primary" @click="onSubmit">Submit</b-button>
          </b-form>
        </b-col>
        <b-col class="map" lg="6" sm="12" cols="12">
          <client-only>
            <l-map :zoom="13" :center="officePosition" :bounds="bounds" >
              <l-tilelayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" ></l-tilelayer>
              <l-marker :lat-lng="officePosition">
                <l-popup>
                  <div>
                    Our Office
                    <p>
                      Rue de la croix d'or,
                      1204 Geneve
                    </p>
                  </div>
                </l-popup>
              </l-marker>
            </l-map>
          </client-only>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
export default {
  auth: false,
  data: function() {
    return {
      form: {
        name: "",
        from: "",
        msg: ""
      },
      msgState: null,
      nameState : null,
      emailState: null,
      officePosition: { lat: 46.203054, lon: 6.147611 },
      bounds: [[ 46.089522, 5.766816], [ 46.323541,6.515332]],
      maxBounds: [[ 46.089522, 5.766816], [ 46.323541, 6.515332]],
    };
  },
  head() {
    return {
      title: "Contact Us"
    };
  },
  methods: {
    validate() {
      this.nameState = this.form.name.length > 3 ? true : false
      this.msgState = this.form.msg.length > 0 ? true : false
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      this.emailState = re.test(this.form.from.toLowerCase())
      return this.nameState && this.msgState && this.emailState
    },
    onSubmit() {
      if(this.validate()) {
        this.$store.dispatch("mailing/contact", this.form)
        this.$toast.success("Thanks for your message", { icon: "envelope" });
      }
      
    }
  }
};
</script>
<style>
@media (max-width: 768px) {
  .map {
    display: none;
  }
}
</style>