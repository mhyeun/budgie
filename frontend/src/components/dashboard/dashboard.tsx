import React, { useState } from "react";
import Chart from "../chart/chart";
import { connect } from "react-redux";
import { getMockHistory, getMockGoal } from "./mockData";
import { addHistory, addGoal } from "../../net";
import "./dashboard.scss";

const mockData = getMockHistory();
const mockGoal = getMockGoal();

const createData = (historyData: any, goalData: any) => {
  const data = new Array();

  const startTime = new Date(historyData[0].date).getTime();
  const endTime = new Date(goalData.date).getTime();
  const timeInterval = endTime - startTime;

  const startAmount = parseInt(historyData[0].amount);
  const endAmount = parseInt(goalData.amount);
  const amountInterval = endAmount - startAmount;

  data.push({
    time: new Date(historyData[0].date).getTime(),
    Balance: historyData[0].amount,
    Goal: parseInt(historyData[0].amount),
  });

  for (let i = 1; i < historyData.length; i++) {
    const currentTime = new Date(historyData[i].date).getTime();
    const percentage =
      Math.round(((currentTime - startTime) / timeInterval) * 100) / 100;
    console.log("INFO: ", percentage);
    const dataPoint = {
      time: new Date(historyData[i].date).getTime(),
      Balance: historyData[i].amount,
      Goal: startAmount + amountInterval * percentage,
    };
    data.push(dataPoint);
  }

  return data;
};

const data = createData(mockData, mockGoal);
console.log(data);

const Dashboard = (props: any) => {
  const { financeId } = props;
  const [goalDate, setGoalDate] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [historyAmount, setHistoryAmount] = useState(0);

  const handleSubmitNewGoal = () => {
    const dateToSubmit = new Date(goalDate);
    addGoal(financeId, dateToSubmit, goalAmount).then(() =>
      console.log("Submit complete!")
    );
  };

  const handleSubmitNewHistory = () => {
    addHistory(financeId, historyAmount).then(() =>
      console.log("Submit complete!")
    );
  };

  return (
    <div id="dashboard">
      <div id="myChart">
        <h4>Budgeting Overview</h4>
        <Chart data={data} />
      </div>
      <div style={{ marginLeft: "40vw" }}>
        <p>New Goal</p>
        <input
          style={{ marginRight: 10 }}
          placeholder={goalDate}
          onChange={(e) => setGoalDate(e.target.value)}
        />
        <input
          style={{ marginRight: 10 }}
          type="number"
          onChange={(e) => setGoalAmount(parseInt(e.target.value))}
        />
        <button onClick={() => handleSubmitNewGoal()}>Submit</button>
      </div>
      <div style={{ marginLeft: "40vw" }}>
        <p>New History</p>
        <input
          type="number"
          onChange={(e) => setHistoryAmount(parseInt(e.target.value))}
        />
        <button onClick={() => handleSubmitNewHistory()}>Submit</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    financeId: state.financeId,
  };
};

export default connect(mapStateToProps)(Dashboard);
