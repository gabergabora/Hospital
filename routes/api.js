const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Manager = require("../models/Manager");

router.get("/register-manager", async (req, res) => {
  try {
    res.render("register-manager");
  } catch (error) {
    console.log(error);
  }
});

router.post("/register-manager", async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = [
      new Manager({
        name: name,
        born: age,
        email: email,
        password: hashedPassword,
      }),
    ];

    newUser.forEach((data) => {
        data.save((error) => {
            if(!error){
                console.log(data)
                res.redirect("/api/login-manager")
            }
        })
    })
  } catch (error) {
    console.log(error);
  }
});

router.get("/login-manager", async (req, res) => {
    try {
        res.render("login-manager")
    } catch (error) {
        console.log(error)
    }
})

router.post("/login-manager", async (req, res) => {
    try {
        const { email , password } = req.body
        const user = await Manager.findOne({ email })
        const check = await bcrypt.compare(password, user.password)

        if(check){
            res.cookie("id", user.id)
            if(user.isAdmin == 1){
              res.redirect("/admin/panel")
            } else if(user.isInfo == 1){
              res.redirect("/info/panel")
            } else if(user.isDoctor == 1){
              res.redirect("/doctor/panel")
            } else if(user.isPharmacy == 1){
              res.redirect("/pharmacy/panel")
            } else if(user.isLab == 1){
              res.redirect("/lab/panel")
            } else {
              res.status(404).send("You do not have access")
            }
        } else { 
            res.status(404).send("user not found")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;