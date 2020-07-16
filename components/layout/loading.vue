<template lang="html">
    <div class="loading-page" v-if="loading">
        <b-spinner
        style="width: 3rem; height: 3rem;"
        class="spinner"
            variant="primary"
            type="grow"
        ></b-spinner>
    </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  text-align: center;
  z-index: 1000;
}
.spinner {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
}
</style>