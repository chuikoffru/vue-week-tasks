<template>
<div :style="styleWrap">
  <div class="table__body">
    <div class="table__body-time">
      <div class="hour" v-for="(t, i) in getTimes" :key="i" :style="styleHour">
        <p>{{t.format('HH:mm')}}</p>
      </div>
    </div>
    <div class="table__body-day" v-for="(date, index) in getDates" :key="index">
      <div class="events" v-for="task in getTasks" :key="task.title">
        <div class="event" v-if="isSameDate(date, task.startDate)"
        :style="{'top': getTop(task.startDate) + 'px'}">
        {{getTop(task.startDate)}}
          {{task.title}} {{task.startDate.format('DD.MM.YYYY HH:mm')}}
          {{moment(date).format('DD.MM.YYYY HH:mm')}}
        </div>
      </div>
      <div class="hour" v-for="(t, i) in getTimes" :key="i" :style="styleHour">
        {{t.format('HH:mm')}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      hours: 24,
      styleHour: { height: '60px' },
      styleWrap: { overflowY: 'scroll', height: '600px', paddingTop: '15px' },
    };
  },
  computed: mapGetters(['getTasks', 'getDates', 'getTimes']),
  /* {
    getTasks() {
      return this.$store.getters.getTasks;
    },
    getDates() {
      return this.$store.getters.getDates;
    },
    getTimes() {
      return this.$store.getters.getTimes;
    },
  }, */
  methods: {
    fetchTasks() {
      this.$store.dispatch('fetchTasks');
    },
    generateDates() {
      this.$store.dispatch('generateDates');
    },
    generateTimes() {
      this.$store.dispatch('generateTimes');
    },
    getTop(time) {
      const h = parseInt(time.format('H'), 0);
      const m = parseInt(time.format('m'), 0);
      return h * 60 + m;
    },
    isSameDate(day, start) {
      return this.moment(day).isSame(start, 'day');
    },
  }, // mapActions(['fetchTasks', 'generateDates', 'generateTimes']),
  mounted() {
    this.generateDates();
    this.generateTimes();
    this.fetchTasks();
  },
};
</script>

<style lang="sass">
.table__body
  display: flex
  flex-direction: row
  justify-content: space-between
  height: 600px
  div.table__body-time
    .hour
      text-align: right
      &:last-child:after
        display: block
        position: relative
        bottom: -30px
        right: 15px
        content: '00:00'
      p
        right: 15px
        display: inline-block
        position: relative
        top: -10px
  div.table__body-day
    position: relative
    .hour
      border-bottom: 1px solid #eee
      border-right: 1px solid #eee
      color: #f2f2f2
    .event
      position: absolute
      width: 100%
      overflow: hidden
      background-color: lightgreen
  div.table__body-day, div.table__body-time
    width: 100%
</style>
