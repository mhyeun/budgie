import React from "react";
import Chart from "../chart/chart";
import "./dashboard.scss";

import { getMockHistory, getMockGoals } from "./mockData";

const mockData = getMockHistory();
const mockGoals = getMockGoals();

const createData = (historyData: any, goalData: any) => {
  const data = new Array();

  const startTime = new Date(historyData[0].date).getTime();
  const endTime = new Date(goalData[0].date).getTime();
  const timeInterval = endTime - startTime;

  const startAmount = parseInt(historyData[0].amount);
  const endAmount = parseInt(goalData[0].amount);
  const amountInterval = endAmount - startAmount;

  data.push({
    time: new Date(historyData[0].date).getTime(),
    Balance: historyData[0].amount,
    Goal: historyData[0].amount,
  });

  for (let i = 1; i < historyData.length; i++) {
    const currentTime = new Date(historyData[i].date).getTime();
    const percentage =
      Math.round(((currentTime - startTime) / timeInterval) * 100) / 100;
    const dataPoint = {
      time: new Date(historyData[i].date).getTime(),
      Balance: historyData[i].amount,
      Goal: startAmount + amountInterval * percentage,
    };
    data.push(dataPoint);
  }

  return data;
};

const data = createData(mockData, mockGoals);
console.log(data);

const Dashboard = () => {
  return (
    <div id="dashboard">
      <div id="myChart">
        <Chart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
