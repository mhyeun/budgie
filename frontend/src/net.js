const axios = require("axios");

// saad using port 5000 for server
const url = "https://localhost:5000";

export async function createUser(username, password) {
  try {
    const res = await axios.post(`${url}/users/add`, {
      username: username,
      password: password
    });
    console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    data;
    console.error(err);
    Promise.reject(err);
  }
}

export async function getAllUsers() {
  try {
    const res = await axios.get(`${url}/users/`);
    connsole.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function getUser(username) {
  try {
    const res = await axios.get(`${url}/users/${username}`);
    console.log(res);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}
