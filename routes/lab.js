const express = require("express");
const Lab = require("../models/Lab");
const router = express.Router();
const Manager = require("../models/Manager");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      res.redirect("/lab/panel");
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/panel", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      res.render("lab-panel");
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/code", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      res.render("lab-user-code");
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      const username = await User.findOne({ username: req.params.code });
      res.render("lab-data", {
        data: username,
      });
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code/pending", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      const username = await User.findOne({ username: req.params.code });
      const lab_test = await Lab.find({ username: req.params.code, done: 0 });
      res.render("lab-test-pending", {
        data: username,
        test: lab_test,
      });
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code/result", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      const lab_test = await Lab.find({ username: req.params.code }).sort({
        Date: -1,
      });
      res.render("lab-send-result", {
        test: lab_test,
      });
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code/result/:id", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id })
    if(user.isLab == 1){
      const labResult = await Lab.findOne({ _id: req.params.id })
      res.render("lab-send-result-page", {
        data: labResult,
      })
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
