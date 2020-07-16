<template>
  <section>
    <b-container>
      <b-row>
        <b-col xl="4" class="mx-auto">
          <b-card class="card-signin text-center mb-2" :title="$t('general.login')">
            <div class="form-signin">
              <b-form method="post" @submit.prevent="login">
                <b-form-group class="form-label-group">
                  <b-form-input
                    type="email"
                    id="inputEmail"
                    v-model="form.email"
                    :state="error_state.email"
                    :placeholder="$t('general.email')"
                    aria-describedby="input-live-feedback-email"
                    required
                    autofocus
                  />
                  <b-form-invalid-feedback id="input-live-feedback-email"> {{error_message.email}} </b-form-invalid-feedback>

                </b-form-group>
                <b-form-group class="form-label-group">
                  <b-form-input
                    type="password"
                    v-model="form.password"
                    :state="error_state.password"
                    id="inputPassword"
                    aria-describedby="input-live-feedback-password"
                    :placeholder="$t('general.password')"
                    required
                  />
                  <b-form-invalid-feedback id="input-live-feedback-password"> {{error_message.password}} </b-form-invalid-feedback>

                </b-form-group>

                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >{{ this.$t("general.login") }}</button>
                <hr class="my-4" />
              </b-form>
              <button class="btn btn-lg btn-google btn-block text-uppercase">
                <i class="fab fa-google mr-2"></i> Sign in with Google
              </button>
              <button class="btn btn-lg btn-facebook btn-block text-uppercase">
                <i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook
              </button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
export default {
  auth: "guest",

  head() {
    return {
      title: "Login"
    };
  },
  data() {
    return {
      form: {},
      error_state: {
        email: null,
        password: null
      },
      error_message: {
        email: "email",
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
    async login() {
      try {
        this.$toast.info('Logging in...', {icon: "spinner"})
        console.log(process.env.BASE_URL)
        await this.$auth.loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        });

        this.$toast.success('Logged In!', {icon: "user"})
        await this.$store.dispatch("cart/get")
        this.setFeedback({})
        this.$router.push("/");
      } catch (e) {
        this.setFeedback(e.response.data)
        this.$toast.error('Login failed!', {icon: "exclamation"})
      }
    }
  }
};
</script>
<style>
</style>
