<template>
  <div class="img-wrapper">
    <img v-if="!isError" class="img-bg" :src="`img/weather-bg/${background?.weather[0]?.description}.jpg`" alt="" />
  </div>
</template>

<script setup>
  const props = defineProps({
    background: {
      type: Object,
      required: true
    }
  });
</script>

<style lang="scss"></style>
