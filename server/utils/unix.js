let formattedTime;
let unit;
const unixToDateTime = (unix_timestamp) => {
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  hours > 12 ? (unit = 'PM') : (unit = 'AM');
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  return (formattedTime =
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + unit);
};
module.exports = unixToDateTime;
