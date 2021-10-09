const express = require("express");
const router = express.Router();
const Manager = require("../models/Manager");
const DoctorCategory = require("../models/Doctor-category");
const Secretary = require("../models/Secretary");
const bcrypt = require("bcrypt");

router.get("/panel", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });

    if (user.isAdmin == 1) {
      res.render("adminpanel");
    } else {
      res.status(404).send("You're not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin-users", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    const allUsers = await Manager.find({}).sort({ Date: -1 });

    if (user.isAdmin == 1) {
      res.render("admin-users", {
        users: allUsers,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/doctor-category", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    const Doctor_cat = await DoctorCategory.find({}).sort({ Date: -1 });
    if (user.isAdmin == 1) {
      res.render("admin-doctor-category", {
        Doctor_cat: Doctor_cat,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/doctor-category/add", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      res.render("admin-doctor-category-add");
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/doctor-category/add", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const newDoctorCategory = [
        new DoctorCategory({
          name: req.body.name,
        }),
      ];

      newDoctorCategory.forEach((data) => {
        data.save((error) => {
          if (!error) {
            console.log(data);
            res.redirect("/admin/doctor-category");
          } else {
            console.log(error);
          }
        });
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/doctors", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const Doctors = await Manager.find({ isDoctor: 1 }).sort({ Date: -1 });
      const category = await DoctorCategory.find({}).sort({ Date: -1 });
      res.render("admin-doctors", {
        category: category,
        doctors: Doctors,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/doctors/:id/add", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const Doctor = await Manager.findOne({ _id: req.params.id });
      const category = await DoctorCategory.find({}).sort({ Date: -1 });
      res.render("admin-doctor-set-category", {
        category: category,
        data: Doctor,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/pharmacy", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const Pharmacy = await Manager.find({ isPharmacy: 1 }).sort({ Date: -1 });
      res.render("admin-pharmacy", {
        pharmacy: Pharmacy,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/info", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const Info = await Manager.find({ isInfo: 1 }).sort({ Date: -1 });
      res.render("admin-info", {
        info: Info,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/lab", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const lab = await Manager.find({ isLab: 1 }).sort({ Date: -1 });
      res.render("admin-lab", {
        lab: lab,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/secretary/:doctor/register", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const doctor = await Manager.findOne({ _id: req.params.doctor });
      res.render("admin-secretary-register", {
        data: doctor,
      });
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/secretary/:doctor/register", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    const doctor_name = await Manager.findOne({ _id: req.params.doctor})
    if (user.isAdmin == 1) {
      const { name, age, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10)
      const newSecretary = [
        new Secretary({
          name: name,
          born: age,
          email: email,
          for_doctor: doctor_name.name,
          password: hashedPassword,
        }),
      ];

      newSecretary.forEach((data) => {
        data.save((error) => {
          if(!error){
            console.log(data)
            res.redirect("/admin/secretary")
          } else {
            console.log(error)
          }
        })
      })
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/secretary", async (req, res) => {
  try {
    const userID = req.cookies.id;
    const user = await Manager.findOne({ _id: userID });
    if (user.isAdmin == 1) {
      const secretary = await Secretary.find({}).sort({ Date: -1 })
      res.render("admin-secretary", {
        sec: secretary
      })
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;