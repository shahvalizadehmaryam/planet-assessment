import moment from "moment";
const formatDate = (date) => {
  // Define the desired format
  const dateFormat = "ddd MM, YY";
  // Format the date using moment
  return moment(date).utc().format(dateFormat);
};
const formatTime = (time) => {
  // Define the desired format
  // format('h:mm:ss a')
  const timeFormat = "h:mm:ss";
  return moment(time).format("h:mm:ss a");
};
export { formatDate, formatTime };
