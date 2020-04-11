import { getHistory, getGoals } from "../../net";
import smallestDateInterval from "./helper";

const noDataHandler = () => {
  console.log("Nothing in history.");
  return [];
};

const oneDataHandler = (date, actualAmount) => {
  console.log("Only one item in history.");
  return [
    {
      name: date,
      actual: actualAmount,
      goal: 2400,
    },
  ];
};

// Assumes history will be of form [{date: date, amount: amount}]
const getData = (financeId) => {
  const history = getHistory(financeId);
  const goals = getGoals(financeId);

  const interval = smallestDateInterval(history);
  if (interval === -2) {
    return noDataHandler();
  } else if (interval === -1) {
    // Need to format date so it looks ok on axis
    const date = history[0].date;
    const actual = history[0].amount;
    return oneDataHandler(date, actual);
  }
};

const data = [
  {
    name: "Page A",
    actual: 4000,
    goal: 2400,
  },
  {
    name: "Page B",
    actual: 3000,
    goal: 1398,
  },
];

export default getData;
