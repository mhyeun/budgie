import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  logged: false,
  username: "",
  Id: "",
  financeId: "",
};

function logging(state = initialState, action: any) {
  switch (action.type) {
    case "login":
      return {
        logged: true,
        username: action.username,
        Id: action.Id,
        financeId: action.financeId,
      };
    case "logout":
      return {
        logged: false,
        username: "",
        Id: "",
        financeId: "",
      };
    default:
      return state;
  }
}

export function logMeIn(myId: string, username: string, financeId: string) {
  return {
    type: "login",
    username: username,
    Id: myId,
    financeId: financeId,
  };
}

export function logMeOut() {
  return {
    type: "logout",
  };
}

const store = createStore(logging, initialState, applyMiddleware(thunk));
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));
export default store;
