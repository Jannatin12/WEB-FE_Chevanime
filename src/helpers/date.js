function dateFormater(unformatDate) {
  const listMonth = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    'Dec'
  ]
  const date = new Date(unformatDate).toLocaleString("id-ID");
  const rawDate = date.split(" ")[0];
  let [currentDate, currentMonth, currentYear] = rawDate.split("/");

  return `${currentYear}/${listMonth[currentMonth - 1]}/${currentDate}`;
}
console.log(dateFormater('1989-08-25T00:00:00+00:00'));

export default dateFormater;