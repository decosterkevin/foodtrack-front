<template>
  <b-card :title="username"
  style="max-width: 20rem;">
    <b-card-img width="200px" height="200px" :src="profile.picture"></b-card-img>
    <b-card-body>
      <b-card-text>
        <strong>{{ this.$t("profile.bio") }}:</strong>
        {{ profile.bio }}
      </b-card-text>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  props: ["profile", "username"]
};
</script>
<style>
.product-card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
}
</style>