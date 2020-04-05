const axios = require("axios");
const bcrypt = require("bcryptjs");

// saad using port 5000 for server
const url = "http://localhost:5000";

export async function createUser(username: String, password: String) {
  try {
    const res = await axios.post(`${url}/users/add`, {
      username: username,
      password: password,
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
// TODO: add undefined checks for username and password
export async function authUser(username: String, password: String) {
  try {
    const res = await axios.get(`${url}/users/`);
    console.log(res);
    const foundUser = res.data.filter(
      (user: { username: String }) => user.username === username
    );
    console.log("User found: ", foundUser);

    const passwordsMatch = await bcrypt.compare(
      password,
      foundUser[0].password
    );
    const usernamesMatch = foundUser[0].username === username;
    if (passwordsMatch && usernamesMatch) return true;
    return false;
  } catch (err) {
    console.error(err);
    Promise.reject(err);
    return false;
  }
}
