import Vue from "vue";
var icons = [
  "carrot",
  "pepper-hot",
  "seedling",
  "egg",
  "fish",
  "lemon",
  "cheese",
  "drumstick-bite",
  "apple-alt",
  "pizza-slice"
];
Vue.mixin({
  methods: {
    generateProductIcon() {
      let randomNumber = Math.floor(Math.random() * Math.floor(icons.length));
      return icons[randomNumber];
    },
    getIcons() {
      return icons;
    }
  }
});
