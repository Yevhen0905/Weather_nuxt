<template>
  <div class="page">
    <div class="loading" v-if="!weatherInfo">...LOADING</div>
    <main v-else class="main">
      <MainBackground v-if="!isError" :background="weatherInfo" />
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section :class="['section', 'section-left', {'section-error': isError}]">
              <div class="info">
                <div class="city-inner">
                  <input type="text" class="search" v-model="searchCity" @keyup.enter="getWeatherDay" />
                </div>
                <p class="text_prompt">Enter your city</p>
                <WeatherForecast v-if="!isError" :weather-info="weatherInfo" />
                <div v-else class="error">
                  <div v-if="weatherInfo?.message" class="error-message">
                    <div class="error-title">An error occurred. Enter the correct city</div>
                    {{ capitalize(weatherInfo?.message) }}
                  </div>
                </div>
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
            <div class="forecast_few-days">
              <WeatherFewDays :forecast="sortWeatherByDays(weatherFewDays)" />
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
  import {capitalize} from './utils';

  const searchCity = ref('Miami');
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
