import { roundDigits, formatDate } from "./netHelper";

const axios = require("axios");
const bcrypt = require("bcryptjs");

// Using port 5000 for server
const url = "http://localhost:5000";

// API calls for user purposes
export async function getAllUsers() {
  try {
    const res = await axios.get(`${url}/users/`);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function createUser(
  username: String,
  password: String,
  email: string
) {
  try {
    const res = await axios.post(`${url}/users/add`, {
      username: username,
      password: password,
      email: email,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function getUser(userId: String) {
  try {
    const res = await axios.get(`${url}/users/${userId}`);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

async function authHelper(username: String) {
  try {
    const res = await axios.get(`${url}/users/`);
    const foundUser = res.data.filter(
      (user: { username: String }) => user.username === username
    );
    if (foundUser) return foundUser[0];
    return false;
  } catch (err) {
    console.error(err);
    Promise.reject(err);
    return false;
  }
}

export async function authUser(username: String, password: String) {
  try {
    const foundUser = await authHelper(username);
    if (foundUser) {
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
      if (passwordsMatch) return foundUser._id;
    }
    return false;
  } catch (err) {
    console.error(err);
    Promise.reject(err);
    return false;
  }
}

// API calls for finance purposes
export async function getAllFinances() {
  try {
    const res = await axios.get(`${url}/usersFinance/`);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function getFinanceWithId(userId: String) {
  try {
    const res = await axios.get(`${url}/usersFinance/${userId}`);
    return Promise.resolve(res.data);
  } catch (err) {
    console.error(err);
    Promise.reject(err);
  }
}

export async function addHistory(financeId: String, amount: number) {
  try {
    const formattedDate = formatDate(new Date());
    const formattedAmount = roundDigits(amount);
    const req = { date: formattedDate, amount: formattedAmount };
    console.log(req);
    const res = await axios.post(
      `${url}/usersFinance/add/history/${financeId}`,
      {
        data: req,
      }
    );
    Promise.resolve(res.data);
    return true;
  } catch (err) {
    console.error(err);
    Promise.reject(err);
    return false;
  }
}

export async function addGoal(
  financeId: String,
  goalDate: Date,
  goalAmount: number
) {
  try {
    const formattedDate = formatDate(new Date(goalDate));
    const formattedAmount = roundDigits(goalAmount);
    const req = { date: formattedDate, amount: formattedAmount };
    console.log("req: ", req);
    const res = await axios.post(`${url}/usersFinance/add/goal/${financeId}`, {
      data: req,
    });
    Promise.resolve(res.data);
    return true;
  } catch (err) {
    console.error(err);
    Promise.reject(err);
    return false;
  }
}
