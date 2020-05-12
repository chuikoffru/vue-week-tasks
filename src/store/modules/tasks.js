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
      // Получаем данные задачи
      const { startDate, endDate } = state.tasks[payload.index];
      // Получаем текущую высоту блока
      let topY = getTop(startDate.unix(), false);
      if (topY > payload.y) {
        // Добавляем количество минут в зависимости от пройденного расстояния курсора
        startDate.add(-payload.y, 'minutes');
        endDate.add(-payload.y, 'minutes');
      } else {
        // Если текущая высота меньше пройденного расстояния, устанавливаем на ноль час и минуту
        startDate.hour(0).minute(0);
        endDate.subtract(topY, 'minutes');
      }
      // Сбрасываем значение высшей планки
      topY = getTop(startDate.unix(), false);
      // Если нижняя граница выходит за край, сбрасываем значения на разницу в наложении
      const height = getHeight(startDate.unix(), endDate.unix(), false);
      const bottomLine = topY + height;
      if (bottomLine > 1440) {
        const diff = bottomLine - 1440;
        startDate.subtract(diff, 'minutes');
        endDate.subtract(diff, 'minutes');
      }
      // Получаем первый и последний день недели
      const startOfWeek = parseInt(moment().startOf('isoWeek').format('D'), 0);
      const endOfWeek = parseInt(moment().endOf('isoWeek').format('D'), 0);
      // Считаем сколько дней прошел курсор
      const countDays = Math.round(payload.x / payload.w);
      // Получаем текущий день недели и вычитаем пройденное количество дней
      const currentDay = parseInt(startDate.format('D'), 0) - countDays;
      // Если движение прошло в рамках недели, то добавляем количество дней
      if (currentDay >= startOfWeek && currentDay <= endOfWeek) {
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
