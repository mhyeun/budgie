import React, { useState } from "react";
import "./accountCreator.scss";
import history from "../../history";
import store, { logMeIn } from "../../redux-store/store";
import { createUser, getUser, getFinanceWithId } from "../../net";
import { validate } from "email-validator";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [attemptFailed, setAttemptFailed] = useState(false);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && username && password && email) {
      handleButtonClick(e);
    }
  };

  const handleButtonClick = async (e: any) => {
    setAttemptFailed(false);
    const validEmail = validate(email);
    if (validEmail) {
      const authorized = await createUser(username, password, email);
      if (authorized) {
        store.dispatch(
          logMeIn(
            authorized,
            ((await getUser(authorized)) as any).username,
            ((await getFinanceWithId(authorized)) as any)._id
          )
        );
        history.push("/settings");
      } else {
        setAttemptFailed(true);
      }
    } else {
      setAttemptFailed(true);
    }
  };

  return (
    <div className="accountCreator">
      <div id="userCredentials">
        <input
          style={{
            border: attemptFailed ? "1px solid red" : "1px solid black",
            marginRight: "10px",
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
        <input
          style={{
            border: attemptFailed ? "1px solid red" : "1px solid black",
            marginTop: "10px",
          }}
          placeholder="Email"
          type="email"
          name="email"
          id="em"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <br />
        {attemptFailed && (
          <p
            id="msg"
            style={{
              marginTop: "5px",
              marginBottom: "-10px",
              fontSize: "small",
            }}
          >
            Please follow username and password guidlines, email must be valid
            aswell.
          </p>
        )}
        <button
          id="enter"
          type="button"
          style={{ marginTop: "20px", marginRight: "10px" }}
          disabled={!username || !password}
          onClick={handleButtonClick}
        >
          Create My Account
        </button>
        <p id="criteria">
          *Username and password, must be between 3 to 10 characters, white
          space on endings are ignored.
        </p>
      </div>
      <div id="historyGoals"></div>
    </div>
  );
};

export default CreateAccount;
