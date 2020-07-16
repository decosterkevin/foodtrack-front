<template>
  <!-- Main block - menus, subscribe form-->
  <footer class="footer-bs">
    <b-container>
      <b-row>
        <b-col lg="5" sm="0" class="footer-brand">
          <h4>Foodtrack</h4>
          <p>{{ this.$t("footer.intro") }}</p>
        </b-col>
        <b-col lg="2" sm="6" class="footer-nav">
          <h4>{{ this.$t("footer.about") }}</h4>
          <ul class="list">
            <li>
              <b-link to="/about-us">{{ this.$t("footer.about-us") }}</b-link>
            </li>
            <li>
              <b-link to="/contact">{{ this.$t("footer.contacts") }}</b-link>
            </li>
            <li>
              <b-link to="/terms">{{ this.$t("footer.terms") }}</b-link>
            </li>
            <li>
              <b-link to="/privacy">{{ this.$t("footer.privacy") }}</b-link>
            </li>
          </ul>
        </b-col>
        <b-col lg="2" sm="6" class="footer-social">
          <h4>{{ this.$t("footer.follow-us") }}</h4>
          <ul>
            <li>
              <b-button href="https://www.facebook.com/" target="_blank" variant="link">
                <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
              </b-button>
            </li>
            <li>
              <b-button href="https://www.twitter.com/" target="_blank" variant="link">
                <font-awesome-icon :icon="['fab', 'twitter']" size="lg" />
              </b-button>
            </li>
            <li>
              <b-button href="https://www.instagram.com" target="_blank" variant="link">
                <font-awesome-icon :icon="['fab', 'instagram']" size="lg" />
              </b-button>
            </li>
            <li>
              <b-button href="https://www.medium.com" target="_blank" variant="link">
                <font-awesome-icon :icon="['fab', 'medium']" size="lg" />
              </b-button>
            </li>
          </ul>
        </b-col>
        <b-col lg="3" class="footer-ns">
          <h4>Newsletter</h4>
          <p>{{ this.$t("footer.newsletter") }}</p>
          <b-input-group>
            <b-form-input
              type="email"
              class="form-control"
              v-model="email"
              :state="valideEmail"
              v-bind:placeholder="$t('footer.your-email')"
            />
            <b-button :disabled="!valideEmail" v-on:click="subscribe" variant="outline-secondary">
              <font-awesome-icon :icon="['far', 'envelope']" />
            </b-button>
            <b-form-invalid-feedback id="input-live-feedback">Enter a valid email</b-form-invalid-feedback>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="footer-bottom">
        <b-col lg="8">
          <p class="pull-left copyright">Copyright © Footer 2014. All right reserved.</p>
        </b-col>
        <b-col lg="2">
          <b-row align-h="center">
            <font-awesome-icon :icon="['fas', 'globe']" size="2x" class="m-2" />
            <b-dropdown id="language-dp" variant="outline-secondary">
              <template slot="button-content">{{ current_language }}</template>
              <b-dropdown-item @click="select('fr')">Français</b-dropdown-item>
              <b-dropdown-item @click="select('en')">English</b-dropdown-item>
            </b-dropdown>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>
var map_lang = [];
export default {
  computed: {
    valideEmail() {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      if (this.email == "") {
        return null;
      }
      return re.test(this.email.toLowerCase());
    }
  },
  data() {
    return {
      current_language: "en",
      email: ""
    };
  },
  methods: {
    select: function(val) {
      this.current_language = val;
      this.$i18n.locale = this.current_language;
    },
    subscribe: function() {
      if (this.email) {
        this.$store
          .dispatch("mailing/subscribe", this.email)
          .then(() => {
            this.$toast.success(`Mailing list subscribed`, {
              icon: this.generateProductIcon()
            });
          })
          .catch(e => {
            this.$toast.error(`Error: Can not subscribe to mailing list`, {
              icon: "sad-tear"
            });
          });
      }
    }
  }
};
</script>
<style scoped>
.footer-bs {
  background-color: #3c3d41;
  padding: 60px 40px;
  color: rgba(255, 255, 255, 1);
  width: 100%;
}

.footer-bs .footer-brand p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-bs .footer-nav h4 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.footer-bs .footer-nav ul {
  list-style: none;
  padding: 0px;
}
.footer-bs .footer-nav ul li {
  padding: 5px 0px;
}
.footer-bs .footer-nav ul a {
  color: rgba(255, 255, 255, 0.8);
}
.footer-bs .footer-nav ul a:hover {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
}

.footer-bs .footer-social ul {
  list-style: none;
  padding: 0px;
}
.footer-bs .footer-social h4 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.footer-bs .footer-social li {
  padding: 5px 4px;
}
.footer-bs .footer-social a {
  color: rgba(255, 255, 255, 1);
}
.footer-bs .footer-social a:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.footer-bs .footer-ns h4 {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 10px;
}
.footer-bs .footer-ns p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

@media (min-width: 768px) {
  .footer-bs .footer-nav,
  .footer-bs .footer-social,
  .footer-bs .footer-ns {
    border-left: solid 1px rgba(255, 255, 255, 0.1);
  }
}
@media (max-width: 768px) {
  .footer-bs {
    padding: 0px 0px;
    color: rgba(255, 255, 255, 1);
    width: 100%;
  }
  .footer-brand {
    display: none;
  }
  .footer-nav li{
    font-size: 12px;
    margin-right: 5px;
    float: left;
  }
  .footer-nav h4 {
    display: none;
  }
  .footer-ns {
    display: none;
  }
  .copyright {
    display: none;
  }
  .footer-social li {
    margin-right: 5px;
    float: left;
  }
  .footer-social h4 {
    display: none;
  }
}
.footer-bs .footer-bottom {
  margin-top: 2em;
  border-top: 1px solid #dddddd;
  padding-top: 20px;
  padding-bottom: 10px;
}
.footer-bs .footer-bottom p.pull-left {
  padding-top: 6px;
  font-size: 0.75em;
}
</style>