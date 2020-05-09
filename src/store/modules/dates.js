import moment from 'moment';

export default {
  state: {
    dates: [],
    times: [],
  },
  mutations: {
    updateDates(state, dates) {
      state.dates = dates;
    },
    updateTimes(state, times) {
      state.times = times;
    },
  },
  actions: {
    generateDates(ctx) {
      const startOfWeek = moment().startOf('isoWeek');
      const endOfWeek = moment().endOf('isoWeek');
      const days = [];
      let day = startOfWeek;
      while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
      }
      ctx.commit('updateDates', days);
    },
    generateTimes(ctx) {
      const times = [];
      for (let i = 0; i < 24; i += 1) {
        times[i] = moment.utc(i * 3600 * 1000);
      }
      ctx.commit('updateTimes', times);
    },
  },
  getters: {
    getDates(state) {
      return state.dates;
    },
    getTimes(state) {
      return state.times;
    },
  },
};
