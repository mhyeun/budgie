const axios = require("axios");
const bcrypt = require("bcryptjs");

// saad using port 5000 for server
const url = "https://localhost:5000";

export async function createUser(username: String, password: String) {
  try {
    const res = await axios.post(`${url}/users/add`, {
      username: username,
      password: password
    });
    console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function getAllUsers() {
  try {
    const res = await axios.get(`${url}/users/`);
    console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function getUser(username: String) {
  try {
    const res = await axios.get(`${url}/users/${username}`);
    console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function authUser(username: String, password: String) {
  try {
    const res = await axios.get(`${url}/users/`);
    const foundUser = res.filter((user: { username: String; }) => user.username === username);
    console.log("User found: ", foundUser);

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    const usernamesMatch = foundUser.username === username;
    if (passwordsMatch && usernamesMatch) return true;
    return false;
  } catch (err) {
    console.error(err);
    Promise.reject(err);
    return false;
  }
}