<template>
  <div class="page">
    <div class="loading" v-if="!weatherInfo">...LOADING</div>
    <main v-else class="main">
      <ColorModePicker />
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section :class="['section', 'section-left', {'section-error': isError}]">
              <div class="info">
                <div class="city-inner">
                  <input type="text" class="search" v-model="searchCity" @keyup.enter="getWeather" />
                </div>
                <p class="text_prompt">Enter your city</p>
                <WeatherForecast v-if="!isError" :weather-info="weatherInfo" />
                <div v-else class="error">
                  <div class="error-title">An error occurred. Enter the correct city</div>
                  <div v-if="weatherInfo?.message" class="error-message">
                    {{ capitalize(weatherInfo?.message) }}
                  </div>
                </div>
              </div>
            </section>
            <section class="section section-right">
              <MainIndicators v-if="!isError" :weather-info="weatherInfo" />
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <Coords :coords="weatherInfo?.coord" />
            <Humidity :humidity="weatherInfo?.main?.humidity" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import {ref, onMounted, computed} from 'vue';
  import {API_KEY, BASE_URL} from './constants';
  import {capitalize} from './utils';

  const searchCity = ref('Milan');
  const weatherInfo = ref(null);

  const isError = computed(() => weatherInfo.value?.cod !== 200);

  function getWeather() {
    fetch(`${BASE_URL}?q=${searchCity.value}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => (weatherInfo.value = data));
  }

  onMounted(getWeather);
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/app.scss';
  @use '~/assets/scss/media.scss';
</style>
