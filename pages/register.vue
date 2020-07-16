<template>
  <section>
    <b-container>
      <b-row align-h="center">
        <b-col xl="9">
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <b-col lg="6">
                <b-card-img
                  class="image-register"
                  src="/images/background_register.jpeg"
                  alt="Card image"
                  left
                />
              </b-col>
              <b-col class="form-signin" lg="6">
                <b-card-body :title="$t('general.register')">
                  <b-form method="post" @submit.prevent="register">
                    <b-row>
                      <b-col md="4">
                        <b-form-group class="form-label-group">
                          <b-form-input
                            type="text"
                            id="inputUserame"
                            v-model="form.username"
                            :state="error_state.username"
                            :placeholder="$t('general.username')"
                            aria-describedby="input-live-feedback-username"
                            required
                            autofocus
                          />
                          <b-form-invalid-feedback id="input-live-feedback-username"> {{error_message.username}} </b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col md="8">
                        <b-form-group class="form-label-group">
                          <b-form-input
                            type="email"
                            id="inputEmail"
                            v-model="form.email"
                            :placeholder="$t('general.email')"
                            :state="error_state.email"
                            aria-describedby="input-live-feedback-email"
                            required
                          />
                          <b-form-invalid-feedback id="input-live-feedback-email"> {{error_message.email}} </b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <hr />
                    <b-row>
                      <b-col md="6">
                        <b-form-group class="form-label-group">
                          <b-form-input
                            type="password"
                            v-model="form.password"
                            id="inputPassword"
                            :state="error_state.password"
                            :placeholder="$t('general.password')"
                            required
                          />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group class="form-label-group">
                          <b-form-input
                            type="password"
                            id="inputConfirmPassword"
                            :state="error_state.password"
                            :placeholder="$t('general.confirme-password')"
                            aria-describedby="input-live-feedback-password"
                            required
                          />
                          <b-form-invalid-feedback id="input-live-feedback-password"> {{error_message.password}} </b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-form-group
                      label-cols="4"
                      label-cols-lg="4"
                      label-size="md"
                      :label="$t('general.birthdate')"
                      label-for="inputBirthdate"
                      class="form-label-group"
                    >
                      <b-form-input
                        id="inputBirthdate"
                        v-model="form.birth_date"
                        type="date"
                        size="md"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group class="form-label-group">
                      <b-form-checkbox
                        v-model="form.is_productor"
                        id="isProductor"
                        required
                      >{{$t('general.is_productor')}}</b-form-checkbox>
                    </b-form-group>
                    <b-card v-show="form.is_productor" :header="$t('address.field')">
                      <b-row>
                        <b-col md="8">
                          <b-form-group class="form-label-group">
                            <b-form-input
                              type="text"
                              v-model="productor_address.street"
                              :placeholder="$t('address.street')"
                            />
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group class="form-label-group">
                            <b-form-input
                              type="text"
                              v-model="productor_address.postal_code"
                              :placeholder="$t('address.postal_code')"
                            />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group class="form-label-group">
                            <b-form-input
                              type="text"
                              v-model="productor_address.city"
                              :placeholder="$t('address.city')"
                            />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group class="form-label-group">
                            <b-form-input
                              type="text"
                              v-model="productor_address.country"
                              :placeholder="$t('address.country')"
                            />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-card>
                  </b-form>
                </b-card-body>
                <b-card-footer class="text-center">
                  <b-button
                    class="text-uppercase mb-4"
                    block
                    variant="primary"
                    @click="register"
                  >{{ this.$t("general.register") }}</b-button>
                  <nuxt-link to="/login">{{ this.$t("general.login") }}</nuxt-link>
                </b-card-footer>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["loggedInUser"])
  },
  auth: false,
  head() {
    return {
      title: "Register"
    };
  },
  data() {
    return {
      form: {},
      productor_address: {},
      error_state: {
        email: null,
        username: null,
        password: null
      },
      error_message: {
        email: "email",
        username: "userbame",
        password: "password"
      }
    };
  },
  methods: {
    setFeedback(errors) {
      for (const [ key, value ] of Object.entries(this.error_state)) {
        if (key in errors) {
          this.error_state[key] = false
          this.error_message[key] = errors[key][0]
        }
        else {
          this.error_state[key] = true
        }
          // do something with `key` and `value`
      }
    },
    async register() {
      
      this.$toast.info("Registering...", { icon: "spinner" });
      if (this.loggedInUser) {
        await this.$auth.logout();
      }
      try {
        var parms = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          birth_date: this.form.birth_date,
          is_productor: this.form.is_productor
        };
        if (this.form.is_productor) {
          parms["productor_profile"] = {
            address: this.productor_address
          };
        }
        await this.$axios.post("/authentication/register/", parms);
        this.$toast.success("Registered: Please confirm your email", {
          icon: "check-circle"
        });
        this.setFeedback({})
        this.$router.push("/");

      } catch (e) {
        this.$toast.error(`Could not registered`, { icon: "sad-cry" });
        this.setFeedback(e.response.data)
      }
    }
  }
};
</script>
<style>
@media (max-width: 768px) {
  .image-register {
    display: none;
  }
}
</style>