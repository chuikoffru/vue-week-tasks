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
      // Получаем данные задачи
      const { startDate, endDate } = state.tasks[payload.index];
      // Получаем позицию верхней планки по координате Y
      const topY = getTop(startDate.unix(), false);
      // Получаем высоту блока
      const height = getHeight(startDate.unix(), endDate.unix(), false);
      // Получаем позицию нижней границы по координате Y
      const bottomLine = topY + height - payload.y;
      // Если верхняя планка меньше пройденного расстояния
      if (topY - payload.y < 0) {
        // Устанавливаем на ноль час и минуту
        startDate.hour(0).minute(0);
        endDate.subtract(topY, 'minutes');
      // Если нижняя планка больше 1440
      } else if (bottomLine > 1440) {
        // Корректируем время на пройденную разницу
        const diff = bottomLine - 1440 + payload.y;
        startDate.subtract(diff, 'minutes');
        endDate.subtract(diff, 'minutes');
      } else {
        // Во всех остальных случаях меняем время на пройденное количество пикселей
        startDate.add(-payload.y, 'minutes');
        endDate.add(-payload.y, 'minutes');
      }
      // Получаем первый и последний день недели
      const startOfWeek = parseInt(moment().startOf('isoWeek').format('D'), 0);
      const endOfWeek = parseInt(moment().endOf('isoWeek').format('D'), 0);
      // Считаем сколько дней прошел курсор
      const countDays = Math.round(payload.x / payload.w);
      // Получаем текущий день недели и вычитаем пройденное количество дней
      const currentDay = parseInt(startDate.format('D'), 0) - countDays;
      // Если движение прошло в рамках недели, то добавляем количество дней
      if (currentDay < startOfWeek) {
        const diff = startOfWeek - parseInt(startDate.format('D'), 0);
        startDate.add(diff, 'days');
        endDate.add(diff, 'days');
      } else if (currentDay > endOfWeek) {
        const diff = endOfWeek - parseInt(startDate.format('D'), 0);
        startDate.add(diff, 'days');
        endDate.add(diff, 'days');
      } else {
        startDate.add(-countDays, 'days');
        endDate.add(-countDays, 'days');
      }
      // Если день уходит за границы недели устанавливаем крайний день недели
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
