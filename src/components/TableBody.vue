<template>
<div class="styleWrap">
  <div class="table__body">
    <TableBodyTime :times="getTimes"/>
    <div class="table__body-day" v-for="date in getDates" :key="moment(date).format('D')">
      <div class="events" v-for="(task, indexTask) in getTasks"
        :key="task.startDate.format('DDHHmm')">
        <div class="event" v-if="isSameDate(date, task.startDate)" draggable
        :style="{
          'top': getTop(task.startDate) + 'px',
          height: getHeight(task.startDate, task.endDate) + 'px'
        }"  @dragstart="startDrag($event, indexTask)"
            @dragend="stopDrag($event, indexTask)">
          {{task.title}}
        </div>
      </div>
      <div class="hour" v-for="t in getTimes" :key="t.format('HH:mm')"></div>
    </div>
  </div>
  {{getTasks}}
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TableBodyTime from './TableBodyTime.vue';

export default {
  components: {
    TableBodyTime,
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
    getTop(time) {
      const h = parseInt(time.format('H'), 0);
      const m = parseInt(time.format('m'), 0);
      return h * 60 + m;
    },
    getHeight(start, end) {
      return end.diff(start, 'minutes');
    },
    isSameDate(day, start) {
      return this.moment(day).isSame(start, 'day');
    },
    startDrag(evt, index) {
      // const { x, y } = evt;
      console.log(index, 'evt start', evt);
      // console.log(index, 'evt.start', x, y);
      // this.$store.dispatch('taskMove', { index, y });// .then(() => this.$forceUpdate());
    },
    stopDrag(evt, index) {
      // const { x, y } = evt;
      console.log(index, 'evt stop', evt);
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
  div.table__body-day
    position: relative
    .hour
      border-bottom: 1px solid #eee
      border-right: 1px solid #eee
      color: #f2f2f2
      height: 60px
    .event
      position: absolute
      width: 100%
      overflow: hidden
      background-color: lightgreen
      opacity: .6
      padding: 5px
      font-size: .9rem
      cursor: move
  div.table__body-day, div.table__body-time
    width: 100%
</style>
