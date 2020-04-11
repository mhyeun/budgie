import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getUser } from "../net";

const initialState = {
  logged: false,
  id: "",
  financeid: "",
};

function logging(state = initialState, action) {
  switch (action.type) {
    case "login":
      return {
        logged: true,
        id: action.id,
        financeid: action.financeid,
      };
    case "logout":
      return {
        logged: false,
      };
    default:
      return state;
  }
}

export function logMeIn(myid) {
  return {
    type: "login",
    id: myid,
    financeid: getUser(myid).financeid,
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
