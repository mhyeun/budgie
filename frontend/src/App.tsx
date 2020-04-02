import * as React from "react";
import "./App.scss";

import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/navbar/navbar";
import history from "./history";
import { Route, Router, BrowserRouter, Switch } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

const logging = (state: boolean = false, action: any) => {
  switch (action) {
    case "logged":
      return true;
    case "unlogged":
      return false;
    default:
      return state;
  }
};

let store = createStore(logging);

store.subscribe(() => console.log(store.getState()));

const App = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/dashboard" component={() => <Dashboard />} />
          </Switch>
        </Router>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
