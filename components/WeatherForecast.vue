<template>
  <div class="summary">
    <img :src="`/img/weather-main/${weatherInfo?.weather[0].description}.png`" class="pic-main" />
    <div class="weather">
      <div class="temp">{{ Math.round(weatherInfo?.main?.temp) }} °C</div>
      <div class="weather-desc text-block">{{ capitalize(weatherInfo?.weather[0].description) }}</div>
    </div>
    <div class="city text-block">{{ weatherInfo?.name }}, {{ weatherInfo?.sys?.country }}</div>
    <div class="date text-block">{{ data }}</div>
  </div>
</template>

<script setup>
  import {capitalize} from '../utils';

  const props = defineProps({
    weatherInfo: {
      type: [Object, null],
      required: true,
    },
  });

  const data = new Date().toLocaleString('en-EN', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'});
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/weather.scss';
</style>
