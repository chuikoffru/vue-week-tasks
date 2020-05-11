import axios from 'axios';
import moment from 'moment';

export default {
  strict: true,
  state: {
    tasks: [],
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateOne(state, payload) {
      state.tasks[payload.index] = payload.task;
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
          height: moment.unix(item.endDate).diff(moment.unix(item.startDate), 'minutes'),
          top: (parseInt(moment.unix(item.startDate).format('H'), 0) * 60)
          + parseInt(moment.unix(item.startDate).format('m'), 0),
          key: item.startDate + item.endDate,
        }));
        ctx.commit('updateTasks', tasks);
      }
    },
    taskMove({ commit, state }, payload) {
      console.log('payload', payload);
      const { startDate, endDate } = state.tasks[payload.index];
      startDate.add(-payload.y, 'minutes');
      endDate.add(-payload.y, 'minutes');
      commit('updateOne', {
        index: payload.index,
        task: {
          ...state.tasks[payload.index],
          startDate,
          endDate,
        },
      });
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
};
