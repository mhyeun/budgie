import { createStore } from "redux";

const initialState = {
  logged: "false",
};

const logging = (state = [], action) => {
  switch (action.type) {
    case "login":
      return [
        ...state,
        {
          logged: "true",
        },
      ];
    case "logout":
      return [
        ...state,
        {
          logged: "false",
        },
      ];
    default:
      return [...state];
  }
};

const store = createStore(logging);

store.subscribe(() => console.log(store.getState()));

export default store;
