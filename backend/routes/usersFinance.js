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
    goals: [],
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
      userFinance.history.push(req.body.currentAmount);
      res.json("Pushed to history successfully.");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST to goals
router.route("/add/goal/:financeId").post((req, res) => {
  UserFinance.findById(req.params.financeId)
    .then((userFinance) => {
      userFinance.goals.push(req.body.newGoal);
      res.json("Pushed to goals successfully.");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
