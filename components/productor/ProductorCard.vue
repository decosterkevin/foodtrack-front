<template>
  <b-card>
    <b-row>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          v-for="(picture, index) in productor.pictures"
          :key="index"
          :img-src="picture.file"
        ></b-carousel-slide>
      </b-carousel>
    </b-row>
    <b-card-body>
      <b-row align-h="center">
        <b-col>
          <h4>
            <strong>
              <nuxt-link :to="`/profile/${productor.id}/`">{{productor.name}}</nuxt-link>
            </strong>
          </h4>
        </b-col>
        <b-col v-if="productor.user_picture">
          <b-img style="margin-top: -30px;" :src="productor.user_picture" rounded="circle"></b-img>
        </b-col>
      </b-row>
      <b-card-text>{{productor.address.street}},{{productor.address.postal_code}} {{productor.address.city}}, {{productor.address.country}}</b-card-text>
      <b-card-text>
        <b-row align-h="around">
          <b-col>
            <star-rating
              :star-size="15"
              :round-start-rating="false"
              :rating="productor.rating"
              :read-only="true"
              :show-rating="false"
            ></star-rating>
          </b-col>
          <b-col>
            <md-icon>room_service</md-icon>
            {{productor.nb_products}}
          </b-col>
        </b-row>
      </b-card-text>
      <b-card-text>
        <p>{{productor.bio}}</p>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    productor: {}
  },

  data() {
    return {
      slide: 0,
      sliding: null
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>