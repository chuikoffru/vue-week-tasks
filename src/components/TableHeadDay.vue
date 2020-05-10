<template>
<div class="table__head">
  <div></div>
  <div v-for="item in dates" v-bind:key="item.day()">
    <b>{{ item.format('D') }}</b> <br/> {{ item.format('ddd') }}
  </div>
</div>
</template>

<script>
export default {
  props: ['dates'],
};
</script>

<style lang="sass">
.table__head
  display: flex
  flex-direction: row
  justify-content: space-between
  text-align: center
  div
    width: 100%
    padding: 10px
    &:first-child
      margin-left: 1px
    &:last-child
      margin-right: 15px
    b
      font-size: 1.7em
</style>
