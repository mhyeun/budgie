// Assumes historyData will be of form [{date: date, amount: amount}]
const dateParser = (historyData) => {
  return historyData.map((data) => Date.parse(data.date));
};

const convertToDays = (dateInMs) => {
  const millisecondsPerDay = 86400000;
  return dateInMs / millisecondsPerDay;
};

const smallestDateInterval = (historyData) => {
  const dates = dateParser(historyData);
  if (dates.length === 0) {
    return -2;
  } else if (date.length === 1) {
    return -1;
  }
  let smallestDiff = dates[1] - dates[0];
  for (let i = 2; i < dates.length; i++) {
    const currentDiff = dates[i] - dates[i - 1];
    smallestDiff = Math.min(smallestDiff, currentDiff);
  }
  return convertToDays(smallestDiff);
};

export default smallestDateInterval;
