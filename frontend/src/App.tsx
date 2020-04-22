import * as React from "react";
import "./app.scss";

import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/navbar/navbar";
import CreateAccount from "./components/accountCreator/accountCreator";
import history from "./history";
import GoalEditor from "./components/goalEditor/goalEditor";
import { Route, Router, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-store/store";
const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/dashboard" component={() => <Dashboard />} />
            <Route
              exact
              path="/createAccount"
              component={() => <CreateAccount />}
            />
            <Route exact path="/editGoal" component={() => <GoalEditor />} />
          </Switch>
        </Router>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
