const router = require("express").Router();
let UserFinance = require("../models/userFinance.model");

// Consider differences between findById and findOne

router.route("/").get((req, res) => {
  UserFinance.find()
    .then((userFinances) => {
      res.json(userFinances);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create a finance object
router.route("/add").post((req, res) => {
  const newUserFinance = new UserFinance({
    history: [],
    goal: { date: "", amount: 0 },
    userId: req.body.userId,
  });

  newUserFinance
    .save()
    .then()
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get finance object with userId
router.route("/:userId").get((req, res) => {
  UserFinance.findOne({ userId: req.params.userId })
    .then((userFinance) => res.json(userFinance))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST to history
router.route("/add/history/:financeId").post((req, res) => {
  UserFinance.findById(req.params.financeId)
    .then((userFinance) => {
      userFinance.history.push(req.body.data);

      userFinance
        .save()
        .then(() => res.json("Pushed to history successfully."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST to goal
router.route("/add/goal/:financeId").post((req, res) => {
  UserFinance.findById(req.params.financeId)
    .then((userFinance) => {
      userFinance.goal = req.body.data;

      userFinance
        .save()
        .then(() => {
          res.json("Pushed to goals successfully.");
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// DEL history
router.route("/delete/history/:financeId").delete((req, res) => {
  UserFinance.findById(req.params.financeId)
    .then((userFinance) => {
      userFinance.history = [];

      userFinance
        .save()
        .then(() => res.json("Deleted history successfully."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// DEL goal
router.route("/delete/goal/:financeId").delete((req, res) => {
  UserFinance.findById(req.params.financeId)
    .then((userFinance) => {
      userFinance.goal = {};

      userFinance
        .save()
        .then(() => res.json("Deleted goal successfully."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
