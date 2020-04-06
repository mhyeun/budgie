import React, { useState } from "react";
import "./form.scss";
import history from "../../history";
import store, { logmein } from "../../redux-store/store";
import { authUser } from "../../net";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedOn, setLoggedOn] = useState(false);
  const [attemptFailed, setAttemptFailed] = useState(false);

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
      setAttemptFailed(true);
    }
  };

  return (
    <div>
      <div id="grid">
        <input
          style={{
            border: attemptFailed ? "1px solid red" : "1px solid black",
          }}
          placeholder="Username"
          name="username"
          id="user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          style={{
            border: attemptFailed ? "1px solid red" : "1px solid black",
          }}
          placeholder="Password"
          type="password"
          name="password"
          id="pw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      {attemptFailed && (
        <div id="message">
          <p id="msg">Incorrect username or password. Try again.</p>
        </div>
      )}
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
