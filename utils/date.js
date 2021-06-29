import moment from "moment";

export const getFormattedDate = () => {
  var todayTime = new Date();
  var month = todayTime.getMonth() + 1;
  var day = todayTime.getDate();
  var year = todayTime.getFullYear();
  return month + "-" + day + "-" + year;
};

export const getFormattedTime = () => {
  var todayTime = new Date();

  return (
    todayTime.getHours() +
    ":" +
    todayTime.getMinutes() +
    ":" +
    todayTime.getSeconds()
  );
};

export const isMonth = month => {
  const re = new RegExp("^[1-12]");
  return month.match(re) != null;
};

export const isYearExpired = year => {
  const date = new Date();
  return year < date.getFullYear();
};

export const isDateExpired = date => {
  const now = new Date();
  const split = date.split("/");
  const month = split[0];
  const year = split[1];
  if (2000 + parseInt(year) == now.getFullYear()) {
    if (parseInt(month) < now.getMonth() + 1) {
      return true;
    }
  } else if (2000 + parseInt(year) < now.getFullYear()) {
    return true;
  }
  return false;
};

export const formatDate = timestamp => {
  const mMoment = moment(timestamp.seconds * 1000);
  if (mMoment.format("MMMM D h:mm a") === moment().format("MMMM D h:mm a")) {
    return `Just now`;
  } else if (mMoment.format("MMMM D") === moment().format("MMMM D")) {
    return mMoment.format("[Today at] h:mm a");
  } else {
    return moment(timestamp.seconds * 1000).format("MMMM DD, YYYY [at] h:mm a");
  }
};
