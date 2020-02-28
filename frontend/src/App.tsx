import * as React from "react";
import "./App.scss";

import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/navbar/navbar";
import history from "./history";
import { Route, Router, BrowserRouter, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/dashboard" component={() => <Dashboard />} />
          </Switch>
        </Router>
      </BrowserRouter>
    </div>
  );
};

export default App;
