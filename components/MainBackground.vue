<template>
  <div class="img-wrapper">
    <img v-if="!error" class="img-bg" :src="`img/weather-bg/${background?.weather[0]?.description}.jpg`" alt="" />
    <img v-else class="img-bg" src="../public/img/weather-bg/weather.jpg" alt="" />
  </div>
</template>

<script setup>
  const props = defineProps({
    background: {
      type: Object,
      required: true
    },
    error: {
      type: Boolean,
      required: true
    }
  });
</script>

<style lang="scss"></style>
