<template>
<div class="table__fixed">
  <div><p>GMT {{moment().format("Z")}}</p></div>
  <div v-for="item in dates" v-bind:key="item.day()">
   <p class="warning">Non-Working Day (COVID-19)</p>
  </div>
</div>
</template>

<script>
export default {
  props: ['dates'],
};
</script>

<style lang="sass">
.table__fixed
  display: flex
  flex-direction: row
  justify-content: space-between
  border-bottom: 1px solid #f2f2f2
  height: 30px
  font-size: 0.8em
  div
    width: 100%
    &:first-child
      text-align: right
      padding-top: 10px
      p
        padding-right: 15px
    &:last-child
      margin-right: 15px
    .warning
      opacity: 0.8
      width: 95%
      padding: 3px
      overflow: hidden
      background-color: orange
</style>
