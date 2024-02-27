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
                  <input type="text" class="search" v-model="searchCity" @keyup.enter="getWeatherDay" />
                  <button class="btn-search" @click="getWeatherDay"></button>
                </div>
                <p v-if="!isError" class="text_prompt">Enter your city</p>
                <div v-else class="error">
                  <div class="error-message">
                    <div class="error-title">Enter the correct city</div>
                  </div>
                </div>
                <WeatherForecast v-if="!isError" :weather-info="weatherInfo" />
              </div>
            </section>
            <section :class="['section', 'section-right', {'section_indicator-error': isError}]">
              <MainIndicators v-if="!isError" :weather-info="weatherInfo" />
            </section>
          </div>
          <div class="additional-info" v-if="!isError">
            <div class="sections">
              <Coords :coords="weatherInfo?.coord" />
              <Humidity :humidity="weatherInfo?.main?.humidity" />
            </div>
            <WeatherFewDays :forecast="sortWeatherByDays(weatherFewDays)" />
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

  const sortWeatherByDays = (arr) => {
    const separatedArrays = {};

    arr?.forEach((item) => {
      const dtTxt = item.dt_txt.split(' ')[0];
      if (!separatedArrays[dtTxt]) {
        separatedArrays[dtTxt] = [];
      }
      separatedArrays[dtTxt].push(item);
    });

    const result = Object.values(separatedArrays);
    return result;
  };

  const getWeather = async () => {
    try {
      await fetch(`${BASE_URL}?q=${searchCity.value}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => (weatherInfo.value = data));
    } catch (e) {
      console.log(e);
    }
  };

  const getWeatherFewDays = async () => {
    try {
      await fetch(`${FORECAST_FEW_DAY_URL}?q=${searchCity.value}&units=metric&cnt=40&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => (weatherFewDays.value = data.list));
    } catch (e) {
      console.log(e);
    }
  };

  const getWeatherDay = () => {
    getWeather();
    getWeatherFewDays();
  };

  watch(searchCity, (newValue) => {
    localStorage.setItem('searchCity', JSON.stringify(newValue));
  });

  onMounted(() => (searchCity.value = JSON.parse(localStorage.getItem('searchCity')) || ''));

  onMounted(getWeather);
  onMounted(getWeatherFewDays);
</script>

<style lang="scss">
  @use '~/assets/scss/main.scss';
</style>
