const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userschema = require("../schemas/userschema");
const router = express.Router();

const User = new mongoose.model("User", userschema);

router.get("/", (req, res) => {
    res.send("kazi nayeem")
})

router.post("/singin", async (req, res) => {

    try {


        const hashpassword = await bcrypt.hash(req.body.password, 10);

        const newuser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashpassword
        });
        await newuser.save();
        res.status(200).json({
            message: "user was insert singing successfull"
        })

    } catch {
        res.status(500).json({
            message: "singup failled"
        });
    }

});

// log in router
router.post("/login", async (req, res) => {

    try {
        const user = await User.find({ username: req.body.username });

        if (user && user.lenght > 0) {
            const isvalidpassworld = await bcrypt.compare(req.body.password, user[0].password);
            if (isvalidpassworld) {

                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id

                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });
                res.status(200).json({
                    "access_toden": token,
                    "message": "login successfull"
                })

            } else {
                res.status(401).json({
                    "error": "Authetication faild"
                })
            }

        } else {
            res.status(401).json({
                "error": "Authetication faild"
            })
        }
    } catch {
        res.status(401).json({
            "error": "Authetication faild"
        })
    }

})


























// login router 

// router.post("/login", async (req, res) => {

//     try{
//         const user = await User.find({ username: req.body.username });

//         if (user && user.length > 0) {

//             const isvalidpassword = await bcrypt.compare(req.body.password, user[0].password);

//             if (isvalidpassword) {

//                 // gen toekn
//                 const token = jwt.sign({

//                     username: user[0].username,
//                     userId: user[0]._id,

//                 }, process.env.JWT_SECRET, {
//                     expiresIn: '1h'
//                 });

//                 res.status(200).json({
//                     "access_token": token,
//                     "message": "login successful"
//                 })

//             } else {
//                 res.status(401).json({
//                     "error": "auth faild is login"
//                 })
//             }
//         } else {
//             res.status(401).json({
//                 "error": "auth faild"
//             })
//         }
//     }catch{
//         res.status(401).json({
//             "error": "auth faild catch"
//         })
//     }

// })


module.exports = router;