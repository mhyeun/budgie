// Assumes historyData will be of form [{date: date, amount: amount}]
function dateParser(historyData) {
  return historyData.map((data) => Date.parse(data.date));
}

function convertToDays(dateInMs) {
  const millisecondsPerDay = 86400000;
  return Math.round(dateInMs / millisecondsPerDay);
}

export function formatDateForAxis(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return month + "/" + day + "/" + year;
}

export function smallestDateInterval(historyData) {
  const dates = dateParser(historyData);
  if (dates.length === 0) {
    return -2;
  } else if (dates.length === 1) {
    return -1;
  }
  let smallestDiff = dates[1] - dates[0];
  for (let i = 2; i < dates.length; i++) {
    const currentDiff = dates[i] - dates[i - 1];
    smallestDiff = Math.min(smallestDiff, currentDiff);
  }
  return convertToDays(smallestDiff);
}
