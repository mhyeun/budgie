import React, { useState } from "react";
import "./form.scss";
import history from "../../history";
import store, { logmein } from "../../redux-store/store";
import { authUser, getUser, getAllUsers, createUser } from "../../net";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedOn, setLoggedOn] = useState(false);

  // Presses "Log In" button when user presses enter
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && username && password) {
      handleButtonClick(e);
    }
  };

  const handleButtonClick = async (e: any) => {
    const authorized = await authUser(username, password);
    if (authorized) {
      setLoggedOn(true);
      store.dispatch(logmein());
      history.push("/dashboard");
    } else {
      setLoggedOn(false);
      alert("Username or password incorrect. Please try again.");
    }
  };

  return (
    <div>
      <div id="grid">
        <input
          placeholder="Username"
          name="username"
          id="user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="pw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div id="enterButton">
        <button
          id="enter"
          type="button"
          disabled={!username || !password}
          onClick={handleButtonClick}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Form;
