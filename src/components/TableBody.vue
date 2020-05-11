<template>
<div class="styleWrap">
  <div class="table__body">
    <TableBodyTime :times="getTimes"/>
    <div class="table__body-day" v-for="date in getDates" :key="moment(date).format('D')">
      <Events :getTasks="getTasks" :date="date" />
      <div class="hour" v-for="t in getTimes" :key="t.format('HH:mm')"></div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
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
  },
  mounted() {
    this.generateDates();
    this.generateTimes();
    this.fetchTasks();
  },
};
</script>

<style lang="sass">
.styleWrap
  overflow-y: scroll
  height: 600px
  padding-top: 15px
.table__body
  display: flex
  flex-direction: row
  justify-content: space-between
  height: 600px
  div.table__body-day, div.table__body-time
    width: 100%
</style>
