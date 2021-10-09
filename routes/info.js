const express = require("express");
const router = express.Router();
const Manager = require("../models/Manager");
const User = require("../models/User");
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/upload/images");
  },

  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1000 * 1000,
  },
});

router.get("/", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isInfo == 1) {
      res.redirect("/info/panel")
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
    if (user.isInfo == 1) {
      res.render("info-panel");
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/add-user", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isInfo == 1) {
      res.render("info-adduser");
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-user", upload.single("image"), async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isInfo == 1) {
      const { name, age, username, blood } = req.body;

      const newUser = [
        new User({
          name: name,
          username: username,
          born: age,
          blood_type: blood,
          image: req.file.filename,
        }),
      ];

      newUser.forEach((data) => {
        data.save((error) => {
          if (!error) {
            console.log(data);
            res.redirect("/info/add-user");
          }
        });
      });
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id })
    if(user.isInfo == 1){
      const getUsers = await User.find({}).sort({ Date: -1 })
      res.render("info-users", {
        users: getUsers,
      })
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error)
  }
})

router.get("/users/:id/edit", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id })
    if(user.isInfo == 1){
      const userID = req.params.id
      const getUser = await User.findOne({ _id: userID})
      res.render("info-edituser", {
        data: getUser,
      })
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error)
  }
})

router.get("/usercard/:id", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id })
    const getUser = await User.findOne({ _id: req.params.id })
    if(user.isInfo == 1){
      res.render("info-usercard", {
        data: getUser,
      })
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error){
    console.log(error)
  }
})

router.get("/find", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id })
    if(user.isInfo == 1){
      res.render("info-find")
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error)
  }
})

router.get("/find/:name", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id })
    if(user.isInfo == 1){
      const userName = req.params.name
      const fixer = userName.replace("-", " ")
      const getUser = await User.find({ name: fixer })
      
      if(getUser){
        res.render("info-getUser", {
          getUser: getUser,
        })
      } else {
        res.status(404).send("لم يتم ايجاد المريض");
      }
    } else {
      res.status(404).send("You do not have permation !");
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;