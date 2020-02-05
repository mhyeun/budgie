import React, { useState } from "react";
import "./form.scss";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="grid">
      <div>
        Username:
        <br />
        <input
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Form;
