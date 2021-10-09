// Made By Mohammed Majid - Instagram : @2x_g

const express = require("express");
const app = express();
const db = require("./config/database");
const api = require("./routes/api");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const cookieParser = require("cookie-parser");
const Manager = require("./models/Manager");
const User = require("./models/User");
const Drugs_cat = require("./models/drugs-category");
const Drugs = require("./models/Drugs");
const Drugs_history = require("./models/Drugs-history");
const Lab = require("./models/Lab");
const DoctorCategory = require("./models/Doctor-category");
const methodOverride = require("method-override");
const info = require("./routes/info");
const pharmacy = require("./routes/pharmacy");
const doctor = require("./routes/doctor");
const lab = require("./routes/lab");
const Secretary = require("./models/Secretary");
const secretary = require("./routes/secretary");
const user = require("./routes/user");
const Orders = require("./models/Orders");
const router = require("./routes/api");

let PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/api", api);
app.use("/admin", admin);
app.use("/info", info);
app.use("/pharmacy", pharmacy);
app.use("/doctor", doctor);
app.use("/lab", lab);
app.use("/secretary", secretary);
app.use("/data", user);

app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.log(error);
  }
});

app.put("/admin/admin-users/:id/doctor", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isAdmin == 1) {
      await Manager.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isDoctor: 1,
          },
        }
      );
      res.redirect("/admin/admin-users");
    } else {
      res.status(404).send("You are not admin !");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/admin/admin-users/:id/info", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });

    if (user.isAdmin == 1) {
      await Manager.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isInfo: 1,
          },
        }
      );

      res.redirect("/admin/admin-users");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/admin/admin-users/:id/pharmacy", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });

    if (user.isAdmin == 1) {
      await Manager.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isPharmacy: 1,
          },
        }
      );

      res.redirect("/admin/admin-users");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/admin/admin-users/:id/lab", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });

    if (user.isAdmin == 1) {
      await Manager.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isLab: 1,
          },
        }
      );

      res.redirect("/admin/admin-users");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/users/:id/edit", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const { name, age, blood } = req.body;
    if (user.isInfo == 1) {
      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: name,
            born: age,
            blood_type: blood,
          },
        }
      );

      res.redirect("/info/users");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/pharmacy/category/:id/edit", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      await Drugs_cat.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
          },
        }
      );

      res.redirect("/pharmacy/category");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/pharmacy/drugs/:id/edit", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const { name, price, expire_Date, qty, category } = req.body;
    if (user.isPharmacy == 1) {
      await Drugs.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: name,
            price: price,
            expire_Date: expire_Date,
            qty: qty,
            category: category,
          },
        }
      );

      res.redirect("/pharmacy/drugs");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});



app.put("/pharmacy/data/:code/:id/:name/given", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    const drugs = await Drugs.findOne({ name: req.params.name });
    if (user.isPharmacy == 1) {
      await Drugs_history.updateOne(
        { _id: req.params.id },
        {
          $set: {
            isGiven: 1,
          },
        }
      );

      if (drugs.qty == 0) {
        console.log("Out of stoke");
      } else {
        await Drugs.updateOne(
          { name: req.params.name },
          {
            $set: {
              qty: drugs.qty - 1,
            },
          }
        );
      }
      const code = req.params.code;
      res.redirect(`/pharmacy/data/${code}`);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/lab/data/:code/pending/:id", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      await Lab.updateOne(
        {
          username: req.params.code,
          done: 0,
          _id: req.params.id,
        },
        {
          $set: {
            done: 1,
          },
        }
      );
      const code = req.params.code;
      res.redirect(`/lab/data/${code}/pending`);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/lab/data/:code/result/:id", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isLab == 1) {
      await Lab.updateOne(
        { _id: req.params.id },
        {
          $set: {
            result: req.body.result,
            done: 1,
          },
        }
      );

      const code = req.params.code;
      res.redirect(`/lab/data/${code}/result`);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/admin/doctors/:id/add", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isAdmin == 1) {
      await Manager.updateOne(
        { _id: req.params.id },
        {
          $set: {
            DoctorCategort: req.body.cate,
          },
        }
      );

      console.log(req.body.cate);
      res.redirect("/admin/doctors");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/secretary/orders/:code", async (req, res) => {
  try {
    const data = await Secretary.findOne({ _id: req.cookies.id });
    if (data) {
      await Orders.updateMany(
        { username: req.params.code },
        {
          $set: {
            order_date: req.body.order_date,
            Done: 1
          },
        }
      );

      console.log(req.body.order_date);
      res.redirect("/secretary/orders");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/secretary/orders/:code/delete", async (req, res) => {
  try {
    const data = await Secretary.findOne({ _id: req.cookies.id });
    if (data) {
      await Orders.deleteMany({ username: req.params.code })
      res.redirect("/secretary/panel");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
})

app.delete("/users/:id/delete", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isInfo == 1) {
      const id = req.params.id;
      await User.deleteOne({ _id: id });
      res.redirect("/info/users");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/admin/admin-users/:id/delete", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isAdmin == 1) {
      const id = req.params.id;
      await Manager.deleteOne({ _id: id });
      res.redirect("/admin/admin-users");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/pharmacy/category/:id/delete", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      await Drugs_cat.deleteOne({ _id: req.params.id });
      res.redirect("/pharmacy/category");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/pharmacy/drugs/:id/delete", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isPharmacy == 1) {
      await Drugs.deleteOne({ _id: req.params.id });
      res.redirect("/pharmacy/drugs");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/admin/doctor-category/:id/delete", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isAdmin == 1) {
      await DoctorCategory.deleteOne({ _id: req.params.id });
      res.redirect("/admin/doctor-category");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/admin/secretary/:id/delete", async (req, res) => {
  try {
    const user = await Manager.findOne({ _id: req.cookies.id });
    if (user.isAdmin == 1) {
      await Secretary.deleteOne({ _id: req.params.id });
      res.redirect("/admin/secretary");
    } else {
      res.redirect("/");
    }
  } catch (error) {}
});



app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});



// Made By Mohammed Majid - Instagram : @2x_g
