import { createStore, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";

const initialState = {
  logged: false,
};

function logging(state = initialState, action: any): any {
  switch (action.type) {
    case "login":
      return {
        logged: true,
      };
    case "logout":
      return {
        logged: false,
      };
    default:
      return state;
  }
}

const store = createStore(logging, initialState, applyMiddleware(thunk));
console.log(store.getState());
store.dispatch("login");
store.subscribe(() => console.log(store.getState()));

export default store;
