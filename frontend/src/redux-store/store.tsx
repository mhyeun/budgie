import { createStore } from "redux";

const initialState = {
  logged: "false",
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

const store = createStore(logging);

store.subscribe(() => console.log(store.getState()));

export default store;
