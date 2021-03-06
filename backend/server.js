// imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// express server
const app = express();
const port = process.env.PORT || 5000;

// middleware, express.json used to parse json
app.use(cors());
app.use(express.json());

// database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// require, use route files
// whenever the route url is visited with the respective router, the router will be called
const usersRouter = require("./routes/users");
const usersFinanceRouter = require("./routes/usersFinance");

app.use("/users", usersRouter);
app.use("/usersFinance", usersFinanceRouter);

// start server
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
