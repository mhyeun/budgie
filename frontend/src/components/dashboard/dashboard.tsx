import React, { useState, useEffect } from "react";
import Chart from "../chart/chart";
import { connect } from "react-redux";
import { getData } from "./dataHelper";
import { addHistory, addGoal, getFinanceWithId } from "../../net";
import moment from "moment";
import "./dashboard.scss";

const properUnits = () => {
  const toolTip = document.getElementsByClassName(
    ".recharts-tooltip-label"
  )[0] as HTMLElement;
  toolTip.innerHTML = moment(toolTip.innerHTML).format("MM/D");
};

const Dashboard = (props: any) => {
  const { Id, financeId } = props;

  const [currentUserFinance, setCurrentUserFinance] = useState({
    history: [],
    goal: {},
  });
  const [data, setData] = useState([{}]);
  const [isFinanceLoaded, setIsFinanceLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [goalDate, setGoalDate] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [historyAmount, setHistoryAmount] = useState(0);

  useEffect(() => {
    async function getFinance(id: String) {
      const res = await getFinanceWithId(id);
      setCurrentUserFinance(res);
      setIsFinanceLoaded(true);
    }
    getFinance(Id);
  }, []);

  useEffect(() => {
    if (isFinanceLoaded) {
      const history = currentUserFinance.history;
      const goal = currentUserFinance.goal;
      const data = getData(history, goal);
      setData(data);
      setIsDataLoaded(true);
      properUnits();
    }
  }, [isFinanceLoaded]);

  const handleSubmitNewGoal = () => {
    const dateToSubmit = new Date(goalDate);
    addGoal(financeId, dateToSubmit, goalAmount);
  };

  const handleSubmitNewHistory = () => {
    addHistory(financeId, historyAmount);
  };

  return (
    <div id="dashboard">
      <div id="myChart">
        <h4>Budgeting Overview</h4>
        {isDataLoaded && <Chart data={data} />}
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
    Id: state.Id,
    financeId: state.financeId,
  };
};

export default connect(mapStateToProps)(Dashboard);
