import React, { useState } from "react";
import Chart from "../chart/chart";
import "./dashboard.scss";

import { getMockHistory } from "../../mockData";
import { smallestDateInterval } from "./helper";

const mockData = getMockHistory();
const num = smallestDateInterval(mockData);
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
        {/* <Chart data={data} /> */}
        <h1>{num}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
