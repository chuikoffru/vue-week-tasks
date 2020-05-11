<template>
  <div>
  <div class="events" v-for="(task, indexTask) in getTasks" :key="task.key">
        <div
          class="event"
          v-if="isSameDate(date, task.startDate)"
          :style="{
            'top': getTop(task.startDate) + 'px',
            height: getHeight(task.startDate, task.endDate) + 'px'
          }"
          @selectstart.prevent
          @mousedown="startDrag($event, indexTask)"
          @mouseup="stopDrag($event, indexTask)"
          @mousemove="moveDrag($event, indexTask)"
          @mousewheel.prevent="wheelMove($event, indexTask)"
          >
          {{task.startDate.format('HH:mm')}}
          {{task.title}}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['getTasks', 'date'],
  data: () => ({
    y: 0,
    x: 0,
    dragging: false,
  }),
  methods: {
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
    startDrag(evt) {
      this.dragging = true;
      this.x = evt.offsetX;
      this.y = evt.offsetY;
    },
    stopDrag() {
      this.dragging = false;
      this.x = 0;
      this.y = 0;
    },
    moveDrag(evt, index) {
      if (this.dragging) {
        const x = this.x - evt.offsetX;
        const y = this.y - evt.offsetY;
        if (!(y % 15)) {
          this.$store.dispatch('taskMove', { index, y, x }).then(() => this.$forceUpdate());
        }
      }
    },
    wheelMove(evt, index) {
      this.$store.dispatch('taskMove', { index, y: -evt.deltaY }).then(() => this.$forceUpdate());
    },
  },
};
</script>

<style lang="sass">
.table__body-day
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
</style>
