import React, { useState } from "react";
import "./form.scss";
import history from "../../history";
import store, { logMeIn } from "../../redux-store/store";
import { authUser } from "../../net";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attemptFailed, setAttemptFailed] = useState(false);

  // Presses "Log In" button when user presses enter
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && username && password) {
      handleButtonClick(e);
    }
  };

  const handleButtonClick = async (e: any) => {
    setAttemptFailed(false);
    const authorized = await authUser(username, password);
    if (authorized) {
      store.dispatch(logMeIn());
      history.push("/dashboard");
    } else {
      setAttemptFailed(true);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Form;
