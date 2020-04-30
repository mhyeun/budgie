import React, { useState, useEffect } from "react";
import Chart from "../chart/chart";
import { connect } from "react-redux";
import { getData } from "./dataHelper";
import { addHistory, addGoal, getFinanceWithId } from "../../net";
import history from "../../history";
import moment from "moment";
import "./dashboard.scss";

const Dashboard = (props: any) => {
  const { Id, financeId } = props;

  if (!Id || !financeId) {
    history.push("/");
  }

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
    }
  }, [isFinanceLoaded]);

  const handleSubmitNewGoal = () => {
    const dateToSubmit = new Date(goalDate);
    addGoal(financeId, dateToSubmit, goalAmount);
    alert(
      `Goal sent successfully with date: ${goalDate}, amount: ${goalAmount}!`
    );
  };

  const handleSubmitNewHistory = () => {
    addHistory(financeId, historyAmount);
    alert(`Goal sent successfully with amount: ${historyAmount}!`);
  };

  return (
    <div id="dashboard">
      <div id="myChart">
        <h4>Budgeting Overview</h4>
        {isDataLoaded && <Chart data={data} />}
        <br />
        <h4>Update Budgeting Information</h4>
        <div style={{ marginLeft: "5%", marginTop: 20 }}>
          <div>
            <h6>Update Goal</h6>
            <input
              className="inputField"
              placeholder=" Ex: 4/20/2020"
              onChange={(e) => setGoalDate(e.target.value)}
            />
            <input
              className="inputField"
              placeholder=" Ex: 2000"
              type="number"
              onChange={(e) => setGoalAmount(parseInt(e.target.value))}
            />
            <button className="submit" onClick={() => handleSubmitNewGoal()}>
              Submit Goal
            </button>
          </div>
          <br />
          <div style={{ marginTop: 10 }}>
            <h6>Log Today's Balance</h6>
            <input
              className="inputField"
              placeholder=" Ex: 1000"
              type="number"
              onChange={(e) => setHistoryAmount(parseInt(e.target.value))}
            />
            <button className="submit" onClick={() => handleSubmitNewHistory()}>
              Submit Log
            </button>
          </div>
        </div>
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
