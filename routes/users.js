const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { User } = require("../models/User");

const keys = require("../config/keys");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(404).json({ email: "Email already exists" });
    } else {
      const newUser = new User(req.body);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          favouriteList: user.favouriteList,
          cart: user.cart,
          history: user.history
        };
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) =>
          res.json({
            success: true,
            token: "Bearer " + token
          })
        );
      } else {
        res.status(400).json({ password: "Email or Password is incorrect" });
      }
    });
  });
});

router.post(
  "/add-favourite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        user.favouriteList.filter(item => item.product === req.body.productId)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyfavourite: "User already favourite this product" });
      }
      user.favouriteList.unshift({
        product: req.body.productId,
        user: req.user.id
      });
      user.save().then(user =>
        res.json({
          name: user.name,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          favouriteList: user.favouriteList,
          cart: user.cart,
          history: user.history
        })
      );
    });
  }
);

router.post(
  "/remove-favourite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        user.favouriteList.filter(item => item.product === req.body.productId)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notfavourite: "User didn't favourite this product yet" });
      }
      const removeIndex = user.favouriteList
        .map(item => item.product)
        .indexOf(req.body.productId);
      user.favouriteList.splice(removeIndex, 1);
      user.save().then(user =>
        res.json({
          name: user.name,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          favouriteList: user.favouriteList,
          cart: user.cart,
          history: user.history
        })
      );
    });
  }
);

router.post(
  "/add-cart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        user.cart.filter(item => item.product._id === req.body.product._id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ notincart: "User didn't add this product yet" });
      }
      user.cart.unshift({
        product: req.body.product,
      });
      user.save().then(user => res.json(user));
    });
  }
);

router.post(
  "/remove-cart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      if (
        user.cart.filter(item => item.product._id === req.body.productId)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ notincart: "User didn't add this product yet" });
      }
      const removeIndex = user.cart
        .map(item => item.product._id)
        .indexOf(req.body.productId);
      user.cart.splice(removeIndex, 1);
      user.save().then(user => res.json(user));
    });
  }
);

router.post(
  "/clear-cart",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id).then(user => {
      user.cart = [];
      user.save().then(user => res.json(user));
    });
  }
);

module.exports = router;
