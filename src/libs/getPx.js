import moment from 'moment';

export const getTop = (s, withPx = true) => {
  const hoursToMinutes = parseInt(moment.unix(s).format('H'), 0) * 60;
  const minutes = parseInt(moment.unix(s).format('m'), 0);
  return withPx ? `${hoursToMinutes + minutes}px` : hoursToMinutes + minutes;
};

export const getHeight = (s, e, withPx = true) => {
  const minutes = moment.unix(e).diff(moment.unix(s), 'minutes');
  return withPx ? `${minutes}px` : minutes;
};
