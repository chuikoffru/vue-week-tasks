<template>
  <div id="app">
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
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width: 80%
  max-width: 1140px
  margin: 30px auto
</style>
