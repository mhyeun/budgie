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

export function logMeIn() {
  return {
    type: "login",
  };
}

export function logmeout() {
  return {
    type: "logout",
  };
}

const store = createStore(logging, initialState, applyMiddleware(thunk));
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));
export default store;
