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
    updateOne(state, payload) {
      console.log('payload', payload);
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
    taskUpY({ commit, state }, payload) {
      const newTime = state.tasks[payload.index].startDate.add(payload.y, 'minutes');
      commit('updateOne', { index: payload.index, task: { ...state.tasks[payload.index], startDate: newTime } });
    },
    taskDownY({ commit, state }, payload) {
      const newTime = state.tasks[payload.index].startDate.subtract(payload.y, 'minutes');
      commit('updateOne', { index: payload.index, task: { ...state.tasks[payload.index], startDate: newTime } });
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
};
