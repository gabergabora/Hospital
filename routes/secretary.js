const express = require("express")
const router = express.Router()
const Secretary = require("../models/Secretary")
const bcrypt = require("bcrypt")
const Reservation = require("../models/Reservation")
const Orders = require("../models/Orders")
const User = require("../models/User")


router.get("/login", async (req, res) => {
    try {
        res.render("secretary-login")
    } catch (error) {
        console.log(error)
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const secretary = await Secretary.findOne({ email })
        const check = await bcrypt.compare(password, secretary.password)

        if(check){
            res.cookie("id", secretary.id)
            res.redirect("/secretary/panel")
        } else {
            res.status(404).send("User not found !")
        }
    } catch (error) {
        console.log(error)
        res.status(404).send("User not found !")
    }
})

router.get("/panel", async (req, res) => {
    try {
        const data = await Secretary.findOne({ _id: req.cookies.id})
        if(data){
           const orders = await Orders.find({ doctor_name: data.for_doctor, Done: 1}).sort({ order_date: -1 })
            res.render("secretary-panel", {
                orders: orders,
            })
        } else {
            res.status(404).send("User not found !")
        }
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/orders", async (req, res) => {
    try {
        const data = await Secretary.findOne({ _id: req.cookies.id})
        if(data){
            const orders = await Orders.find({ order_date: "",  doctor_name: data.for_doctor})
            res.render("secretary-orders", {
                orders: orders,
            })
        } else {
            res.status(404).send("User not found !")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/orders/new", async (req, res) => {
    try {
        const data = await Secretary.findOne({ _id: req.cookies.id})
        if(data){
            res.render("secretary-new-order.ejs")
        } else {
            res.status(404).send("User not found !")
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/orders/new", async (req, res) => {
    try {
        const data = await Secretary.findOne({ _id: req.cookies.id})
        if(data){
            const { code, date } = req.body
            const user = await User.findOne({ username: code })
            if(user){
                const newOrder = [
                    new Orders({
                        name: user.name,
                        username: code,
                        doctor_name: data.for_doctor,
                        order_date: date,
                        Done: 1,
                    }),
                ];
    
                newOrder.forEach((data) => {
                    data.save((error) => {
                        if(error){
                            console.log(error)
                        } else {
                            console.log(data)
                            res.redirect("/secretary/panel")
                        }
                    })
                })
            } else {
                res.status(404).send("AA")
            }
        } else {
            res.status(404).send("User not found !")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router