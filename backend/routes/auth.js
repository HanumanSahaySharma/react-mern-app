const express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECREAT_KEY = "JaiShriRam";

/* ROUTE 1 : Signup a User with POST => "/api/auth/signup" -> No login required */
/*-----------------------------------------------------------------------------------------------------*/
router.post(
   "/signup",
   //Set basic error messages
   [
      body("name", "Enter a valid name").isLength({ min: 3 }),
      body("email", "Enter a valid email").isEmail(),
      body("phone", "Phone numbers must be atlease in 10 digits").isLength({
         min: 10,
      }),
      body("password", "Password must be atleast 5 charectors").isLength({
         min: 5,
      }),
   ],
   async (req, res) => {
      let success = false;
      // If there are errors, then send a Bad request and errors
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success: false, errors: errors.array() });
      }
      const { email, phone } = req.body;
      try {
         // Check if user email and phone already exits in database
         let userEmail = await User.findOne({ email });
         let userPhone = await User.findOne({ phone });

         if (userEmail) {
            return res
               .status(400)
               .json({ success: false, error: "This email address already registered!" });
         }
         if (userPhone) {
            return res
               .status(400)
               .json({ success: false, error: "This phone number already registered!" });
         }
         // Encrypt password with salt and hash
         const salt = bcrypt.genSaltSync(10);
         const securePassword = bcrypt.hashSync(req.body.password, salt);

         // Create user
         let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: securePassword,
         });

         //Get user id from database and sent it to JWT for AuthToken
         const userData = {
            user: {
               id: user.id,
            },
         };

         const authToken = jwt.sign(userData, JWT_SECREAT_KEY);

         res.send({ success: true, authToken });
      } catch (error) {
         console.log(error);
         success = false;
         res.status(500).send("Something went wrong!");
      }
   }
);

/* ROUTE 2 : Login a User with POST => "/api/auth/login" -> No login required */
/*------------------------------------------------------------------------------------------------*/
router.post(
   "/login",
   //Set basic error messages
   [
      body("email", "Enter a valid email address").isEmail(),
      body("password", "Password must be atleast 5 charectors").isLength({
         min: 5,
         max: 30,
      }),
   ],
   async (req, res) => {
      let success = false;
      // If there are errors, then send a Bad request and errors
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success: false, errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
         // Get full user info including with email
         let user = await User.findOne({ email });
         if (!user) {
            return res
               .status(400)
               .json({ success: false, error: "Please login with correct credentails" });
         }
         //Compare Email, Phone and Password with database
         let compareEmail = await bcrypt.compare(email, user.email);
         let comparePassword = await bcrypt.compare(password, user.password);
         if (!compareEmail && !comparePassword) {
            return res
               .status(400)
               .json({ success: false, error: "Please login with correct credentails" });
         }

         //Get user id from database and sent it to JWT for AuthToken
         const userData = {
            user: {
               id: user.id,
            },
         };

         let authToken = jwt.sign(userData, JWT_SECREAT_KEY);

         res.send({ success: true, authToken });
      } catch (error) {
         console.log(error);
         res.status(500).send("Internal Server Error");
      }
   }
);

/* ROUTE 3 : Get LoggedIn User Info using POST => "/api/auth/getuser" -> Login required */
/*------------------------------------------------------------------------------------------------*/
router.post("/getuser", fetchUser, async (req, res) => {
   try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
