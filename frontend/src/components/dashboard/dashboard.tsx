import React, { useState } from "react";
import "./dashboard.scss";
import Chart from "chart.js";

const Dashboard = () => {
  return (
    <div id="dashboard">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Dashboard;
