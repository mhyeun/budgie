import React, { useState } from "react";
import "./accountCreator.scss";
import history from "../../history";
import store, { logMeIn } from "../../redux-store/store";
import { createUser, getUser, getFinanceWithId, getAllUsers } from "../../net";
import { validate } from "email-validator";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameFailed, setUsernameFailed] = useState(false);
  const [passwordFailed, setPasswordFailed] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);
  const [usernameUnique, setUsernameUnique] = useState(true);
  const [emailUnique, setEmailUnique] = useState(true);

  const validityCheck = (): boolean => {
    setUsernameFailed(
      !(username && username.length >= 3 && username.length <= 12)
    );
    setPasswordFailed(
      !(password && password.length >= 3 && password.length <= 12)
    );
    setEmailFailed(!(email && validate(email)));
    if (!(usernameFailed && passwordFailed && emailFailed)) return true;
    else return false;
  };

  const duplicityCheck = async () => {
    const users = await getAllUsers();
    users.forEach((elem: { username: string; email: string }) => {
      if (elem.username === username) {
        setUsernameUnique(false);
      }
      if (elem.email === email) {
        setEmailUnique(false);
      }
    });
    if (usernameUnique && emailUnique) return true;
    else return false;
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && username && password && email) {
      handleButtonClick(e);
    }
  };

  const handleButtonClick = async (e: any) => {
    if (validityCheck() && duplicityCheck()) {
      const authorized = await createUser(username, password, email);
      if (authorized) {
        store.dispatch(
          logMeIn(
            authorized,
            ((await getUser(authorized)) as any).username,
            ((await getFinanceWithId(authorized)) as any)._id
          )
        );
        history.push("/dashboard");
      } else {
        console.error("Servor encountered an Error");
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
            border:
              usernameFailed || !usernameUnique
                ? "1px solid red"
                : "1px solid black",
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
            border:
              emailFailed || !emailUnique ? "1px solid red" : "1px solid black",
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
        <div
          id="criteria"
          style={{
            marginLeft: "35px",
            marginRight: "20px",
          }}
        >
          <p
            style={{
              display: usernameUnique ? "none" : "inline",
              marginInlineEnd: "1em",
              color: "red",
            }}
          >
            Username is taken!
          </p>
          <p
            style={{
              display: emailUnique ? "none" : "inline",
              color: "red",
            }}
          >
            Email is taken!
          </p>
          <p
            style={{
              color:
                usernameFailed || passwordFailed || emailFailed
                  ? "red"
                  : "black",
            }}
          >
            Username and password both must be between 3 to 10 characters.
          </p>
        </div>
      </div>
      <div id="historyGoals"></div>
    </div>
  );
};

export default CreateAccount;
