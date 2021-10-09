const express = require("express");
const router = express.Router();
const Manager = require("../models/Manager");
const User = require("../models/User");
const Drugs = require("../models/Drugs");
const Drugs_cat = require("../models/drugs-category");
const Drugs_history = require("../models/Drugs-history");
const Lab = require("../models/Lab");
const { route } = require("./api");

router.get("/", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      res.redirect("/doctor/panel");
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log("error");
  }
});

router.get("/panel", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      res.render("doctor-enter-code");
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log("error");
  }
});

router.get("/data/:code", async (req, res) => {
  try {
    const user = await Manager.findOne({ id: req.cookies.id });
    if (user.isDoctor == 1) {
      const username = req.params.code;
      const patient = await User.findOne({ username: username });
      res.render("doctor-user-data", {
        data: patient,
      });
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code/adddrugs", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      const drugs = await Drugs.find({}).sort({ Date: -1 });
      const drugs_cat = await Drugs_cat.find({}).sort({ Date: -1 });
      const username = req.params.code;
      res.render("doctor-give-drugs", {
        drugs: drugs,
        cat: drugs_cat,
        code: username,
      });
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/data/:code/adddrugs/:id", async (req, res) => {
  const user = await Manager.findOne({ _id: req.cookies.id });
  const drugs = await Drugs.findOne({ _id: req.params.id });
  const username = req.params.code;
  if (user.isDoctor == 1) {
    const newDrug = [
      new Drugs_history({
        name: drugs.name,
        doctor: user.name,
        username: req.params.code,
      }),
    ];

    newDrug.forEach((data) => {
      data.save((error) => {
        if (!error) {
          console.log(data);
          res.redirect(`/doctor/data/${username}/adddrugs`);
        } else {
          console.log(error);
        }
      });
    });
  } else {
    res.status(404).send("You do not have permistion !");
  }
});

router.get("/data/:code/adddrugs/filter/:filter", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      const drugs = await Drugs.find({ category: req.params.filter }).sort({
        Date: -1,
      });
      const drugs_cat = await Drugs_cat.find({}).sort({ Date: -1 });
      const username = req.params.code;
      res.render("doctor-give-drugs", {
        drugs: drugs,
        cat: drugs_cat,
        code: username,
      });
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code/drugs-history", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      const drugs_history = await Drugs_history.find({
        username: req.params.code,
      }).sort({ Date: -1 });
      res.render("doctor-drugs-history", {
        drugs: drugs_history,
      });
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code/lab", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      res.render("doctor-send-test", {
        code: req.params.code,
      });
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/data/:code/lab", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      const newTest = [
        new Lab({
          name: req.body.name,
          username: req.params.code,
          doctor: user.name,
        }),
      ];

      newTest.forEach((data) => {
        data.save((error) => {
          if(!error){
            console.log(data)
            res.redirect(`/doctor/data/${req.params.code}`)
          } else {
            console.log(error)
          }
        })
      })
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code/lab-history", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isDoctor == 1) {
      const code = req.params.code
      const lab_history = await Lab.find({ username: code }).sort({Date: -1})
      res.render("doctor-lab-history", {
        test: lab_history
      })
    } else {
      res.status(404).send("You do not have permistion !");
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
