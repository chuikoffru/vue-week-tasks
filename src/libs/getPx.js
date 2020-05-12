import moment from 'moment';

export const getTop = (s) => {
  const hoursToMinutes = parseInt(moment.unix(s).format('H'), 0) * 60;
  const minutes = parseInt(moment.unix(s).format('m'), 0);
  return `${hoursToMinutes + minutes}px`;
};

export const getHeight = (s, e) => {
  const minutes = moment.unix(e).diff(moment.unix(s), 'minutes');
  return `${minutes}px`;
};
