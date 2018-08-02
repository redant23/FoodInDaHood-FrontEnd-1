import moment from "moment";
import "moment/locale/ko";

export function timeConvertor(time) {
  return moment(time).format("LT");
}

export function isOpen(open, close) {
  var result = false;

  var openDate = new Date(open);
  var closeDate = new Date(close);
  var openHour = openDate.getHours();
  var closeHour = closeDate.getHours();
  var openMin = openDate.getMinutes();
  var closeMin = closeDate.getMinutes();
  var openTime = new Date(2000, 0, 1, openHour, openMin);
  var closeTime = new Date(2000, 0, 1, closeHour, closeMin);
  var currentHour = new Date().getHours();
  var currentMin = new Date().getMinutes();
  var currentTime = new Date(2000, 0, 1, currentHour, currentMin);

  if (currentTime > openTime && currentTime < closeTime) {
    result = true;
  }

  return result;
}

export function createdAt(utcTime) {
  const currentTimeStamp = moment().format("X");
  const issueTimeStamp = moment(utcTime).format("X");
  let diffStamp = currentTimeStamp - issueTimeStamp;
  let stampOfThirtyDays = 60 * 60 * 24 * 30;

  if (diffStamp < stampOfThirtyDays) {
    return moment(utcTime)
      .locale("ko")
      .fromNow();
  } else {
    return (
      "on " +
      moment(utcTime)
        .locale("ko")
        .format("LL")
    );
  }
}

export default createdAt;
