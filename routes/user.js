const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Drugs_history = require("../models/Drugs-history");
const Lab = require("../models/Lab");
const Manager = require("../models/Manager");
const Orders = require("../models/Orders");

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    if (user) {
      res.render("user-data", {
        user: user,
      });
    } else {
      res.render("errors/user-not-found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/drugs-history", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    if (user) {
      const drugs_history = await Drugs_history.find({
        username: req.params.id,
      }).sort({ Date: -1 });
      res.render("user-drugs-history", {
        drugs: drugs_history,
      });
    } else {
      res.render("errors/user-not-found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/lab-history", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    if (user) {
      const lab = await Lab.find({ username: req.params.id, done: 1 }).sort({
        Date: -1,
      });

      res.render("user-lab-history", {
        test: lab,
      });
    } else {
      res.render("errors/user-not-found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/order", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    if (user) {
      const category = await Manager.find({ isDoctor: 1}).sort({ Date: -1 })
      res.render("user-doctors-category", {
          cat: category,
          code: req.params.id,
      })
    } else {
      res.render("errors/user-not-found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/order/:doctor", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.id });
    if (user) {
      const doctor = await Manager.findOne({ name: req.params.doctor });
      res.render("user-submit-order.ejs", {
          doctor: doctor,
          user: user,
      })
    } else {
      res.render("errors/user-not-found");
    }
    } catch (error) {
        console.log(error);
    }
})

router.post("/:id/order/:doctor", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.id });
        const doctor = await Manager.findOne({ name: req.params.doctor })

        const orders = await Orders.findOne({ username: req.params.id, doctor_name: req.params.doctor})

        if(orders){
          res.status(404).send("error")
        } else {
          const newOrder = [
            new Orders({
                name: user.name,
                username: user.username,
                doctor_name: doctor.name,
            }),
        ];

        newOrder.forEach((data) => {
            data.save((error) => {
                if(!error){
                    console.log(data)
                    res.redirect(`/data/${req.params.id}/order/${req.params.doctor}/done`)
                } else {
                    console.log(error)
                }
            })
        })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id/order/:doctor/done", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.id });
        if(user){
            res.render("user-order-done")
        } else {
            res.render("errors/user-not-found");
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
