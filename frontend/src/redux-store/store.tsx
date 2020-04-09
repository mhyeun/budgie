import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  logged: false,
  id: "",
};

function logging(state = initialState, action: any): any {
  switch (action.type) {
    case "login":
      return {
        logged: true,
        id: action.id,
      };
    case "logout":
      return {
        logged: false,
      };
    default:
      return state;
  }
}

export function logMeIn(myid: string) {
  return {
    type: "login",
    id: myid,
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
