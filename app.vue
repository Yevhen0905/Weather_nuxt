<template>
  <div class="page">
    <div class="loading" v-if="!weatherInfo">...LOADING</div>
    <main v-else class="main">
      <MainBackground :error="isError" :background="weatherInfo" />
      <div class="container">
        <div class="laptop">
          <div :class="['sections', {'section-error': isError}]">
            <section :class="['section', 'section-left']">
              <div class="info">
                <div class="city-inner">
                  <input
                    type="text"
                    class="search"
                    v-model="searchCity"
                    @keyup.enter="getWeatherDay"
                  />
                  <button class="btn-search" @click="getWeatherDay"></button>
                </div>
                <p v-if="!isError" class="text_prompt">Enter your city</p>
                <div v-else class="error">
                  <div class="error-message">
                    <div class="error-title">Enter the correct city</div>
                  </div>
                  <div>{{ weatherInfo?.message }}</div>
                </div>
                <WeatherForecast v-if="!isError" :weather-info="weatherInfo" />
              </div>
            </section>
            <section
              v-if="!isError"
              :class="['section', 'section-right', {'section_indicator-error': isError}]"
            >
              <WeatherFewDays :forecast="weatherFewDays" />
              <MainIndicators :weather-info="weatherInfo" />
            </section>
          </div>
          <div class="additional-info" v-if="!isError">
            <div class="sections">
              <Coords :coords="weatherInfo?.coord" />
              <Humidity :humidity="weatherInfo?.main?.humidity" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import {ref, onMounted, computed, watch} from 'vue';
  import {API_KEY, BASE_URL, FORECAST_FEW_DAY_URL} from './constants';

  const searchCity = ref('');
  const weatherInfo = ref(null);
  const weatherFewDays = ref(null);

  const isError = computed(() => weatherInfo.value?.cod !== 200);

  const getWeather = async () => {
    try {
      await fetch(`${BASE_URL}?q=${searchCity.value}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => (weatherInfo.value = data));
    } catch (e) {
      console.log(e);
    }
  };

  console.log(weatherInfo);

  const getWeatherFewDays = async () => {
    try {
      await fetch(
        `${FORECAST_FEW_DAY_URL}?q=${searchCity.value}&units=metric&cnt=40&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => (weatherFewDays.value = data.list));
    } catch (e) {
      console.log(e);
    }
  };

  console.log(weatherFewDays);

  const getWeatherDay = () => {
    getWeather();
    getWeatherFewDays();
  };

  watch(searchCity, (newValue) => {
    localStorage.setItem('searchCity', JSON.stringify(newValue));
  });

  onMounted(
    () => (searchCity.value = JSON.parse(localStorage.getItem('searchCity')) || '')
  );

  onMounted(getWeather);
  onMounted(getWeatherFewDays);
</script>

<style lang="scss">
  @use '~/assets/scss/main.scss';
</style>
