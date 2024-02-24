<template>
  <div class="page">
    <div class="loading" v-if="!weatherInfo">...LOADING</div>
    <main v-else class="main">
      <img class="img-bg" :src="`img/weather-bg/${weatherInfo?.weather[0].description}.jpg`" alt="" />
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
            <section :class="['section', 'section-right', {'section_indicator-error': isError}]">
              <MainIndicators v-if="!isError" :weather-info="weatherInfo" />
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <Coords :coords="weatherInfo?.coord" />
            <Humidity :humidity="weatherInfo?.main?.humidity" />
          </div>
          <div v-if="!isError" class="forecast_five_day">
            <WeatherFiveDay :forecast="sortWeatherByDay(weatherFiveDay)" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import {ref, onMounted, computed} from 'vue';
  import {API_KEY, BASE_URL, FORECAST_FIVE_DAY_URL} from './constants';
  import {capitalize} from './utils';

  const searchCity = ref('Milan');
  const weatherInfo = ref(null);
  const weatherFiveDay = ref(null);

  const isError = computed(() => weatherInfo.value?.cod !== 200);

  const sortWeatherByDay = (arr) => {
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
  console.log(weatherInfo);

  const getWeatherFiveDay = async () => {
    try {
      await fetch(`${FORECAST_FIVE_DAY_URL}?q=${searchCity.value}&units=metric&cnt=40&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => (weatherFiveDay.value = data.list));
    } catch (e) {
      console.log(e);
    }
  };

  console.log(weatherFiveDay);

  onMounted(getWeather);
  onMounted(getWeatherFiveDay);
</script>

<style lang="scss">
  @use '~/assets/scss/main.scss';
</style>
