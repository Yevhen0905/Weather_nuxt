<template>
  <div class="wrapper-few-day">
    <div class="title title-position">Weather forecast for 5 days</div>
    <div class="forecast_few-days">
      <div class="section long-term-forecast">
        <Swiper class="main-days" :slides-per-view="'auto'">
          <SwiperSlide class="main-days-list" v-for="day in forecast" :key="day">
            <div class="list-date">{{ convertDate(day[0].dt_txt) }}</div>
            <div class="list-info">
              <div class="days-item-day" v-for="time in day" :key="time">
                <div class="time-date">{{ getTimeWithDate(time.dt_txt) }}</div>
                <img :src="`img/weather-main/${time?.weather[0].description}.png`" class="time-pic" />
                <div class="day-temp">{{ Math.round(time?.main?.temp) }} °C</div>
                <div class="day-wind">Wind {{ time?.wind?.speed }} m/s</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {Swiper, SwiperSlide} from 'swiper/vue';
  import 'swiper/css';

  const props = defineProps({
    forecast: {
      type: [Array, null],
      required: true
    }
  });

  const convertDate = (date) => {
    return new Date(date.split(' ')[0]).toLocaleString('en-EN', {weekday: 'short', month: 'long', day: 'numeric'});
  };

  const getTimeWithDate = (date) => date.split(' ')[1].slice(0, -3);
</script>

<style lang="scss"></style>
