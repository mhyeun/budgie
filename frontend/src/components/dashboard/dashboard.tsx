import React, { useState } from "react";
import Chart from "../chart/chart";
import "./dashboard.scss";

import { getMockHistory } from "./mockData";
import { smallestDateInterval, formatDateForAxis } from "./helper";

const mockData = getMockHistory();
const interval = smallestDateInterval(mockData);

const createData = (historyData: any) => {
  const data = new Array();
  const firstDay = new Date(historyData[0].date);
  const lastDay = new Date(historyData[historyData.length - 1].date);
  lastDay.setDate(lastDay.getDate() + interval);
  let currentDate = firstDay;

  while (currentDate <= lastDay) {
    const date = formatDateForAxis(currentDate);
    for (let i = 0; i < historyData.length; i++) {
      console.log(historyData[i].date === date);
      if (historyData[i].date === date) {
        const dataPoint = {
          name: date,
          amount: historyData[i].amount,
        };
        data.push(dataPoint);
        break;
      }
    }
    const dataPoint = {
      name: date,
    };
    data.push(dataPoint);
    currentDate.setDate(currentDate.getDate() + interval);
  }
  return data;
};

const data = createData(mockData);
console.log(data);

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
// ];

const Dashboard = () => {
  return (
    <div id="dashboard">
      <div id="myChart">
        <Chart data={data} />
        <h1>{interval}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
