import axios from 'axios';
import moment from 'moment';

export default {
  state: {
    tasks: [],
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async fetchTasks(ctx) {
      const res = await axios.get('/data.json');
      if (res.data.length > 0) {
        const tasks = res.data.map((item) => ({
          ...item,
          startDate: moment.unix(item.startDate),
          endDate: moment.unix(item.endDate),
        }));
        ctx.commit('updateTasks', tasks);
      }
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
};
