<template>
  <div class="table__body-time">
      <div class="hour" v-for="(t, i) in times" :key="i">
        <p>{{t.format('HH:mm')}}</p>
      </div>
    </div>
</template>

<script>
export default {
  props: ['times'],
};
</script>

<style lang="sass">
div.table__body-time
  .hour
    height: 60px
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
</style>
