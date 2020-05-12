import axios from 'axios';
import moment from 'moment';

const getTop = (s) => {
  const hoursToMinutes = parseInt(moment.unix(s).format('H'), 0) * 60;
  const minutes = parseInt(moment.unix(s).format('m'), 0);
  return `${hoursToMinutes + minutes}px`;
};

const getHeight = (s, e) => {
  const minutes = moment.unix(e).diff(moment.unix(s), 'minutes');
  return `${minutes}px`;
};

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
          height: getHeight(item.startDate, item.endDate),
          top: getTop(item.startDate),
          key: item.startDate + item.endDate,
        }));
        ctx.commit('updateTasks', tasks);
      }
    },
    taskMove({ commit, state, dispatch }, payload) {
      console.log('payload', payload);
      const { startDate, endDate } = state.tasks[payload.index];
      startDate.add(-payload.y, 'minutes');
      endDate.add(-payload.y, 'minutes');
      if (payload.x > 40) {
        startDate.subtract(24, 'hours');
        endDate.subtract(24, 'hours');
      } else if (payload.x < -40) {
        startDate.add(24, 'hours');
        endDate.add(24, 'hours');
      }
      commit('updateOne', {
        index: payload.index,
        task: {
          ...state.tasks[payload.index],
          startDate,
          endDate,
          height: getHeight(startDate.unix(), endDate.unix()),
          top: getTop(startDate.unix()),
          key: startDate + endDate,
        },
      });
      dispatch('generateDates', null, { root: true });
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
};
