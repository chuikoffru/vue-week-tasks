<template>
  <div id="app">
    <h1>Календарь задач</h1>
    <TableHead />
    <TableBody />
  </div>
</template>

<script>
import TableHead from '@/components/TableHead.vue';
import TableBody from '@/components/TableBody.vue';

export default {
  name: 'App',
  components: {
    TableHead,
    TableBody,
  },
};
</script>

<style lang="sass">
@import './sass/reset'
body, html, #app
  width: 100%
  height: 100%
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width: 80%
  max-width: 1140px
  margin: 60px auto
  h1
    font-size: 2em
    text-align: center
    margin-bottom: 30px
</style>
