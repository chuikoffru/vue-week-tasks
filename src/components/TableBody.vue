<template>
<div class="styleWrap" ref="scrollDiv">
  <div class="table__body">
    <TableBodyTime :times="getTimes"/>
    <div class="table__body-day" v-for="date in getDates" :key="moment(date).format('D')">
      <Events :getTasks="getTasks" :date="date" />
      <div class="timeline" :style="{ 'top': getTop(moment().unix()) }"></div>
      <div class="hour" @dragover.prevent v-for="t in getTimes" :key="t.format('HH:mm')">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTop } from '../libs/getPx';
import TableBodyTime from './TableBodyTime.vue';
import Events from './Events.vue';

export default {
  components: {
    TableBodyTime,
    Events,
  },
  computed: mapGetters(['getTasks', 'getDates', 'getTimes']),
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
    getTop,
  },
  mounted() {
    this.generateDates();
    this.generateTimes();
    this.fetchTasks();
    const topY = parseInt(getTop(this.moment().unix()), 0);
    if (topY > 480) {
      this.$refs.scrollDiv.scrollTop = topY - 200;
    }
  },
};
</script>

<style lang="sass">
.styleWrap
  scroll-behavior: smooth
  overflow-y: scroll
  height: 700px
  padding-top: 15px
.table__body
  display: flex
  flex-direction: row
  justify-content: space-between
  height: 600px
  div.table__body-day, div.table__body-time
    width: 100%
  .timeline
    position: relative
    width: 100%
    border-top: 1px solid red
</style>
