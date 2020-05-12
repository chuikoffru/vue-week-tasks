<template>
  <div>
  <div class="events" v-for="(task, indexTask) in getTasks" :key="task.key">
        <div
          class="event"
          v-if="isSameDate(date, task.startDate)"
          :style="{
            'top': task.top,
            'height': task.height
          }"
          @selectstart.prevent
          @mousedown="startDrag($event, indexTask)"
          @mouseup="stopDrag($event, indexTask)"
          @mousemove="moveDrag($event, indexTask)"
          @mousewheel.prevent="wheelMove($event, indexTask)"
          >
          <div class="time">{{task.startDate.format('HH:mm')}}</div>
          <div class="text">{{task.title}}</div>
          <div class="size" @mousedown.stop="reduceTime($event, indexTask)"></div>
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
    isSameDate(day, start) {
      return this.moment(day).isSame(start, 'day');
    },
    startDrag(evt) {
      this.dragging = true;
      this.x = evt.offsetX;
      this.y = evt.offsetY;
      console.log('START');
    },
    stopDrag() {
      this.dragging = false;
      this.x = 0;
      this.y = 0;
      console.log('STOP');
    },
    moveDrag(evt, index) {
      if (this.dragging) {
        const x = this.x - evt.offsetX;
        const y = this.y - evt.offsetY;
        if (x !== 0 && y !== 0) {
          this.$store.dispatch('taskMove', { index, y, x });
        }
      }
    },
    wheelMove(evt, index) {
      this.$store.dispatch('taskMove', { index, y: -evt.deltaY });
    },
    reduceTime(evt, index) {
      console.log('evt, index', evt, index);
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
    opacity: .7
    padding: 5px
    font-size: .8rem
    cursor: move
    color: black
    display: flex
    flex-direction: column
    .time
      color: green
      font-size: .7rem
      margin-bottom: 5px
    .text
      flex: 1 0 auto
    .size
      width: 100%
      height: 5px
      background-color: green
      flex: 0 0 auto
      cursor: row-resize
      opacity: .2
</style>
