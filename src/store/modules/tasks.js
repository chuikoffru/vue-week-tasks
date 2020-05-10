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
        }));
        ctx.commit('updateTasks', tasks);
      }
    },
    taskMove({ commit, state }, payload) {
      const newStartTime = state.tasks[payload.index].startDate.add(-payload.y, 'minutes');
      const newEndTime = state.tasks[payload.index].endDate.add(-payload.y, 'minutes');
      console.log('taskUp payload.y', payload.y);
      commit('updateOne', {
        index: payload.index,
        task: {
          ...state.tasks[payload.index],
          startDate: newStartTime,
          endDate: newEndTime,
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
