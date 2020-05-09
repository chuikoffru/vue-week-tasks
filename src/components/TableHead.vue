<template>
  <div>
    <TableHeadDay v-bind:dates="getDates" />
    <TableFixedRow v-bind:dates="getDates" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TableHeadDay from './TableHeadDay.vue';
import TableFixedRow from './TableFixedRow.vue';

export default {
  components: {
    TableHeadDay,
    TableFixedRow,
  },
  methods: mapActions(['generateDates']),
  computed: mapGetters(['getDates']),
  mounted() {
    this.generateDates();
  },
};
</script>
