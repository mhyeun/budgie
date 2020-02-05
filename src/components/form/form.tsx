import React, { useState } from "react";
import "./form.scss";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        Username:
      </div>
      <input
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <div>
        Password:
      </div>
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  );
};

export default Form;