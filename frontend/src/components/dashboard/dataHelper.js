import { getHistory, getGoals } from "../../net";

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
  if (dates.length <= 1) {
    return -1;
  }
  var smallestDiff = dates[1] - dates[0];
  for (var i = 2; i < dates.length; i++) {
    var currentDiff = dates[i] - dates[i - 1];
    smallestDiff = Math.min(smallestDiff, currentDiff);
  }
  return convertToDays(smallestDiff);
};

const getData = (financeId) => {
  const history = getHistory(financeId);
  const goals = getGoals(financeId);

  smallestDateInterval(history);
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
];

export default getData;
