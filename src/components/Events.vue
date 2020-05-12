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
          draggable="true"
          @dragover.prevent
          @dragstart="startDrag($event, indexTask)"
          @dragend.prevent="stopDrag($event, indexTask)"
          >
          <div class="time">{{task.startDate.format('HH:mm')}}</div>
          <div class="text" @dragstart.prevent @selectstart.prevent>{{task.title}}</div>
        </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
export default {
  props: ['getTasks', 'date'],
  data: () => ({
    y: 0,
    x: 0,
  }),
  methods: {
    isSameDate(day, start) {
      return this.moment(day).isSame(start, 'day');
    },
    startDrag(evt) {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      this.x = evt.x;
      this.y = evt.y;
    },
    stopDrag(evt, index) {
      const x = this.x - evt.x;
      const y = this.y - evt.y;
      if (x !== 0 || y !== 0) {
        this.$store.dispatch('taskMove', { index, y, x });
        this.x = 0;
        this.y = 0;
      }
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
</style>
