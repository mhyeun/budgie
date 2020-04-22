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
  const [usernameFailed, setUsernameFailed] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);

  const validityCheck = (): boolean => {
    setUsernameFailed(
      !(username && username.length >= 3 && username.length <= 12)
    );
    setPasswordFailed(
      !(password && password.length >= 3 && password.length <= 12)
    );
    setEmailFailed(!(email && validate(email)));
    if (!(usernameFailed && passwordFailed && emailFailed)) return false;
    else return true;
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && username && password && email) {
      handleButtonClick(e);
    }
  };

  const handleButtonClick = async (e: any) => {
    if (validityCheck()) {
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
      }
    }
  };
  return (
    <div className="accountCreator">
      <div id="userCredentials">
        <h4>Create New Budgie Account</h4>
        <input
          style={{
            borderRadius: "4px",
            border: usernameFailed ? "1px solid red" : "1px solid black",
            marginTop: "15px",
          }}
          placeholder=" Username"
          name="username"
          id="user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <br />
        <input
          style={{
            borderRadius: "4px",
            border: passwordFailed ? "1px solid red" : "1px solid black",
            marginTop: "10px",
          }}
          placeholder=" Password"
          type="password"
          name="password"
          id="pw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <br />
        <input
          style={{
            borderRadius: "4px",
            border: emailFailed ? "1px solid red" : "1px solid black",
            marginTop: "10px",
          }}
          placeholder=" Email"
          type="email"
          name="email"
          id="em"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <br />
        <button
          id="enter"
          type="button"
          style={{ marginTop: "20px", marginRight: "10px" }}
          disabled={!username || !password}
          onClick={handleButtonClick}
        >
          Create Account
        </button>
        <p
          id="criteria"
          style={{
            marginLeft: "35px",
            marginRight: "20px",
            color:
              usernameFailed || passwordFailed || emailFailed ? "red" : "black",
          }}
        >
          Username and password both must be between 3 to 10 characters.
        </p>
      </div>
      <div id="historyGoals"></div>
      {console.log(usernameFailed, passwordFailed, emailFailed)}
    </div>
  );
};

export default CreateAccount;
