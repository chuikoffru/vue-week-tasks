import axios from 'axios';
import moment from 'moment';

import { getTop, getHeight } from '../../libs/getPx';

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
    changeDuration({ commit, state }, payload) {
      console.log('payload', payload);
      const { startDate, endDate } = state.tasks[payload.index];
      const newEnd = Object.create(endDate);
      newEnd.add(-payload.y, 'minutes');
      const allowHeight = parseInt(getHeight(startDate.unix(), newEnd.unix()), 0);
      if (allowHeight > 60) {
        endDate.add(-payload.y, 'minutes');
        commit('updateOne', {
          index: payload.index,
          task: {
            ...state.tasks[payload.index],
            endDate,
            height: getHeight(startDate.unix(), endDate.unix()),
            key: startDate + endDate,
          },
        });
      }
    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
};
