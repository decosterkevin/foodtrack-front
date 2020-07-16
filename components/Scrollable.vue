<template>
  <b-card class="card h-100">
    <div class="progress-bar">
      <div
        class="filled-bar"
        :style="{ transform: `translate3d(-${(1 - progress) * 100}%, 0, 0)` }"
      ></div>
      <span class="percentage-text">Progress: {{ percentageText }}</span>
    </div>
    <b-card-text class="text-section" ref="text" @scroll="onScroll">
      <p v-for="paragraph in paragraphs">{{ paragraph }}</p>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  data() {
    return {
      progress: 0
    };
  },
  props: ["paragraphs"],
  computed: {
    percentageText() {
      return `${Math.round(this.progress * 100)}%`;
    }
  },
  methods: {
    onScroll() {
      const progress =
        this.$refs.text.scrollTop /
        (this.$refs.text.scrollHeight - this.$refs.text.clientHeight);
      if (progress > 1) {
        this.progress = 1;
      } else if (progress < 0) {
        this.progress = 0;
      } else {
        this.progress = progress;
      }
    }
  }
};
</script>
<style scoped>
.card {
}
.text-section {
  max-height: 500px;
  overflow-y: auto;
}
.progress-bar {
  position: relative;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  background: #a6a7e0;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 3px 3px 0 0;
}

.percentage-text {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  font-size: 14px;
  transform: translate3d(-50%, -50%, 0);
}

.filled-bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  background: blue;
}
</style>