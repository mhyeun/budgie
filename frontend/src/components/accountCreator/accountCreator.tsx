import React, { useState } from "react";
import "./accountCreator.scss";
import history from "../../history";
import store, { logMeIn } from "../../redux-store/store";
import { createUser, getUser, getFinanceWithId } from "../../net";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [attemptFailed, setAttemptFailed] = useState(false);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && username && password) {
      handleButtonClick(e);
    }
  };

  const handleButtonClick = async (e: any) => {
    setAttemptFailed(false);
    const authorized = await createUser(username, password);
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
      setAttemptFailed(true);
    }
  };

  return (
    <div className="accountCreator">
      <div id="userCredentials">
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
      </div>
      <div id="historyGoals"></div>
    </div>
  );
};

export default CreateAccount;
