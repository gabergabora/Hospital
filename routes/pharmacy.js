const express = require("express");
const router = express.Router();
const Manager = require("../models/Manager");
const Drugs_cat = require("../models/drugs-category");
const Drugs = require("../models/Drugs");
const Drugs_history = require("../models/Drugs-history");

router.get("/", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      res.redirect("/pharmacy/panel")
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/panel", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-panel");
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/category/addcat", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });

    if (user.isPharmacy == 1) {
      res.render("pharmacy-addcat");
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/category/addcat", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });

    if (user.isPharmacy == 1) {
      const name = req.body.name;
      const newCategory = [
        new Drugs_cat({
          name: name,
        }),
      ];

      newCategory.forEach((data) => {
        data.save((error) => {
          if (!error) {
            console.log(data);
            res.redirect("/pharmacy/category/addcat");
          }
        });
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/category", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs_cat = await Drugs_cat.find({}).sort({ Date: -1 });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-category", {
        drugs_cat: drugs_cat,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/category/:id/edit", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs_cat = await Drugs_cat.findOne({ _id: req.params.id });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-editcat", {
        data: drugs_cat,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/drugs/add", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs_cat = await Drugs_cat.find({}).sort({ Date: -1 });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-adddrugs", {
        category: drugs_cat,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/drugs/add", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      const { name, price, expire_Date, qty, category } = req.body;
      const newDrug = [
        new Drugs({
          name: name,
          price: price,
          expire_Date: expire_Date,
          qty: qty,
          category: category,
        }),
      ];

      newDrug.forEach((data) => {
        data.save((error) => {
          if (!error) {
            console.log(data);
            res.redirect("/pharmacy/drugs/add");
          }
        });
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/drugs", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs = await Drugs.find({}).sort({ Date: -1 });
    const category = await Drugs_cat.find({}).sort({ Date: -1 });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-drugs", {
        drugs: drugs,
        cat: category,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/drugs/:id/edit", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs = await Drugs.findOne({ _id: req.params.id });
    const category = await Drugs_cat.find({}).sort({ Date: -1 });

    if (user.isPharmacy == 1) {
      res.render("pharmacy-editdrugs", {
        category: category,
        drugs: drugs,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/drugs/filter/:filter", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const filter = req.params.filter;
    const drugs = await Drugs.find({ category: filter }).sort({ Date: -1 });
    const category = await Drugs_cat.find({}).sort({ Date: -1 });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-drugs", {
        drugs: drugs,
        cat: category,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/drugs/less", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs = await Drugs.find({}).sort({ qty: 1 });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-filter-drugs", {
        drugs: drugs,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/drugs/expire", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs = await Drugs.find({}).sort({ expire_Date: 1 });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-filter-drugs", {
        drugs: drugs,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      res.render("pharmacy-user-data");
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/data/:code", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      const username = req.params.code;
      const drugs_history = await Drugs_history.find({
        username: username,
        isGiven: 0,
      });
      res.render("pharmacy-give-drugs", {
        drugs: drugs_history,
        code: username,
      });
    } else {
      res.status(404).send("You do not have parmation !");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
