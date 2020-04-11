import { getHistory, getGoals } from "../../net";
import smallestDateInterval from "./helper";

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
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
];

export default getData;
