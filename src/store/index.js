import Vue from 'vue';
import Vuex from 'vuex';

import tasks from './modules/tasks';
import dates from './modules/dates';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasks,
    dates,
  },
});
