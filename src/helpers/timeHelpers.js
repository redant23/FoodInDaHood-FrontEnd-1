import moment from "moment";

export function timeConvertor(time) {
  return moment(time).format("LT");
}

export function isOpen(open, close) {
  var result = false;
  var openHour = new Date(open).getHours();
  var closeHour = new Date(close).getHours();
  var currentHour = new Date().getHours();

  if (currentHour > openHour && currentHour < closeHour) {
    result = true;
  }

  return result;
}
