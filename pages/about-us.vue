<template>
  <section>
    <b-container  fluid>
      <h1 class="dark-theme">About Us</h1>
      <b-row align-h="center" no-gutters>
        <b-col lg-2 sm-12>
          <b-card
            title="Kevin"
            img-src="/images/Kevin2.jpg"
            img-top
            img-rounded="circle"
            style="max-width: 50rem;"
          >
            <b-card-text>
              Kevin is the
              <strong>full-stack developper</strong>g of this web app. He developped it using state of the art web development technology such as
              <strong>Django</strong> or
              <strong>Nuxtjs</strong>.
            </b-card-text>
            <b-card-text>
              Check out his personal webpage
              <a href="https://www.decoster.io">here</a>
            </b-card-text>
            <b-row align-h="around">
              <b-button href="https://medium.com/@decoster.kevin" target="_blank" variant="link">
                <font-awesome-icon :icon="['fab', 'medium']" size="lg" />
              </b-button>
              <b-button
                href="https://www.linkedin.com/in/kevin-decoster/"
                target="_blank"
                variant="link"
              >
                <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
              </b-button>
              <b-button href="https://github.com/decosterkevin" target="_blank" variant="link">
                <font-awesome-icon :icon="['fab', 'github']" size="lg" />
              </b-button>
              <b-button href="https://gitlab.com/decosterkevin" target="_blank" variant="link">
                <font-awesome-icon :icon="['fab', 'gitlab']" size="lg" />
              </b-button>
              <b-button href="mailto:kevin@decoster.io" target="_blank" variant="link">
                <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
              </b-button>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
export default {
  auth: false,
  computed: {},
  data: function() {
    return {};
  },
  head() {
    return {
      title: "About Us"
    };
  }
};
</script>
<style>
</style>